import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
import { UpdateItemMutation } from '../../../Graphql/Graphql';
import { heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { apiKey, getAddressFromLatLng, getCategory } from '../../../Apis/Apis';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SuccessToast } from '../../../components/SuccessToast';
import DropdownPinker from '../../../components/DropdownPicker';



const Edititem = props => {
  console.log('propsprops', props.route.params?.item);


  const [defaultaray, setdefaultaray] = useState([

    { id: 2, image: '', loading: false },
    { id: 3, image: '', loading: false },
    { id: 4, image: '', loading: false },
    { id: 5, image: '', loading: false },
    { id: 6, image: '', loading: false },
  ]);
  const [Array, setArray] = useState(defaultaray);
  let previousdata = props.route.params?.item;

  const [UpdateItem, { loading, error, data }] = UpdateItemMutation();
  const [title, settitle] = useState(
    previousdata?.title ? previousdata?.title : '',
  );
  const [value, setvalue] = useState(
    previousdata?.askingPrice ? previousdata?.askingPrice.toString() : '',
  );
  const [Discreption, setDiscreption] = useState(
    previousdata?.description ? previousdata?.description : '',
  );
  const [selecteditem, setselecteditem] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Location, setLocation] = useState({
    latitude: previousdata?.latitude,
    longitude: previousdata?.longitude,
  });
  const [Imageindex, setImageindex] = useState(0);
  const [cashTogle, setcashTogle] = useState(previousdata?.isSwapOnly);
  const [Locationname, setLocationname] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setcategory] = useState(previousdata?.categories.length > 0 ? { label: previousdata?.categories[0], value: previousdata?.categories[0] } : '');
  console.log('previousdata?.categories[0]', category);
  const [ImagePickermodal, setImagePickermodal] = useState(false);
  const [Mainimageindex, setMainimageindex] = useState(0);
  const [SelectimageFormain, setSelectimageFormain] = useState(false);
  const [dropdownData, setDropdownData] = useState([])
  const [presIndex, setpresIndex] = useState(0);
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
    setArray(defaultaray);
    setImageindex(0)

    // getCurrentLocation();
    // for (let i = 0; i < Array.length; i++) {
    //   defaultaray[i].image = '';
    // }

    console.log('defaultaraydefaultaray', defaultaray);
    console.log('defaultaraydefaultaray', previousdata?.mainImageUrl);


    for (
      let i = 0;
      i < Array.length && i < previousdata?.imageUrls.length;
      i++
    ) {

      Array[i].image = previousdata?.imageUrls[i];



    }


    let obj = {
      id: 1, image: previousdata?.mainImageUrl, loading: false
    }

    setArray([obj, ...Array])

    setImageindex(Array.filter(i => i.image).length + 1)



    console.log('adddddddddd', Array, Imageindex);

    getAddressFromLatLng(previousdata?.latitude, previousdata?.longitude)
      .then(address => setLocationname(address))
      .catch(error => console.error(error.message));
    return () => {
      // Cleanup function: Reset the state when the component is unmounted
      setArray([])
      setImageindex(0)
      setdefaultaray([])

    }
  }, []);

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
  let titlemaxlength = 100;
  let discreptionemaxlength = 500;
  // const getCurrentLocation = async () => {
  //   Geolocation.getCurrentPosition(info => {

  //     console.log(info);
  //   });
  // };
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
      } else if (!Discreption) {
        Alert.alert('Field Required', 'Please enter your item descreption');
      }
      else if (!category?.value) {
        Alert.alert('Field Required', 'Please select your item category');
      }

      else {
        const imageUrls = Array.filter(obj => obj.image !== '').map(
          obj => obj.image,
        );


        console.log('before image shiftt', imageUrls);

        // Ensure mainImageIndex is valid
        if (Mainimageindex >= 0 && Mainimageindex < imageUrls.length) {
          const mainImage = imageUrls.splice(Mainimageindex, 1)[0];

          console.log('mainImagemainImagemainImage', mainImage);
          imageUrls.unshift(mainImage);
        }

        console.log('after image shiftt', Mainimageindex, imageUrls);

        setLoading(true);
        let trimmedValue = 0
        if (value.toString().includes('$')) {
          trimmedValue = value.slice(1);

        }
        else {
          trimmedValue = value
        }
        const result = extractUrlAndRemainingArray(imageUrls, Mainimageindex);
        console.log('resultresultresult', result.selectedUrl);
        console.log('resultresultresultresultresult', result.remainingUrls);


        let remainingUrls = result.remainingUrls
        let selectedUrl = result.selectedUrl


        console.log('trimmedValuetrimmedValuetrimmedValue', value, trimmedValue, parseFloat(trimmedValue));
        const resultuploaditem = await UpdateItem({
          variables: {
            id: previousdata?.id,
            item: {
              askingPrice: parseFloat(trimmedValue),
              categories: [category?.label],
              description: Discreption,
              title: title,
              imageUrls: remainingUrls,
              mainImageUrl: selectedUrl,
              latitude: Location?.latitude,
              longitude: Location?.longitude,
              isSwapOnly: cashTogle,
            },
          },
        });
        console.log('resultresultresult', resultuploaditem);
        setLoading(false);

        if (resultuploaditem) {
          SuccessToast({
            title: 'Congratulation',
            text: 'Item updated Successfully ',
          });
          props.navigation.goBack();
        }
      }
    } catch (error) {
      console.log('errorerrorerrorerror from post item', error);
      Alert.alert(error?.message);
      setLoading(false);
    }
  };

  // const selecFromgalery = () => {
  //   try {
  //     ImagePicker.openPicker({
  //       mediaType: 'photo',
  //       width: 500,
  //       height: 500,
  //       cropping: false,
  //     })
  //       .then(image => {

  //         // }
  //         setImagePickermodal(false);
  //         handleuploadimage(image);
  //         const updatedArray = Array.map(obj =>
  //           obj.id === selecteditem.id ? { ...obj, loading: true } : obj,
  //         );

  //         let nonEmptyImageArray = updatedArray.filter((item) => item.image !== '');
  //         console.log('nonEmptyImageArray:', nonEmptyImageArray);

  //         // Set the array state with the updated array
  //         setArray(updatedArray);

  //         // Update the image index based on the length of non-empty images (up to a maximum of 6)
  //         setImageindex(Math.min(nonEmptyImageArray.length, 6));
  //         setArray(updatedArray);
  //       })
  //       .catch(error => {
  //         console.log(error, 'error');
  //         setImagePickermodal(false);
  //       });
  //   } catch (error) {
  //     setImagePickermodal(false);

  //     console.log('errorerror', error);
  //   }
  // };
  const selecFromgalery = async () => {
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
          console.log('startIndexstartIndex', startIndex);
          let nonEmptyImageArray = updatedArray.filter((item) => item.image != '');
          console.log('nonEmptyImageArray:', nonEmptyImageArray);
          setImageindex(Math.min(nonEmptyImageArray.length, 6));
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
            console.log('updatedArray: issssss', updatedArray);
            // Get the length of the updated array with non-empty images

            // Set the array state with the updated array
            setArray(updatedArray);

            // Update the image index based on the length of non-empty images (up to a maximum of 6)

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
      // if (findarray.image == '') {

      const result = await uploadToS3(image);
      console.log('resultresultresult', result);
      if (result) {
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

  const renderItem = ({ item, index }) => {

    return (
      <>
        {item.loading == true ? (
          <View style={styles.imageview}>
            <ActivityIndicator size="large" color={Colors.btncolor} />
          </View>
        ) : (
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
                      source={{ uri: item?.image?.startsWith("https") ? item?.image : 'data:image/jpeg;base64,' + item?.image }}
                      style={{ ...styles.image, borderWidth: index == Mainimageindex ? 2 : 0, borderColor: index == Mainimageindex ? Colors.btncolor : null }}

                      resizeMode="cover"
                    />
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <>
                <View style={styles.imageview}>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </>
            )}
          </>
        )}
      </>
    );
  };
  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.dotimg} />
        <ResponsiveText style={styles.headerText}>
          {'Edit Listing'}
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
            title={'Update item'}
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
              onFail={error => console.log(error)}
              onNotFound={() => console.log('Not found')}
              minLength={2}
              autoFocus={true}
              fetchDetails={true}
              currentLocation={true}
              listViewDisplayed={true}
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

export default Edititem;
