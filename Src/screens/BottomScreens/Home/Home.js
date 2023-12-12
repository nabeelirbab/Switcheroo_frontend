import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../../../components/Container';
import styles from './styles';
import Images from '../../../components/Images';
import ResponsiveText from '../../../components/ResponsiveText';
import Button from '../../../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../components/Responsiveui';
import Colors from '../../../theme/colors';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';

import {
  GetAllMyitem,
  Logoutacountmutaion,
  UpdateUserFcm,
  clearApolloCache,
  useCreateCashOfferMutation,
  useCreateOfferMutation,
  useDismissItemMutation,
} from '../../../Graphql/Graphql';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Savematchingitem,
  saveisFirstinstall,
} from '../../../redux/actions/userDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import CustomModal from '../../../components/CustomModal';
import TextInputcomp from '../../../components/TextInputcomp';
import ErrorModal from '../../../components/ErrorModal';
import { SuccessToast } from '../../../components/SuccessToast';
import { ErrorToast } from '../../../components/ErrorToast';
import {
  notificationListener,
  requestUserPermission,
} from '../../../components/NotificationServices';
import { useApolloClient } from '@apollo/react-hooks';
import {
  checkNotifications,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";
const Home = props => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const checkSelectedTitle = useSelector(response => {
    return response?.userdataReducer.matchingItems;
  });
  console.log('checkSelectedTitlecheckSelectedTitle', checkSelectedTitle);
  const ifFirstinstall = useSelector(response => {
    return response?.userdataReducer.firstinstall;
  });

  const [chosemodal, setchosemodal] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);
  const [isFirstinstall, setisFirstinstall] = useState(false);
  const [selectedItem, setselectedItem] = useState(
    checkSelectedTitle ? checkSelectedTitle : '',
  );


  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swipeData, setSwipeData] = useState([]);
  const [myItemData, setmyItemData] = useState([]);
  const [itemforcashOffer, setitemforcashOffer] = useState({});
  const [queryExecuted, setQueryExecuted] = useState(false);
  const [Cashoffermodal, setCashoffermodal] = useState(false);
  const [cahsValue, setcahsValue] = useState();
  const [errorModal, seterrorModal] = useState(false);
  const [CheckCashoffer, setCheckCashoffer] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [signOut] = Logoutacountmutaion();

  const {
    getMyitem,
    loading: MyitemLoading,
    data: myitemdata,
    error: myitemError,
  } = GetAllMyitem({
    fetchPolicy: 'network-only',
  });

  const [createOffer] = useCreateOfferMutation();
  const [createCashOffer] = useCreateCashOfferMutation();
  const [dismissItem] = useDismissItemMutation();
  const [updateFcm] = UpdateUserFcm();

  useEffect(() => {
    requestNotificationPermission()
    notificationListener();
    requestUserPermission().then(res => {
      console.log(res);

      updateFcm({
        variables: {
          fcmtoken: res,
        },
      })
        .then(res => {
          console.log('fcm update responseeeee', res);
        })
        .catch(error => {
          console.log('error from cfcm', error);
        });
    });
    if (ifFirstinstall) {
      setisFirstinstall(true);
    }
  }, []);





  const requestNotificationPermission = async () => {
    try {
      const { status, settings } = await checkNotifications();

      console.log('statusstatusstatus', status);
      if (status === RESULTS.GRANTED) {
        console.log("Notification permission granted");
      } else if (status === RESULTS.DENIED) {
        const rationale = await requestNotifications({
          ios: PERMISSIONS.IOS.NOTIFICATIONS,
          android: PERMISSIONS.ANDROID.NOTIFICATIONS,
        });
        console.log("rationale", rationale);
        if (rationale.status === RESULTS.BLOCKED) {
          console.log("Notification permission blocked");
          openSettings();
        } else if (rationale.status === RESULTS.DENIED) {
          console.log("Show additional rationale for notification permission");
        } else if (rationale.status === RESULTS.GRANTED) {
          console.log("Notification permission granted after re-request");

        }
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };




  useEffect(() => {
    setselectedItem(checkSelectedTitle ? checkSelectedTitle : {})
    console.log(myitemdata, 'myitemdataaaa===>>>>>>>', myItemData?.me?.items?.length);
    setmyItemData(myitemdata ?? []);

    if (myItemData?.me?.items?.length == 0) {
      setselectedItem({ title: '' })
      dispatch(Savematchingitem(null));
    }
    GetItemsFilter(selectedItem);


  }, [myitemdata, useIsFocused()]);

  // Logout handle

  const logoutPress = async () => {
    await signOut();
    setlogoutModal(false);
    dispatch(Savematchingitem(null));
    await AsyncStorage.clear();

    setselectedItem('');
    setSwipeData([]);
    clearApolloCache(client);
    dispatch(saveisFirstinstall(true));
    props.navigation.replace('AuthStack', {
      screen: 'Onboarding',
    });
  };

  // fetch all match data with my selected item

  const handleSwipeRight = item => {
    try {
      console.log('item', item, '\nitemid==', selectedItem);

      console.log(
        'dddd+++********************',
        {
          sourceItemId: selectedItem?.id,
          targetItemId: item?.id,
          sourceStatus: 1,
          targeteStatus: 1,
        },
        'dddd+++********************',
      );
      createOffer({
        variables: {
          sourceItemId: selectedItem?.id,
          targetItemId: item?.id,
          sourceStatus: 1,
          targeteStatus: 1,
        },
      })
        .then(res => {
          console.log('createOfferResponse', res);

          if (res?.data?.createOffer?.targeteStatus == 1) {
            props.navigation.navigate('MatchingSuccess');
          } else {
            SuccessToast({
              title: 'Congratulation',
              text: 'Request sent successfully 👍',
            });
          }
        })
        .catch(error => {
          console.log('error from creating offer', error);
          ErrorToast({
            title: 'Congratulation',
            text: error?.graphQLErrors[0].message,
          });
          console.log('error from creating offer', error?.messages);
        });
    } catch (error) {
      console.log('errorerror', error);
    }
  };

  const HandleSwipeLeft = item => {
    try {
      console.log('item', item, '\nitemid==', selectedItem);

      dismissItem({
        variables: {
          sourceItemId: selectedItem?.id,
          targetItemId: item.id,
        },
      })
        .then(res => {
          console.log('dismissItemdismissItem', res);

          if (res) {
            SuccessToast({
              title: 'Congratulation',
              text: 'Dissmiss item 👎',
            });
          }
        })
        .catch(error => {
          console.log('error from creating offer', error);
        });
    } catch (error) {
      console.log('errorerror', error);
    }
  };

  const Giveoffer = () => {

    try {

      console.log(
        {
          sourceItemId: selectedItem?.id,
          targetItemId: itemforcashOffer.id,
          cash: parseInt(cahsValue),
          sourceStatus: 1,
          targeteStatus: 1,
        }, 'jdjflkdjfjdfjlkdjfkd');
      if (cahsValue) {
        seterrorModal(false);
        seterrorMessage('');
        createCashOffer({
          variables: {
            sourceItemId: selectedItem?.id,
            targetItemId: itemforcashOffer.id,
            cash: parseInt(cahsValue),
            sourceStatus: 1,
            targeteStatus: 1,
          },
        })
          .then(res => {
            if (swiperRef.current) {
              swiperRef.current.swipeRight();
            }
            setcahsValue('');
            console.log('createOfferResponse', res);
            if (res?.data?.createOffer?.targeteStatus == 1) {
              props.navigation.navigate('MatchingSuccess');
              setCashoffermodal(false);
            } else {
              SuccessToast({
                title: 'Congratulation',
                text: 'Cash offer send 👍',
              });
            }
            setCashoffermodal(false);

            setTimeout(() => {
              setCheckCashoffer(false);
            }, 300);
          })
          .catch(error => {
            setcahsValue('');

            console.log(
              'error from creating offer',
              error,
              'mesage erroro',
              error.graphQLErrors[0].message,
            );

            setCashoffermodal(false);

            ErrorToast({
              title: 'Congratulation',
              text: error.graphQLErrors[0].message,
            });
          });
      } else {
        seterrorModal(true);
        seterrorMessage('Please Enter Value');
      }
    } catch (error) {
      setCheckCashoffer(false);
    }
  };

  useEffect(() => {
    getAllmyProdunt();
    // getallItemForMatching();
  }, [props.navigation, selectedItem, queryExecuted, useIsFocused()]);

  const getAllmyProdunt = async () => {
    try {
      await getMyitem();
      console.log(
        'MyitemLoading, myitemdata ,myitemError',
        MyitemLoading,
        myitemdata,
        myitemError,
      );
    } catch (error) {
      console.log('error of getMyitem', error);
    }
  };

  const GetItemsFilter = async itemid => {
    try {
      if (itemid) {
        const query = `
    query GetMyItemFeed(
      $amount: Decimal
      $itemId: Uuid!
      $categories: [String!]
      $limit: Int!
      $cursor: String
      $distance: Decimal
      $latitude: Decimal
      $longitude: Decimal
      $inMiles: Boolean
    ) {
      items(
        amount: $amount
        itemId: $itemId
        categories: $categories
        cursor: $cursor
        limit: $limit
        distance: $distance
        latitude: $latitude
        longitude: $longitude
        inMiles: $inMiles
      ) {
        cursor
        data {
          id
          mainImageUrl
          description
          title
           imageUrls
          askingPrice
          longitude
          latitude
          isSwapOnly
        }
        hasNextPage
        totalCount
      }
    }
  `;
        console.log('itemiditemiditemid', itemid);
        const variables = {
          limit: 100,
          itemId: itemid?.id,
          amount: itemid?.askingPrice ? itemid?.askingPrice : 0,
          distance: myItemData?.me?.distance ? myItemData?.me?.distance : 100,
          latitude: itemid?.latitude,
          longitude: itemid?.longitude,
          inMiles: true,
          categories: [],
        };

        console.log('====================================');
        console.log('variablesvariablesvariables', variables);
        console.log('====================================');
        axios
          .post('http://13.50.221.83/', { query, variables })
          .then(response => {
            console.log(
              'Response data:',
              response,
            );
            setSwipeData(response.data?.data?.items?.data ?? []);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedItem?.id == item.id) {
            setselectedItem('');
            dispatch(Savematchingitem(''));
            setSwipeData([]);
          } else {
            setselectedItem(item);
          }
        }}
        style={{
          ...styles.imageview,
          borderColor:
            selectedItem?.id == item?.id ? Colors.btncolor : Colors.graytext,
        }}>
        <FastImage
          style={{
            ...styles.imagedesign,
            borderColor:
              selectedItem?.id == item.id ? Colors.btncolor : Colors.graytext,
          }}
          source={{
            uri: item?.mainImageUrl,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.dotimg} />
        <Image
          source={Images.logoBranding}
          style={styles.logoimg}
          resizeMode="contain"
        />
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={() => setlogoutModal(true)}>
          <Image
            source={Images.verticaldot}
            style={styles.dotimg}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.choosebtnview}>
        <TouchableOpacity
          onPress={() => {
            getAllmyProdunt(), setchosemodal(!chosemodal);
          }}>
          <ResponsiveText numberOfLines={1} style={styles.choosebtntxt}>
            {!selectedItem?.title
              ? 'Choose an item to switch with'
              : 'Change Item : ' + selectedItem?.title}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      {/* {console.log(
        'swiperIndex',
        swiperIndex,
        '<swipeData?.length',
        swipeData?.length,
        swipeData?.length > 0 && swiperIndex < swipeData?.length,
      )} */}
      <View style={{ flex: 1 }}>
        {swipeData?.length > 0 && swiperIndex < swipeData?.length ? (
          <Swiper
            ref={swiperRef}
            cards={swipeData}
            renderCard={item => {
              return (
                <TouchableOpacity
                  style={{ backgroundColor: 'transparent' }}
                  activeOpacity={1}
                  onPress={() =>
                    props.navigation.navigate('ItemDetail', {
                      item: item,
                      sourceItemId: selectedItem,
                      refrence: swiperRef?.current,
                      selectedItem: selectedItem

                    })
                  }>
                  <ImageBackground
                    activeOpacity={0.8}
                    resizeMode="cover"
                    style={styles.backgroundImg}
                    source={{ uri: item?.mainImageUrl }}>
                    {item?.isSwapOnly ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setitemforcashOffer(item), setCashoffermodal(true);
                          setCheckCashoffer(true);
                        }}
                        hitSlop={styles.hitslop}
                        style={styles.dolorSign}>
                        <ResponsiveText style={styles.dolorsigntxt}>
                          {'$'}
                        </ResponsiveText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={styles.hitslop}
                        style={styles.dolorSigndisable}>
                        <ResponsiveText style={styles.dolorsigntxtblure}>
                          {'$'}
                        </ResponsiveText>
                      </TouchableOpacity>
                    )}

                    <View style={styles.rowView}>
                      <TouchableOpacity
                        onPress={() => {
                          if (swiperRef.current) {
                            swiperRef.current.swipeLeft();
                          }
                        }}>
                        <Image
                          source={Images.swipeCircleCross}
                          style={styles.crossIcon}
                        />
                      </TouchableOpacity>

                      <ResponsiveText style={styles.text}>
                        {item?.title}
                      </ResponsiveText>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          if (swiperRef.current) {
                            swiperRef.current.swipeRight();
                          }
                        }}>
                        <Image
                          source={Images.swipeCircleTick}
                          style={styles.tickIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            onSwiped={cardIndex => {
              console.log(cardIndex);
              setSwiperIndex(cardIndex);
              if (cardIndex == swipeData?.length - 1) {
                setSwiperIndex(0);
                clearApolloCache(client);

                setSwipeData([]);
              }
            }}
            onSwipedAll={() => {
              setSwipeData([]);
              getAllmyProdunt();
              // GetItemsFilter(selectedItem);
            }}
            cardIndex={swiperIndex}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            backgroundColor={'#fff'}
            stackSeparation={0}
            disableTopSwipe
            disableBottomSwipe
            disableRightSwipe={false}
            disableLeftSwipe={false}
            swipeBackCard
            verticalSwipe={false}
            stackSize={4}
            onSwipedLeft={(index, item) => HandleSwipeLeft(item)}
            onSwipedRight={(index, item) => {
              CheckCashoffer == false
                ? handleSwipeRight(item)
                : console.log('send cash offer');
            }}
          />
        ) : (
          <View style={styles.emptyView}>
            <ResponsiveText style={styles.title}>
              {"There's nothing here!"}
            </ResponsiveText>
            <ResponsiveText>
              {selectedItem == ''
                ? 'Select your item to see results.'
                : 'No more items here. Try changing your filter options to see more results.'}
            </ResponsiveText>

            <Image source={Images.emptyitem} style={styles.emtyimg} />
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={chosemodal}
        onRequestClose={() => {
          setchosemodal(!chosemodal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ResponsiveText style={styles.modltxt}>
              {`Select an item you'd like to swap`}
            </ResponsiveText>
            <FlatList
              horizontal={true}
              data={myItemData?.me?.items}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id}
              showsHorizontalScrollIndicator={false}
            />

            <Button
              //
              onPress={() => {
                dispatch(Savematchingitem(selectedItem)),
                  setchosemodal(false),
                  setQueryExecuted(false),
                  GetItemsFilter(selectedItem);
                setSwiperIndex(0),
                  swiperRef.current
                    ? swiperRef.current.jumpToCardIndex(0)
                    : null;
              }}
              title={'Continue'}
              btnContainer={{
                marginTop: hp(3),
                width: wp(82),
                opacity: selectedItem == '' ? 0.5 : 1,
              }}
              titleStyle={styles.btntitle}
              // loading={loading}
              loadingColor={Colors.secondaryColor}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModal}
        onRequestClose={() => {
          setlogoutModal(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setlogoutModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modlbtn}
                hitSlop={styles.hitslop}
                onPress={() => logoutPress()}>
                <ResponsiveText style={styles.buttonText}>
                  Sign Out
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => setlogoutModal(false)}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Cancel
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* is first install modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFirstinstall}
        onRequestClose={() => {
          setisFirstinstall(false);
          dispatch(saveisFirstinstall(false));
        }}>
        <View style={styles.modalContainerfirst}>
          <View style={styles.modalContentfirst}>
            <View style={styles.topview}>
              <Image
                source={Images.logoBranding}
                style={styles.houseruleImage}
              />

              <ResponsiveText style={styles.welcomtxt}>
                Welcome to Switcheroo
              </ResponsiveText>
              <ResponsiveText style={styles.ruletext}>
                Please Follow the House Rules
              </ResponsiveText>

              <ResponsiveText style={styles.headingText}>
                Stay Safe
              </ResponsiveText>

              <ResponsiveText style={styles.ruletext}>
                Prioritize your safety; exercise caution while sharing personal
                information.
              </ResponsiveText>
              <ResponsiveText style={styles.headingText}>
                Be Genuine
              </ResponsiveText>

              <ResponsiveText style={styles.ruletext}>
                Swap with integrity and authenticity.
              </ResponsiveText>
              <ResponsiveText style={styles.headingText}>
                Be Nice
              </ResponsiveText>

              <ResponsiveText style={styles.ruletext}>
                Foster a friendly and positive community.
              </ResponsiveText>
              <ResponsiveText style={styles.headingText}>
                Report Bad Behaviour
              </ResponsiveText>
              <ResponsiveText style={styles.ruletext}>
                Help maintain a respectful environment by reporting any
                inappropriate conduct.
              </ResponsiveText>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(saveisFirstinstall(false)), setisFirstinstall(false);
              }}
              style={styles.agreebtn}>
              <ResponsiveText style={styles.agretxt}>Agree</ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomModal
        modalVisible={Cashoffermodal}
        setModalVisible={setCashoffermodal}>
        <View style={styles.textOffer}>
          <TouchableOpacity onPress={() => setCashoffermodal(false)}>
            <Image

              source={Images.close}
              style={styles.closeBUtton}
            />
          </TouchableOpacity>

          <ResponsiveText style={styles.cashtext}>
            Give Cash Offer
          </ResponsiveText>
          <TextInputcomp
            placeholder={'$ Enter your offer value'}
            value={cahsValue}
            onChangeText={(text) => {
              setcahsValue(text)
            }}
            width={wp(70)}
            keyboardType="number-pad"
          />

          <Button
            title={'Give offer'}
            btnContainer={styles.offerbtn}
            onPress={() => Giveoffer()}
          />
        </View>
      </CustomModal>

      {errorModal && (
        <ErrorModal
          modalVisible={errorModal}
          setModalVisible={seterrorModal}
          errorMessage={errorMessage}
        />
      )}
    </Container>
  );
};

export default Home;
