import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import styles from './styles';
import Images from '../../../components/Images';
import ResponsiveText from '../../../components/ResponsiveText';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button';
import {
  GetAllMyitem,
  Getmyitemquery,
  Getofferbyid,
  RemoviitemMutation,
  clearApolloCache,
  useDeleteUserMutation,
  useGetMyNameQuery,
} from '../../../Graphql/Graphql';
import {
  StackActions,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../components/Responsiveui';
import FastImage from 'react-native-fast-image';
import { getAddressFromLatLng, getMyallItems } from '../../../Apis/Apis';
import CustomModal from '../../../components/CustomModal';
import { saveisFirstinstall } from '../../../redux/actions/userDataAction';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/react-hooks';
import moment from 'moment/moment';

const Profile = props => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [myitems, setmyitems] = useState([]);
  const [Itemmodal, setItemmodal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [ContactUsmodal, setContactUsmodal] = useState(false);
  const [warningModal, setwarningModal] = useState(false);
  const [selectedItem, setselectedItem] = useState('');
  const [itemDeleteMessage, setitemDeleteMessage] = useState('');
  const [Location, setLocation] = useState('');
  const [Region, setRegion] = useState('');
  const [archiveItem] = RemoviitemMutation();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {
    getMyitem,
    loading: myItemsLoading,
    data: myItemsData,
    error: myItemsDataError,
  } = GetAllMyitem({
    fetchPolicy: 'network-only',
  });
  const { getOfferagainstid, getoferloading, getoferdata, getofererror } =
    Getofferbyid({
      fetchPolicy: 'network-only',
    });
  const [deleteUserMutation] = useDeleteUserMutation();
  const handleRemoveItem = async (id, type) => {
    console.log('selectedItem?.id', selectedItem?.id);
    await getOfferagainstid({
      variables: {
        itemId: id,
      },
      fetchPolicy: 'no-cache',
    });
    console.log('getoferloading, getoferdata, getofererror', getoferdata);
    if (type == 'delete') {
      if (getoferdata?.allOffersByItemId.length > 0) {
        setitemDeleteMessage(
          '⚠️ Warning: Deleting this item will also delete any offers associated with it. Are you sure you want to proceed?',
        );
        setItemmodal(false), setwarningModal(true);
      } else {
        setitemDeleteMessage('Are you sure you want to delete this item?');
        setItemmodal(false), setwarningModal(true);
      }
    }
  };

  useEffect(() => {
    getMylistofitem()
  }, [useIsFocused()]);
  const getMylistofitem = async () => {
    try {

      const response = await getMyallItems()

      console.log('responseresponseresponseresponseresponse', response.data.me.items)
      setmyitems(response?.data?.me?.items);



    } catch (error) {

    }
  }

  const {
    data: mydata,
    loading: myloading,
    error,
    refetch: refresshPmydata,
  } = useGetMyNameQuery({
    fetchPolicy: 'network-only',
  });

  let myPersnolData = mydata?.me;
  console.log('myPersnolDatamyPersnolData', myPersnolData);
  const handleDelete = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: {
          userId: myPersnolData?.id,
        },
      });
      console.log('data response', data); //
      setDeleteModal(false);
      dispatch(saveisFirstinstall(true));

      props.navigation.replace('AuthStack', {
        screen: 'Onboarding',
      });
    } catch (error) {
      console.log('error delete', error);
    }
  };
  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        // Trigger a refetch of myItemsData

        await refresshPmydata();
      } catch (error) {
        // Handle errors...
      }
    };
    console.log('mydatamydatamydatamydata', mydata);

    fetchData();


  });

  const gap = wp(2);

  const RemoveItem = async id => {
    try {
      console.log('id====>?>?>?', id);

      const archiveItemResponse = await archiveItem({
        variables: {
          itemId: id,
        },
      });


      setTimeout(() => {
        getMylistofitem();
      }, 1000);

      console.log(
        'archiveItemResponsearchiveItemResponsearchiveItemResponse=-=-=-=',
        archiveItemResponse,
      );

      if (archiveItemResponse.data) {
        getMylistofitem();
        setItemmodal(false);
        setwarningModal(false);
      } else {
        getMylistofitem()
        setItemmodal(false);
        setwarningModal(false);
      }
    } catch (error) {
      console.log('errorerrorerror', error);
      setItemmodal(false);
      setwarningModal(false);
    }
  };
  useEffect(() => {
    getCurrentLocation();

  }, [useIsFocused(), myPersnolData]);

  const getCurrentLocation = async () => {
    if (
      myPersnolData != undefined &&
      myPersnolData?.latitude == null &&
      myPersnolData?.longitude == null
    ) {
      console.log('myPersnolData isnif', myPersnolData);
      Geolocation.getCurrentPosition(info => {
        setRegion({
          latitude: info.coords?.latitude,
          longitude: info.coords?.longitude,
        });

        getAddressFromLatLng(info.coords?.latitude, info.coords?.longitude)
          .then(address => setLocation(address))
          .catch(error => console.error(error.message));
      });
    } else {
      getAddressFromLatLng(myPersnolData?.latitude, myPersnolData?.longitude)
        .then(address => setLocation(address))
        .catch(error => console.error(error.message));
    }
  };

  const [tab, settab] = useState('Profile');
  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setselectedItem(item),
              handleRemoveItem(item?.id, 'no'),
              setItemmodal(true);
          }}
          style={styles.imageview}>
          <FastImage
            style={styles.imagedesign}
            source={{
              uri: item?.mainImageUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </>
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.dotimg} />
        <ResponsiveText style={styles.headerText}>
          {'My Account'}
        </ResponsiveText>
        <TouchableOpacity>
          <View style={styles.dotimg} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabrow}>
        <TouchableOpacity
          onPress={() => settab('Profile')}
          style={{
            ...styles.buttontext,
            borderColor:
              tab == 'Profile' ? Colors.btncolor : `${Colors.black}20`,
          }}>
          <ResponsiveText
            style={{
              ...styles.textcolor,
              color: tab == 'Profile' ? Colors.btncolor : Colors.graytext,
            }}>
            {'Profile'}
          </ResponsiveText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => settab('Made')}
          style={{
            ...styles.buttontext,
            borderColor:
              tab != 'Profile' ? Colors.btncolor : `${Colors.black}20`,
          }}>
          <ResponsiveText
            style={{
              ...styles.textcolor,
              color: tab != 'Profile' ? Colors.btncolor : Colors.graytext,
            }}>
            {'Settings'}
          </ResponsiveText>
        </TouchableOpacity>
      </View>

      {tab == 'Profile' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '20%' }}
          style={styles.reciveview}>
          <View style={styles.nametab}>
            {myPersnolData?.avatarUrl && (
              <View style={styles.profilemain}>
                <FastImage
                  style={styles.imagprofile}
                  source={{
                    uri: myPersnolData?.avatarUrl,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            )}
            <ResponsiveText style={styles.guesttxt}>
              {myPersnolData?.firstName}
            </ResponsiveText>
            <ResponsiveText style={styles.since}>
              {'Since:'}{' '}
              <ResponsiveText style={styles.sincedate}>
                {`${moment(
                  myPersnolData?.createdAt,
                ).fromNow()}`}
              </ResponsiveText>
            </ResponsiveText>
          </View>

          <View>
            <Button
              btnContainer={styles.editbtn}
              onPress={() =>
                props.navigation.navigate('EditProfile', {
                  myPersnolData,
                })
              }
              title={'Edit Profile'}
              titleStyle={styles.btntitle}
              // loading={loading}
              loadingColor={Colors.secondaryColor}
            />
            <View style={styles.seprator} />

            {/* <Button
        btnContainer={styles.locationbtn}
  
          onPress={()=>{
            handleNextPres()
           
        
        }}
        title={isCheckboxes?'Continue':'Update Item Location'}
          // loading={loading}
          loadingColor={Colors.secondaryColor}
        /> */}
          </View>

          <View style={styles.itemview}>
            <ResponsiveText style={styles.headingtxt}>
              {'Your Items'}
            </ResponsiveText>
            <View style={styles.mainflatlist}>
              <FlatList
                data={myitems}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
                numColumns={3}
                // columnWrapperStyle={{justifyContent:'space-between'}}
                // contentContainerStyle={{gap}}
                columnWrapperStyle={{ gap }}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '20%' }}
          style={styles.reciveview}>
          <View style={styles.headingview}>
            <ResponsiveText style={styles.headintxt}>
              {'Personal information'}
            </ResponsiveText>
          </View>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Full name',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>
              {'Full name'}
            </ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {myPersnolData?.firstName} {myPersnolData?.lastName}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Email',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>{'Email'}</ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {myPersnolData?.email}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Mobile',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>{'Mobile'}</ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {myPersnolData?.mobile
                ? myPersnolData?.mobile.slice(2)
                : 'Not specified'}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Gender',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>{'Gender'}</ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {myPersnolData?.gender ? myPersnolData?.gender : 'Not specified'}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Date of birth',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>
              {'Date of birth'}
            </ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {myPersnolData?.dateOfBirth
                ? formatDate(myPersnolData?.dateOfBirth)
                : 'Not specified'}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <View style={styles.headingview}>
            <ResponsiveText style={styles.headintxt}>
              {'Distance Willing to Travel'}
            </ResponsiveText>
          </View>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Distance',
                data: myPersnolData,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>
              {'Distance'}
            </ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {`Up to ${mydata?.me?.distance ? mydata?.me?.distance : 0
                } Miles away`}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <View style={styles.headingview}>
            <ResponsiveText style={styles.headintxt}>
              {'Current Location'}
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('SettingDetail', {
                fieldname: 'Location',
                data: Location,
              })
            }
            style={styles.rowview}>
            <ResponsiveText style={styles.titletxt}>
              {'Location'}
            </ResponsiveText>

            <ResponsiveText style={styles.title2text}>
              {Location}
            </ResponsiveText>
            <Image source={Images.rightarrow} style={styles.rightarow} />
          </TouchableOpacity>

          <View style={styles.rowview}>
            <Button
              title={'Contact us'}
              titleStyle={{ color: Colors.white }}
              btnContainer={styles.contactUs}
              onPress={() => setContactUsmodal(true)}
            />

            <Button
              title={'Delete Account'}
              titleStyle={{ color: Colors.white }}
              btnContainer={styles.deletebtn}
              onPress={() => setDeleteModal(true)}
            />
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={Itemmodal}
        onRequestClose={() => {
          setItemmodal(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setItemmodal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <TouchableOpacity style={styles.modlbtn} hitSlop={styles.hitslop} onPress={() => setItemmodal(false)}>
            <ResponsiveText style={styles.buttonTextcancel}>View Listing</ResponsiveText>
          </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.modlbtn}
                hitSlop={styles.hitslop}
                onPress={() => {
                  setItemmodal(false),
                    props.navigation.navigate('Edititem', {
                      item: selectedItem,
                    });
                }}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Edit Listing
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                hitSlop={styles.hitslop}
                onPress={() => {
                  handleRemoveItem(selectedItem?.id, 'delete');
                }}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Remove Listing
                </ResponsiveText>
              </TouchableOpacity>

              {/* <TouchableOpacity  onPress={()=>{props.navigation.navigate('UpdateItemLocation',{
            region:{
              latitude:selectedItem?.latitude,
              longitude:selectedItem?.longitude,
            },
            type:'view',
            myitems:[]

          }),setItemmodal(false)}}
           style={styles.modlbtn} hitSlop={styles.hitslop} >
            <ResponsiveText style={styles.buttonTextcancel}>View Location</ResponsiveText>
          </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('UpdateItemLocation', {
                    itemId: selectedItem?.id,
                    region: {
                      latitude: selectedItem?.latitude,
                      longitude: selectedItem?.longitude,
                    },
                    userId: myPersnolData?.id,
                    myitems,
                  }),
                    setItemmodal(false);
                }}
                style={styles.modlbtn}
                hitSlop={styles.hitslop}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Update Location
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => setItemmodal(false)}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Cancel
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <CustomModal
        modalVisible={warningModal}
        setModalVisible={setwarningModal}>
        <View style={styles.deletemodal}>
          <ResponsiveText style={styles.deletetxt}>
            {itemDeleteMessage}
          </ResponsiveText>
          <View style={styles.btnrow}>
            <Button
              title={'Yes'}
              btnContainer={styles.btn}
              onPress={() => RemoveItem(selectedItem.id)}
            />

            <Button
              title={'No'}
              btnContainer={styles.btnno}
              onPress={() => setwarningModal(false)}
            />
          </View>
        </View>
      </CustomModal>


      <CustomModal modalVisible={ContactUsmodal} setModalVisible={setContactUsmodal}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setContactUsmodal(false)} style={{ padding: 10, alignSelf: 'flex-end', position: 'absolute', top: -wp(10), right: wp(-6) }}>
            <Image
              source={Images.close}
              style={{ width: wp(8), height: wp(8) }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            placeholderTextColor={Colors.graytext}

          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor={Colors.graytext}
          />
          <TextInput
            placeholder="Message"
            value={message}
            onChangeText={text => setMessage(text)}
            style={[styles.input, { height: 200 }]} // Make the message input taller
            multiline={true}
            placeholderTextColor={Colors.graytext}

          />
          <Button title="Send"
            btnContainer={styles.contactUs}
            onPress={() => { setContactUsmodal(false) }} />
        </View>
      </CustomModal>


      <CustomModal modalVisible={DeleteModal} setModalVisible={setDeleteModal}>
        <View style={styles.deletemodal}>
          <ResponsiveText style={styles.deletetxt}>
            Are you sure you want to delete your account?
          </ResponsiveText>
          <View style={styles.btnrow}>
            <Button
              title={'Yes'}
              btnContainer={styles.btn}
              onPress={() => handleDelete()}
            />

            <Button
              title={'No'}
              btnContainer={styles.btnno}
              onPress={() => setDeleteModal(false)}
            />
          </View>
        </View>
      </CustomModal>
    </Container>
  );
};

export default Profile;
