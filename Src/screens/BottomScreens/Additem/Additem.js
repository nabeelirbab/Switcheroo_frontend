import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  ScrollView,
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
import ImagePicker from 'react-native-image-crop-picker';
import uploadToS3 from '../../../components/Uploads3File';
import Geolocation from '@react-native-community/geolocation';
import { AddnewitemMutation } from '../../../Graphql/Graphql';
import { apiKey, createItem, getAddressFromLatLng, getCategory } from '../../../Apis/Apis';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SuccessToast } from '../../../components/SuccessToast';
import { heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { useDispatch } from 'react-redux';
import { Savematchingitem } from '../../../redux/actions/userDataAction';
import DropdownPinker from '../../../components/DropdownPicker';



let defaultaray = [
  { id: 1, image: '', loading: false },
  { id: 2, image: '', loading: false },
  { id: 3, image: '', loading: false },
  { id: 4, image: '', loading: false },
  { id: 5, image: '', loading: false },
  { id: 6, image: '', loading: false },
];

const categoryData = [
  { label: 'Automotive', value: '1' },
  { label: 'Cell Phones & Accessories ', value: '2' },
  { label: 'Home & Kitchen ', value: '3' },
  { label: 'Electronics', value: '4' },
  { label: 'Tools & Home Improvement ', value: '5' },
  { label: 'Clothing, Shoes & Jewelry ', value: '6' },
  { label: 'Patio, Lawn & Garden ', value: '7' },
  { label: 'Office Products ', value: '8' },
  { label: 'Toys & Games ', value: '9' },
  {
    label: 'Sports & Outdoors ', value: '10'
  },
  { label: 'Industrial & Scientific ', value: '11' },
  { label: 'Appliances ', value: '12' },
  { label: 'Pet Supplies ', value: '13' },
  { label: 'Health & Household', value: '14' },
  { label: 'Beauty & Personal Care ', value: '15' },
  { label: 'Arts, Crafts & Sewing ', value: '16' },
  { label: 'Baby Products ', value: '17' },
  { label: 'Grocery & Gourmet Food ', value: '18' },
  { label: 'Musical Instruments ', value: '19' },
  { label: 'Handmade Products ', value: '20' },
  { label: 'Video Games', value: '21' },
  { label: 'Others', value: '22' },



]
const Additem = props => {
  const dispatch = useDispatch();
  const [Array, setArray] = useState(defaultaray);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setimageUrl] = useState('');

  const onPress = (data, details) => {
    setModalVisible(false);
    console.log('====================================');
    console.log(details?.geometry.location, data?.description);

    setLocation({
      latitude: details?.geometry.location?.lat,
      longitude: details?.geometry.location?.lng,
    });
    getAddressFromLatLng(
      details?.geometry.location?.lat,
      details?.geometry.location?.lng,
    )
      .then(address => setLocationname(address))
      .catch(error => console.error(error.message));

    setLocationname(data?.description);
    console.log('====================================');
  };

  const [CreateItem, { loading, error, data }] = AddnewitemMutation();
  const [title, settitle] = useState('');
  const [value, setvalue] = useState('');
  const [category, setcategory] = useState('');
  const [Discreption, setDiscreption] = useState('');
  const [selecteditem, setselecteditem] = useState('');
  const [Location, setLocation] = useState(0);
  const [Imageindex, setImageindex] = useState(0);
  const [cashTogle, setcashTogle] = useState(true);
  const [ImagePickermodal, setImagePickermodal] = useState(false);
  const [Locationname, setLocationname] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Mainimageindex, setMainimageindex] = useState(0);
  const [presIndex, setpresIndex] = useState(0);
  const [SelectimageFormain, setSelectimageFormain] = useState(false);
  const [dropdownData, setDropdownData] = useState([])






  useEffect(() => {
    getCategory().then(res => {

      console.log('resoponseeeee', res)
      let array = []
      res.data?.categories.map(categry => {
        console.log('response of categoryyyyy', categry)
        let object = { label: categry?.name, value: categry?.id }
        array.push(object)
      })
      console.log('arrayarray', array);
      setDropdownData(array)
    }).catch(eror => {
      console.log('eror get category', eror)
    })
    getCurrentLocation();
  }, []);
  let titlemaxlength = 100;
  let discreptionemaxlength = 500;
  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      setLocation(info.coords);
      console.log(info);
      getAddressFromLatLng(info.coords?.latitude, info.coords?.longitude)
        .then(address => setLocationname(address))
        .catch(error => console.error(error.message));
    });
  };

  function extractUrlAndRemainingArray(urls, index) {
    if (index < 0 || index >= urls.length) {
      return null; // Index out of bounds
    }

    const selectedUrl = urls[index];
    const remainingUrls = [...urls.slice(0, index), ...urls.slice(index + 1)].map((url) => (url.toString()));
    console.log('remainingUrlsremainingUrls', remainingUrls);
    return { selectedUrl, remainingUrls };
  }


  const uploaditem = async () => {

    try {
      let findimage = Array.find(item => item.image != '');
      console.log('findimage', findimage);
      if (!findimage) {
        Alert.alert('Field Required', 'Please select atleast one image');
      } else if (!title) {
        Alert.alert('Field Required', 'Please enter your item title');
      } else if (!value) {
        Alert.alert('Field Required', 'Please enter your item price');
      }

      else if (!Discreption) {
        Alert.alert('Field Required', 'Please enter your item descreption');
      }

      else if (!category?.value) {
        Alert.alert('Field Required', 'Please select your item category');
      }

      else {
        const imageUrls = Array.filter(obj => obj.image !== '').map(
          obj => obj.image,
        );
        console.log('before image shiftt', Mainimageindex, imageUrls);

        // Ensure mainImageIndex is valid
        if (Mainimageindex >= 0 && Mainimageindex < imageUrls.length) {
          const mainImage = imageUrls.splice(Mainimageindex, 1)[0];
          imageUrls.unshift(mainImage);
        }
        const result = extractUrlAndRemainingArray(imageUrls, 0);
        console.log('resultresultresult', result.selectedUrl);
        console.log('resultresultresultresultresult', result.remainingUrls);


        let remainingUrls = result.remainingUrls
        let selectedUrl = result.selectedUrl

        setLoading(true);

        const trimmedValue = value.slice(1);

        console.log({
          askingPrice: parseFloat(trimmedValue),
          categories: [category?.value],
          description: Discreption,
          imageUrls: remainingUrls,
          isSwapOnly: cashTogle,
          latitude: Location?.latitude ? Location?.latitude : 73.0,
          longitude: Location?.longitude ? Location?.longitude : 73.0,
          mainImageUrl: selectedUrl,
          title: title
        });

        console.log('valuevaluevalue', trimmedValue);

        let response = await createItem({
          askingPrice: parseFloat(trimmedValue),
          categories: [category?.value],
          description: Discreption,
          imageUrls: remainingUrls,
          isSwapOnly: cashTogle,
          latitude: Location?.latitude ? Location?.latitude : 73.0,
          longitude: Location?.longitude ? Location?.longitude : 73.0,
          mainImageUrl: selectedUrl,
          title: title
        })

        console.log('responseresponseresponseresponse', response.data?.createItem);


        setLoading(false)

        if (response.data?.createItem) {
          dispatch(Savematchingitem(response.data?.createItem));
          SuccessToast({
            title: 'Congratulation',
            text: 'Item uploaded Successfully ',
          });
          settitle('');
          setDiscreption('');
          setArray(defaultaray);
          setvalue('');
          setImageindex(0);
          props.navigation.navigate('TabBarNav', {
            screen: 'Home',
          });
        }
      }
    } catch (error) {
      setLoading(false);

      console.log('errorerrorerrorerror from post item', error);
      Alert.alert(error?.message);
    }
  };

  const selecFromgalery = () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        width: 300,
        height: 300,
        cropping: false,
        multiple: true,
        maxFiles: 6,
        includeBase64: true,
      })
        .then((images) => {
          setImagePickermodal(false);

          console.log('Selected images:', images);

          // Create a copy of the default array
          let updatedArray = [...Array];
          console.log('updatedArray:', updatedArray);

          // Find the first index with an empty image in updatedArray
          const startIndex = updatedArray.findIndex((item) => !item.image);

          if (startIndex !== -1) {
            // Iterate over the selected images and update the array starting from startIndex
            images.forEach((allimages, index) => {
              const source = { uri: allimages.data };
              const updatedIndex = startIndex + index;

              if (updatedIndex < updatedArray.length) {
                updatedArray[updatedIndex] = {
                  ...updatedArray[updatedIndex],
                  image: source.uri,
                  loading: false,
                };
              }
            });

            // Get the length of the updated array with non-empty images
            let nonEmptyImageArray = updatedArray.filter((item) => item.image !== '');
            console.log('nonEmptyImageArray:', nonEmptyImageArray);

            // Set the array state with the updated array
            setArray(updatedArray);

            // Update the image index based on the length of non-empty images (up to a maximum of 6)
            setImageindex(Math.min(nonEmptyImageArray.length, 6));
          }

          console.log('Updated array:', updatedArray);
        })
        .catch((error) => {
          console.log('Error selecting images:', error);
          setImagePickermodal(false);
        });
    } catch (error) {
      setImagePickermodal(false);
      console.log('Error in selecFromgalery:', error);
    }
  };



  const selectFromcamera = item => {
    try {
      setImagePickermodal(false);
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: false,
        includeBase64: true,
        multiple: true

      }).then(image => {
        console.log('imageimageimageimage', image);
        setImagePickermodal(false);
        const source = { uri: image.data };
        console.log('sourcesourcesource', source);
        setimageUrl(source)


        const updatedArray = Array.map(obj =>
          obj.id === selecteditem.id
            ? { ...obj, image: source.uri || '', loading: false }
            : obj,
        );
        setArray(updatedArray);

        let nonEmptyImageArray = updatedArray.filter((item) => item.image !== '');
        console.log('nonEmptyImageArray:', nonEmptyImageArray);

        setImageindex(Math.min(nonEmptyImageArray.length, 6));



        // const updatedArray = Array.map(obj =>
        //   obj.id === selecteditem.id ? { ...obj, loading: true } : obj,
        // );

        // setArray(updatedArray);
        // handleuploadimage(image);
      });
    } catch (error) {
      console.log('errorerror', error);
    }
  };

  const handleuploadimage = async image => {
    try {
      setImagePickermodal(false);
      // if (findarray.image == '') {
      setImageindex(Imageindex + 1);


      // }
      const result = await uploadToS3(image);
      console.log('resultresultresult', result);

      if (result) {
        // let findarray = Array.find(item => item.id == selecteditem.id);
        const updatedArray = Array.map(obj =>
          obj.id === selecteditem.id
            ? { ...obj, image: result || '', loading: false }
            : obj,
        );

        console.log('imageimageimage', result);
        setArray(updatedArray);

        console.log('Array=======>>', Array);
      } else {
        Alert('some thing wrong please try again later');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getFormattedNumberValue = () => {
    console.log('value.toString.lengthvalue.toString.length', value.length);
    if (value.length > 0) {
      let cVal = value.replace(/[^0-9.]/g, ''); // Allow only digits and dot
      if (cVal.includes('.')) {
        return '$' + cVal; // Allow decimal values only when dot is entered
      } else {
        return '$' + cVal; // No decimal values when dot is not entered
      }
    }
  };

  const handleItemRemove = id => {
    const updatedArray = Array.filter(item => item.id !== id);

    // Add a new object at the end of the array
    updatedArray.push({ id: id, image: '', loading: false });
    setImageindex(Imageindex - 1);
    setArray(updatedArray);
  };

  const onDragEnd = ({ data }) => {
    setArray(data);
  };


  const renderItem = ({ item, index }) => {
    console.log('itemitem', item, Imageindex);
    return (

      <>
        {index <= Imageindex ? (
          <TouchableOpacity
            onPress={() => {
              setselecteditem(item), setImagePickermodal(true);
              setSelectimageFormain(item.image == '' ? false : true)
              setpresIndex(index)
            }}
            style={styles.imageAddviewtouchable}>
            {item.image == '' ? (
              <>
                <Image source={Images.addphoto} style={styles.addphoto} />
                <ResponsiveText style={styles.adphototxt}>
                  {'Add Photo'}
                </ResponsiveText>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => handleItemRemove(item.id)}
                  hitSlop={styles.hitslop}
                  style={styles.crossimage}>
                  <Image
                    source={Images.close}
                    style={styles.closeimg}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: 'data:image/jpeg;base64,' + item.image }}
                  style={{ ...styles.image, borderWidth: index == Mainimageindex ? 2 : 0, borderColor: index == Mainimageindex ? Colors.btncolor : null }}
                  resizeMode="cover"
                />
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ ...styles.imageview, borderWidth: index == Mainimageindex ? 2 : 0, borderColor: index == Mainimageindex ? Colors.btncolor : null }}>
            {item.image && (
              <>
                <TouchableOpacity
                  onPress={() => handleItemRemove(item.id)}
                  hitSlop={styles.hitslop}
                  style={styles.crossimage}>
                  <Image
                    source={Images.close}
                    style={styles.closeimg}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </>
            )}
          </View>
        )}
      </>


    );
  };



  // const renderItem = ({ item, index }) => {
  //   console.log('itemitem', item);
  //   return (
  //     <>
  //       {item.loading == true ? (
  //         <View style={styles.imageview}>
  //           <ActivityIndicator size="large" color={Colors.btncolor} />
  //         </View>
  //       ) : (
  //         <>
  //           {index <= Imageindex ? (
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setselecteditem(item), setImagePickermodal(true);
  //                 setSelectimageFormain(item.image == '' ? false : true)
  //                 setpresIndex(index)
  //               }}
  //               style={styles.imageAddviewtouchable}>
  //               {item.image == '' ? (
  //                 <>
  //                   <Image source={Images.addphoto} style={styles.addphoto} />
  //                   <ResponsiveText style={styles.adphototxt}>
  //                     {'Add Photo'}
  //                   </ResponsiveText>
  //                 </>
  //               ) : (
  //                 <>
  //                   <TouchableOpacity
  //                     onPress={() => handleItemRemove(item.id)}
  //                     hitSlop={styles.hitslop}
  //                     style={styles.crossimage}>
  //                     <Image
  //                       source={Images.close}
  //                       style={styles.closeimg}
  //                       resizeMode="cover"
  //                     />
  //                   </TouchableOpacity>
  //                   <Image
  //                     source={{ uri: 'data:image/jpeg;base64,' + item.image }}
  //                     style={{ ...styles.image, borderWidth: index == Mainimageindex ? 2 : 0, borderColor: index == Mainimageindex ? Colors.btncolor : null }}
  //                     resizeMode="cover"
  //                   />
  //                 </>
  //               )}
  //             </TouchableOpacity>
  //           ) : (
  //             <View style={{ ...styles.imageview, borderWidth: index == Mainimageindex ? 2 : 0, borderColor: index == Mainimageindex ? Colors.btncolor : null }}>
  //               {item.image && (
  //                 <>
  //                   <TouchableOpacity
  //                     onPress={() => handleItemRemove(item.id)}
  //                     hitSlop={styles.hitslop}
  //                     style={styles.crossimage}>
  //                     <Image
  //                       source={Images.close}
  //                       style={styles.closeimg}
  //                       resizeMode="cover"
  //                     />
  //                   </TouchableOpacity>
  //                   <Image
  //                     source={{ uri: item.image }}
  //                     style={styles.image}
  //                     resizeMode="cover"
  //                   />
  //                 </>
  //               )}
  //             </View>
  //           )}
  //         </>
  //       )}
  //     </>
  //   );
  // };
  return (

    <Container style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.dotimg} />
        <ResponsiveText style={styles.headerText}>
          {'New Listing'}
        </ResponsiveText>
        <TouchableOpacity>
          <View style={styles.dotimg} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ backgroundColor: `${Colors.graytext}40` }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: '20%' }}>
        <View style={styles.imagemainview}>


          <FlatList
            data={Array}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-around' }}

          />


          <ResponsiveText style={styles.sellingtxt}>
            What are you selling:
          </ResponsiveText>
        </View>

        <View style={styles.titleinput}>
          <TextInput
            value={title}
            onChangeText={text => {
              settitle(text);
            }}
            maxLength={100}
            style={styles.input}
            placeholderTextColor={'#4f4f4f'}
            multiline={true}
            placeholder="Add a title for your item"
          />
          <View style={styles.Textlength}>
            <ResponsiveText style={styles.Titlelenthstyl}>
              {titlemaxlength - title.length}
            </ResponsiveText>
          </View>
        </View>

        <ResponsiveText style={styles.sellingvalue}>Value:</ResponsiveText>

        <View style={styles.Valueinput}>
          <TextInput
            value={getFormattedNumberValue()}
            onChangeText={text => {
              setvalue(text);
            }}
            maxLength={12}
            style={{ ...styles.valueinput, height: hp(10) }}
            placeholderTextColor={'#4f4f4f'}
            keyboardType="decimal-pad"
            multiline={true}
            placeholder="Give a fair value to your Item.The more accurate it is, the more you will match."
          />
        </View>

        <ResponsiveText style={styles.sellingvalue}>Description</ResponsiveText>
        <View style={styles.titleinput}>
          <TextInput
            value={Discreption}
            onChangeText={text => {
              setDiscreption(text);
            }}
            maxLength={500}
            style={{
              ...styles.input,
              height: hp(12),
              textAlign: 'left',
              textAlignVertical: 'top',
            }}
            placeholderTextColor={'#4f4f4f'}
            multiline={true}
            placeholder="Add a description of the your item. The more description you add more chances of getting match."
          />
          <View style={styles.Textlength}>
            <ResponsiveText style={styles.Titlelenthstyl}>
              {discreptionemaxlength - Discreption.length}
            </ResponsiveText>
          </View>
        </View>



        <ResponsiveText style={styles.sellingvalue}>Category</ResponsiveText>
        <DropdownPinker

          setValue={setcategory}
          data={dropdownData}
          value={category}

        />

        <ResponsiveText style={styles.sellingvalue}>Location</ResponsiveText>

        <View style={styles.Valueinput}>
          <TextInput
            value={Locationname}
            onChangeText={text => {
              setLocationname(text);
            }}
            onFocus={() => setModalVisible(true)}
            onPressIn={() => setModalVisible(true)}
            style={styles.valueinput}
            placeholderTextColor={'#4f4f4f'}
            placeholder="Location"
          />
        </View>
        <View style={styles.texttogle}>
          <ResponsiveText style={styles.cashoffer}>Cash offers</ResponsiveText>
          <TouchableOpacity onPress={() => setcashTogle(!cashTogle)}>
            <Image
              source={cashTogle ? Images.togolon : Images.togoloff}
              style={styles.togolbtn}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.btnview}>
          <Button
            onPress={() => uploaditem()}
            title={'Post item'}
            titleStyle={styles.btntitle}
            loading={Loading}
            loadingColor={Colors.secondaryColor}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ImagePickermodal}
        onRequestClose={() => {
          setImagePickermodal(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setImagePickermodal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {SelectimageFormain ? <TouchableOpacity
                style={styles.modlbtn}
                hitSlop={styles.hitslop}
                onPress={() => {
                  setMainimageindex(presIndex);
                  setImagePickermodal(false)


                }}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Make as Main Image
                </ResponsiveText>
              </TouchableOpacity> : null}
              <TouchableOpacity
                style={styles.modlbtn}
                hitSlop={styles.hitslop}
                onPress={() => {
                  selectFromcamera();
                }}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Take photo
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => selecFromgalery()}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Select from gallery
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => setImagePickermodal(false)}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Cancel
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <GooglePlacesAutocomplete
              placeholder={'Search Location'}
              onPress={onPress}
              onFail={error => console.log(error, 'onfail')}
              onNotFound={() => console.log('Not found')}
              minLength={2}
              autoFocus={true}
              fetchDetails={true}
              currentLocation={true} // Set this prop to true
              listViewDisplayed={true}
              currentLocationLabel={Locationname}
              styles={{
                textInputContainer: {},
                textInput: {
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.btncolor,
                },
                predefinedPlacesDescription: {
                  color: Colors?.btncolor,
                },
                row: {
                  padding: 13,
                  height: 44,
                  flexDirection: 'row',
                },
                description: {
                  color: 'black',
                },
              }}
              predefinedPlacesAlwaysVisible={true}
              query={{
                key: apiKey,
                language: 'en',
              }}
              textInputProps={{
                placeholderTextColor: 'gray',
                color: 'black',
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Additem;
