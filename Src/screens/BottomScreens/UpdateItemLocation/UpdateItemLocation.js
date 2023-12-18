import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { UpdateItemLocationMutation } from '../../../Graphql/Graphql';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import Colors from '../../../theme/colors';
import axios from 'axios';
import { apiKey, updateAllItemsLocation, updateItemLocation } from '../../../Apis/Apis';
import ResponsiveText from '../../../components/ResponsiveText';
import { SuccessToast } from '../../../components/SuccessToast';


export const UpdateItemLocation = (props) => {


  const [updateItemLocationMutation] = UpdateItemLocationMutation();
  console.log('props?.route.params,props?.route.params', props?.route.params);
  const region = props?.route.params.region
  const itemId = props?.route.params.itemId
  const userId = props?.route.params.userId
  const type = props?.route.params.type


  const [searchLocation, setSearchLocation] = useState(null);

  const mapref = useRef(null)

  const [modalVisible, setModalVisible] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    getAddressFromLatLng(region.latitude, region.longitude)
  }, [])


  const getAddressFromLatLng = async (latitude, longitude) => {
    try {

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );


      console.log('responseresponseresponse', response);
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        setUpdateModal(false)
        console.log('addressaddress', address);
        setSearchLocation(address)

      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      throw new Error('Error fetching address: ' + error.message);
    }
  };

  const [currentRegion, setcurrentRegion] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [MarkerPosition, setMarkerPosition] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
  });



  const onUpdatePress = async (type) => {
    try {
      console.log('MarkerPosition', MarkerPosition);
      if (type == 'all') {

        let res = await updateAllItemsLocation(userId, MarkerPosition.latitude, MarkerPosition.longitude)

        console.log('resresres update location of all item', res);
        SuccessToast({
          title: 'Congratulation',
          text: 'Location updated Successfully '
        })
        props.navigation.goBack();
      } else {
        let res = await updateItemLocation(itemId, MarkerPosition.latitude, MarkerPosition.longitude)

        console.log('resresres update location of one item', res);
        SuccessToast({
          title: 'Congratulation',
          text: 'Location updated Successfully '
        })
        props.navigation.goBack();

      }



    } catch (error) {
      Alert.alert(
        'Something went wrong',
        'Do you want to go back?',
        [
          {
            text: 'OK',
            onPress: () => props.navigation.goBack(),
          },
        ],
        { cancelable: false },
      );

      console.log('error from update location', error);
    }
  };

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log('latitude, longitude', latitude, longitude);
    getAddressFromLatLng(latitude, longitude)


    setMarkerPosition({ latitude, longitude });
  };

  const onPress = (data, details) => {
    setModalVisible(false)
    console.log('====================================');
    console.log(details?.geometry.location
      , data?.description);

    setcurrentRegion({
      latitude: details?.geometry.location?.lat,
      longitude: details?.geometry.location?.lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    setMarkerPosition({
      latitude: details?.geometry.location?.lat,
      longitude: details?.geometry.location?.lng,
    });
    mapref.current.animateToRegion(
      {
        latitude: details?.geometry.location?.lat,
        longitude: details?.geometry.location?.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }

    )

    setSearchLocation(data?.description)
    console.log('====================================');
  };

  return (
    <View style={styles.container}>

      <MapView ref={mapref} style={styles.map} initialRegion={currentRegion}>

        <Marker
          coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}
          // title="Marker Title"
          // description="Marker Description"
          draggable
          onDragEnd={handleMarkerDrag}
        />
      </MapView>
      {type != 'view' && <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          onChangeText={setSearchLocation}
          value={searchLocation}
          onFocus={() => setModalVisible(true)}
          onPressIn={() => setModalVisible(true)}
          placeholder="Search locations"
          placeholderTextColor={Colors.darkGray}
        />
      </View>}
      {type != 'view' &&
        <TouchableOpacity onPress={() => setUpdateModal(true)} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      }

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
              onFail={(error) => console.log('errorerrorerrorerror', error)}
              onNotFound={() => console.log('Not found')}
              minLength={2}
              autoFocus={true}

              fetchDetails={true}
              currentLocation={true}
              listViewDisplayed={true}
              styles={{

                textInputContainer: {
                },
                textInput: {
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.btncolor
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


                }


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




      <Modal
        animationType="slide"
        transparent={true}
        visible={UpdateModal}
        onRequestClose={() => {
          setUpdateModal(!UpdateModal);
        }}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>

            <ResponsiveText>
              Do you want to update all item locations?
            </ResponsiveText>
            <TouchableOpacity onPress={() => onUpdatePress('one')} style={styles.button2}>
              <Text style={styles.buttonText}>Update Once</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onUpdatePress('all')} style={{ ...styles.button2, marginTop: hp(2) }}>
              <Text style={styles.buttonText}>Update ALL</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center'
  },
  centeredView2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView2: {
    backgroundColor: 'white',
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    width: wp(100),
    height: hp(100),
    backgroundColor: 'white',
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#DBAC3B',
    borderRadius: 50,
    margin: 10,
    position: 'absolute',
    bottom: 20,
    width: '80%',
    alignSelf: "center"
  },
  button2: {
    padding: 10,
    backgroundColor: '#DBAC3B',
    borderRadius: 50,
    width: wp(80),
    alignSelf: "center",
    marginTop: hp(5)
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  textInput: {
    padding: 2,
    backgroundColor: '#fff',
    margin: 10,
    position: 'absolute',
    top: 10,
    width: wp(85),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: wp(80),
    paddingHorizontal: 10,
    height: hp(6),
    color: Colors.black

  }
});