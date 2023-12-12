import {
  Image,
  ImageBackground,

  ScrollView,

  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import styles from './styles';
import Images from '../../../components/Images';
import ResponsiveText from '../../../components/ResponsiveText';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button';
import Swiper from 'react-native-deck-swiper';
import CustomModal from '../../../components/CustomModal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../components/Responsiveui';
import TextInputcomp from '../../../components/TextInputcomp';
import Header from '../../../components/Header';
import { SuccessToast } from '../../../components/SuccessToast';
import { ErrorToast } from '../../../components/ErrorToast';
import { useCreateCashOfferMutation } from '../../../Graphql/Graphql';
import { getAddressFromLatLng } from '../../../Apis/Apis';
import Carousel from 'react-native-snap-carousel';
const ItemDetail = props => {
  let previousdata = props?.route?.params?.item
  let sourceItemId = props?.route?.params?.sourceItemId
  let refrence = props?.route?.params?.refrence
  let selectedItem = props?.route?.params?.selectedItem
  console.log('selectedItemselectedItemselectedItem', props?.route?.params);

  const [createCashOffer] = useCreateCashOfferMutation();
  const swiperRef = useRef(null);

  const [swiperData, setswiperData] = useState([...previousdata.imageUrls, previousdata?.mainImageUrl])
  const [cardIndex, setcardIndex] = useState(0)
  const [Cashoffermodal, setCashoffermodal] = useState(false);
  const [cahsValue, setcahsValue] = useState();
  const [Location, setLocation] = useState('');



  useEffect(() => {

    getAddressFromLatLng(previousdata?.latitude, previousdata?.longitude)
      .then(address => setLocation(address))
      .catch(error => console.error(error.message));

  }, [])

  const Giveoffer = () => {

    try {
      if (cahsValue) {


        createCashOffer({
          variables: {
            sourceItemId: selectedItem?.id,
            targetItemId: previousdata.id,
            cash: parseInt(cahsValue),
            sourceStatus: 1,
            targeteStatus: 1,
          },
        })
          .then(res => {

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
              props.navigation.navigate('TabBarNav', {
                screen: 'Home'
              })
            }
            setCashoffermodal(false);

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

      }
    } catch (error) {
      console.log('errorerror', error);
    }
  };
  const handleAccept = (item, type) => {
    try {

      console.log('item', item, '\nitemid==', sourceItemId);
      if (type == 'dismiss') {
        // dismissItem({
        //   variables: {
        //     sourceItemId: sourceItemId?.id,
        //     targetItemId:  item.id,
        //   },
        // }).then((res)=>{
        // SuccessToast({
        //   title: 'Congratulation',
        //   text: 'Dissmiss item 👎',
        // });
        refrence?.swipeLeft()
        props.navigation.navigate('TabBarNav', {
          screen: 'Home'
        })
        // console.log('dismissItemdismissItem',res);
        // if(res){

        //   props.navigation.navigate('TabBarNav',{
        //     screen:'Home'
        //   })
        // }
      }

      // ).catch(error=>{
      //   console.log('error from creating offer',error)
      // });
      // }
      else {
        refrence?.swipeRight()
        props.navigation.navigate('TabBarNav', {
          screen: 'Home'
        })
        // createOffer({
        //   variables: {
        //     sourceItemId: sourceItemId?.id,
        //     targetItemId: item.id,
        //     sourceStatus: 1,
        //     targeteStatus:1
        //   },
        // }).then((res)=>{
        //   refrence?.swipeRight()
        //   SuccessToast({
        //     title: 'Congratulation',
        //     text: 'Request send successfully 👍',
        //   });
        //   console.log('createOfferResponse',res);
        //   if(res?.data?.createOffer?.targeteStatus==1){
        //     props.navigation.navigate('MatchingSuccess',{
        //       screenName:'Detail'
        //     })
        //   }
        //   else{

        //     props.navigation.navigate('TabBarNav',{
        //       screen:'Home'
        //     })
        // //   }

        // }

        // ).catch(error=>{
        //   console.log('error from creating offer',error)
        //   ErrorToast({
        //     title: 'Congratulation',
        //     text: 'Some thing went wrong please try again',
        //   });
        // });
      }




    } catch (error) {
      console.log('errorerror', error);
    }

  }



  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <Header title={'Detail'} onPress={() => props.navigation.goBack()} />

      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(10) }}>

        <View style={styles.swiperview}>

          {/* <Swiper
            ref={swiperRef}
            cards={swiperData}
            renderCard={(card, index) => {

              return (
                <ImageBackground resizeMode='cover' style={styles.backgroundImg}
                  source={{ uri: card }}>

                  {previousdata?.isSwapOnly ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setCashoffermodal(true);
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
                    <TouchableOpacity onPress={() => handleAccept(previousdata, 'dismiss')}>
                      <Image source={Images.swipeCircleCross} style={styles.crossIcon} />
                    </TouchableOpacity>

                    <ResponsiveText style={styles.text}>{previousdata?.title}</ResponsiveText>

                    <TouchableOpacity onPress={() => handleAccept(previousdata, 'accept')}>
                      <Image source={Images.swipeCircleTick} style={styles.tickIcon} />
                    </TouchableOpacity>
                  </View>

                </ImageBackground>
              );
            }}
            onSwipedAll={() => { setswiperData([...previousdata.imageUrls, previousdata?.mainImageUrl]), setcardIndex(0), swiperRef?.current?.jumpToCardIndex(0) }}
            cardIndex={cardIndex}
            onSwiped={(index) => setcardIndex(index)}
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
            stackSize={2}

          /> */}


          <Carousel

            data={swiperData}
            renderItem={({ item, index }) => (
              <ImageBackground resizeMode='cover' style={styles.backgroundImg}
                source={{ uri: item }}>

                {previousdata?.isSwapOnly ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setCashoffermodal(true);
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
                  <TouchableOpacity onPress={() => handleAccept(previousdata, 'dismiss')}>
                    <Image source={Images.swipeCircleCross} style={styles.crossIcon} />
                  </TouchableOpacity>

                  <ResponsiveText style={styles.text}>{previousdata?.title}</ResponsiveText>

                  <TouchableOpacity onPress={() => handleAccept(previousdata, 'accept')}>
                    <Image source={Images.swipeCircleTick} style={styles.tickIcon} />
                  </TouchableOpacity>
                </View>

              </ImageBackground>
            )}
            sliderWidth={wp(100)}
            itemWidth={wp(95)}
          />
        </View>

        <View style={styles.headingView}>
          <ResponsiveText style={styles.textt}>
            {'Description:'}
          </ResponsiveText>
        </View>
        <View style={styles.secondview}>

          <ResponsiveText style={styles.textt}>
            {previousdata?.description}
          </ResponsiveText>
        </View>
        {/* <View style={styles.headingView}>
          <ResponsiveText style={styles.textt}>
            {'Value:'}
          </ResponsiveText>
        </View> */}
        {/* <View style={styles.secondview}>

          <ResponsiveText style={styles.textt}>
            $ {previousdata?.askingPrice}
          </ResponsiveText>
        </View> */}


        <View style={styles.headingView}>
          <ResponsiveText style={styles.textt}>
            {'Location:'}
          </ResponsiveText>
        </View>
        <View style={styles.secondview}>

          <ResponsiveText style={styles.textt}>
            {Location}
          </ResponsiveText>
        </View>




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

      </ScrollView>
    </Container>
  );
};

export default ItemDetail;