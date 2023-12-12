import {
  Image,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import Colors from '../../../theme/colors';
import styles from './styles';
import ResponsiveText from '../../../components/ResponsiveText';
import Images from '../../../components/Images';
import Button from '../../../components/Button';
import Slider from 'react-native-slider';
import { Fonts } from '../../../theme/Fonts';
import {
  UpdateDOB,
  UpdateDistance,
  UpdateGender,
  UpdateMobilenumber,
  UpdateUserLocat,
} from '../../../Graphql/Graphql';
import { SuccessToast } from '../../../components/SuccessToast';
import PhoneInput from 'react-native-phone-number-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserNameUpdate, apiKey, getAddressFromLatLng } from '../../../Apis/Apis';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextInputcomp from '../../../components/TextInputcomp';

const SettingDetail = props => {
  let data = props.route.params.data;
  let fieldname = props.route.params.fieldname;
  const [Distance, setDistance] = useState(data?.distance ? data?.distance : 0);
  console.log('datadata', fieldname, data);
  const [selectedGender, setSelectedGender] = useState(data?.gender);
  const [phonenumber, setphonenumber] = useState(
    data?.mobile ? data?.mobile.slice(2) : '',
  );
  const [Locationname, setLocationname] = useState(data);
  const [Location, setLocation] = useState({});
  const [CountryCOde, setCountryCOde] = useState(
    data?.mobile ? data?.mobile?.slice(0, 2) : '',
  );

  const phoneInput = useRef(null);
  const [updateUserDistance] = UpdateDistance();
  const [UpdateUsergender] = UpdateGender();
  const [UpdateDateofbirh] = UpdateDOB();
  const [updateUsermobilenumber] = UpdateMobilenumber();
  const [UpdateUserLocation] = UpdateUserLocat();
  // date
  const [date, setDate] = useState(new Date());
  const [dateToShow, setdateToShow] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setfirstName] = useState(data?.firstName ?? '');
  const [lastName, setlastName] = useState(data?.lastName ?? '');

  const handleDateChange = (event, currentDate) => {
    setShowDatePicker(false);
    console.log('event', event);
    // const currentDate = selectedDate
    console.log('currentDatecurrentDate', currentDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    let formateddate = new Date(currentDate).toLocaleDateString(
      undefined,
      options,
    );
    console.log('formateddateformateddate', formateddate);
    setdateToShow(formateddate);
    setShowDatePicker(false);
    setDate(currentDate);
  };

  let genderaray = [
    {
      name: 'Male',
      id: 1,
    },
    {
      name: 'Female',
      id: 2,
    },
    {
      name: 'Others',
      id: 3,
    },
  ];

  useEffect(() => {
    console.log('====================================');
    console.log('useeffff');
    console.log('====================================');
    if (!data?.dateOfBirth) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      let formateddate = new Date(date).toLocaleDateString(undefined, options);
      setdateToShow(formateddate);
    } else {
      const dateParts = data?.dateOfBirth.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      const date = new Date(Date.UTC(year, month, day));

      setDate(date);

      setdateToShow(`${month}/${day}/${year}`);
    }
  }, []);

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  //

  const HandleDistanceupdate = async () => {
    try {
      console.log('DistanceDistance', parseInt(Distance), typeof Distance);
      const Updateresponse = await updateUserDistance({
        variables: {
          distance: parseInt(Distance),
        },
      });
      if (Updateresponse?.data?.updateUserDistance) {
        SuccessToast({
          title: 'Congratulation',
          text: 'Distance updated Successfully 👍',
        });
        props?.navigation?.goBack();
      }
      console.log('UpdateresponseUpdateresponse', Updateresponse);
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  const HandleUpdateLocation = async () => {
    try {
      console.log('LocationLocationLocation', Location);

      const Updateresponse = await UpdateUserLocation({
        variables: {
          latitude: Location?.latitude,
          longitude: Location?.longitude,
        },
      });
      if (Updateresponse) {
        SuccessToast({
          title: 'Congratulation',
          text: 'Location updated Successfully 👍',
        });
        props?.navigation?.goBack();
      }
      console.log('UpdateresponseUpdateresponse', Updateresponse);
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  const HandleGender = async () => {
    try {
      if (selectedGender) {
        const Updateresponse = await UpdateUsergender({
          variables: {
            gender: selectedGender,
          },
        });

        console.log('UpdateresponseUpdateresponse', Updateresponse);
        if (Updateresponse) {
          SuccessToast({
            title: 'Congratulation',
            text: 'Gender change Successfully 👍',
          });
          props?.navigation?.goBack();
        }
      } else {
        props?.navigation?.goBack();
      }
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  const Handledob = async () => {
    try {
      console.log('formattedDateformattedDate', dateToShow);
      if (data) {
        const Updateresponse = await UpdateDateofbirh({
          variables: {
            dateOfBirth: dateToShow.toString(),
          },
        });

        console.log('UpdateresponseUpdateresponse', Updateresponse);
        if (Updateresponse) {
          SuccessToast({
            title: 'Congratulation',
            text: 'Date of birth change Successfully 👍',
          });
          props?.navigation?.goBack();
        }
      } else {
        props?.navigation?.goBack();
      }
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  const HandlePhonenumber = async () => {
    try {
      console.log(
        'phonenumberphonenumberphonenumber',
        CountryCOde + phonenumber,
      );

      if (phonenumber) {
        const Updateresponse = await updateUsermobilenumber({
          variables: {
            mobile: CountryCOde + phonenumber,
          },
        });

        console.log('UpdateresponseUpdateresponse', Updateresponse);
        if (Updateresponse) {
          SuccessToast({
            title: 'Congratulation',
            text: 'Mobile number change Successfully 👍',
          });
          props?.navigation?.goBack();
        }
      } else {
        props?.navigation?.goBack();
      }
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

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


  const handleUsernameUpdate = async () => {
    try {
      let response = UserNameUpdate(firstName ?? data?.firstName, lastName ?? data?.lastName)
      console.log('responseresponseresponse', response);
      SuccessToast({
        title: 'Congratulation',
        text: 'Your name change Successfully 👍',
      });
      props?.navigation?.goBack();

    } catch (error) {
      console.log('error on nameupdate', error);
    }
  }
  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <ResponsiveText style={styles.headerText}>{'Cancel'}</ResponsiveText>
        </TouchableOpacity>
        <ResponsiveText style={styles.headerText}>
          {fieldname ? fieldname : ''}
        </ResponsiveText>
        <TouchableOpacity
          onPress={() =>
            fieldname == 'Distance'
              ? HandleDistanceupdate()
              : fieldname == 'Gender'
                ? HandleGender()
                : fieldname == 'Date of birth'
                  ? Handledob()
                  : fieldname == 'Mobile'
                    ? HandlePhonenumber()
                    : fieldname == 'Location'
                      ? HandleUpdateLocation()
                      : fieldname == 'Full name' ?
                        handleUsernameUpdate()
                        : props.navigation.goBack()
          }>
          <ResponsiveText
            style={{ ...styles.headerText, color: Colors.btncolor }}>
            {'Done'}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      {fieldname == 'Full name' && (
        <View style={styles.fulnameview}>
          <ResponsiveText style={styles.headingtxt}>
            {'First Name'}
          </ResponsiveText>

          <TextInputcomp
            placeholder={'First Name'}
            value={firstName}
            onChangeText={setfirstName}
          />
          {/* 
          <View style={styles.borderrow}>
            <ResponsiveText style={styles.titlectext}>
              {data?.firstName}
            </ResponsiveText>
            <Image source={Images.tickcheck} style={styles.tickcheckicon} />
          </View> */}

          <ResponsiveText style={{ ...styles.headingtxt, marginTop: 20 }}>
            {'Last Name'}
          </ResponsiveText>

          <TextInputcomp
            placeholder={'Last Name'}
            value={lastName}
            onChangeText={setlastName}
          />

          {/* <View style={styles.borderrow}>
            <ResponsiveText style={styles.titlectext}>
              {data?.lastName}
            </ResponsiveText>
            <Image source={Images.tickcheck} style={styles.tickcheckicon} />
          </View> */}

          <ResponsiveText style={styles.disc}>
            {'Only your first name will be displayed publicly.'}
          </ResponsiveText>
        </View>
      )}

      {fieldname == 'Email' && (
        <View style={styles.fulnameview}>
          <View style={styles.borderrow}>
            <ResponsiveText style={styles.emailtext}>
              {data?.email}
            </ResponsiveText>
            <Image source={Images.tickcheck} style={styles.tickcheckicon} />
          </View>

          <ResponsiveText style={styles.disc}>
            {'You can use your email address or mobile number to login.'}
          </ResponsiveText>
        </View>
      )}

      {fieldname == 'Location' && (
        <View style={styles.fulnameview}>
          <ResponsiveText style={styles.headingtxt}>
            {'Current Location'}
          </ResponsiveText>

          <View style={styles.borderrow2}>
            <View style={styles.locatinrow}>
              <Image source={Images.location} style={styles.location} />
              <ResponsiveText style={styles.titlectext2}>
                {Locationname}
              </ResponsiveText>
            </View>
            <Image
              source={Images.tick}
              style={styles.tick}
              resizeMode="contain"
            />
          </View>
          <Button
            onPress={() => {
              setModalVisible(true);
            }}
            btnContainer={{ marginTop: '10%' }}
            title={'Change you location'}
            titleStyle={styles.btntitle}
            // loading={loading}
            loadingColor={Colors.secondaryColor}
          />
        </View>
      )}

      {fieldname == 'Distance' && (
        <View style={styles.fulnameview}>
          <ResponsiveText style={styles.headingtxt}>
            {'Enter Distance'}
          </ResponsiveText>

          <View style={styles.textinputview}>
            <TextInput
              value={Distance > 0 ? Distance.toString() : Distance}
              onChangeText={number => {
                number = number.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                if (number >= 0 && number <= 1000000000) { setDistance(number) }
                if (number.length == 0) {
                  setDistance('0')
                }
              }}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter distance"
              placeholderTextColor={Colors.darkGray}
            />
          </View>
          <View style={styles.slider}>
            <Slider
              value={Number(Distance)}
              onValueChange={newValue => setDistance(newValue)}
              minimumTrackTintColor={Colors.primaryColor}
              maximumTrackTintColor={`${Colors.graytext}20`}
              minimumValue={0}
              maximumValue={1000000000}
              thumbTintColor={Colors.primaryColor}
            />
          </View>
          <ResponsiveText style={styles.disc}>
            {`Show items up to `}
            <ResponsiveText
              style={{
                ...styles.disc,
                color: Colors.black,
                fontSize: 16,
                fontFamily: Fonts.FontsBold,
              }}>
              {`${parseInt(Distance)} Miles away`}
            </ResponsiveText>
          </ResponsiveText>
        </View>
      )}

      {fieldname == 'Mobile' && (
        <View style={styles.phonenumberinput}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phonenumber}
            defaultCode={data?.mobile ? data?.mobile?.slice(0, 2) : 'US'}
            layout="first"
            onChangeText={text => {
              setphonenumber(text);
            }}
            style={styles.phoneinput}
            onChangeFormattedText={text => {
              // setCountryCOde(text);
            }}
            onChangeCountry={code => {
              console.log(code?.cca2, 'code');
              setCountryCOde(code?.cca2);
            }}
            containerStyle={styles.phoneinput}
            textContainerStyle={styles.phonetext}
            withShadow
            autoFocus
          />
        </View>
      )}

      {fieldname == 'Date of birth' && (
        <View style={styles.ganderradio}>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateofb}>
            <ResponsiveText style={styles.dob}>
              {' '}
              Date: {dateToShow}
            </ResponsiveText>

            <Image source={Images.calander} style={styles.calandericon} />
          </TouchableOpacity>
        </View>
      )}

      {fieldname == 'Gender' && (
        <View style={styles.ganderradio}>
          <ResponsiveText style={styles.gender}>{'Gender:'}</ResponsiveText>
          {genderaray.map(item => (
            <TouchableOpacity
              onPress={() => setSelectedGender(item.name)}
              style={styles.radiobtnrow}>
              {item.name == selectedGender ? (
                <View style={styles.checkdesign}>
                  <View style={styles.checkfill} />
                </View>
              ) : (
                <View style={styles.uncheckradio} />
              )}
              <ResponsiveText style={styles.gendertxt}>
                {item?.name}
              </ResponsiveText>
            </TouchableOpacity>
          ))}
        </View>
      )}

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

export default SettingDetail;
