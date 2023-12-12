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
import { AccetReciveOffer, DeleteMadeoffer, clearApolloCache, useCreateCashOfferMutation } from '../../../Graphql/Graphql';
import { getAddressFromLatLng } from '../../../Apis/Apis';
import { useApolloClient } from '@apollo/react-hooks';
import Carousel from 'react-native-snap-carousel';

const ProductDetail = props => {
    let previousdata = props?.route?.params?.item
    console.log('previousdatapreviousdatapreviousdata', previousdata);

    const [swiperData, setswiperData] = useState(previousdata?.targetItem[0] ? [...previousdata?.targetItem[0].imageUrls, previousdata?.targetItem[0].mainImageUrl] : [...previousdata?.targetItem?.imageUrls, previousdata?.targetItem?.mainImageUrl])
    const [deleteOfferMutation] = DeleteMadeoffer();
    const [acceptOffer] = AccetReciveOffer();
    const client = useApolloClient();


    const [Location, setLocation] = useState('');



    useEffect(() => {

        if (previousdata?.targetItem[0]) {
            getAddressFromLatLng(previousdata?.targetItem[0]?.latitude, previousdata?.targetItem[0]?.longitude)
                .then(address => setLocation(address))
                .catch(error => console.error(error.message));
        } else {
            getAddressFromLatLng(previousdata?.targetItem?.latitude, previousdata?.targetItem?.longitude)
                .then(address => setLocation(address))
                .catch(error => console.error(error.message));
        }


    }, [])

    const handleAcceptMutation = async item => {


        try {
            acceptOffer({
                variables: {
                    offerId: item.id,
                },
            }).then(res => {
                clearApolloCache(client);

                clearApolloCache(client);
                props.navigation.goBack()
                console.log('resssss handleAcceptMutation;eeeeee', res);
                SuccessToast({
                    title: 'Congratulation',
                    text: 'Offer Accepted Successfully 👍',
                });

                console.log(`Offer with ID ${item.id} Accepted successfully!`);
            });
        } catch (error) {
            console.error(`Error deleting offer: ${error.message}`);
        }
    };


    const handleMadeDelte = async item => {
        try {
            deleteOfferMutation({
                variables: {
                    id: item.id,
                },
            }).then(res => {
                clearApolloCache(client);
                props.navigation.goBack()


                console.log('resssss de;eeeeee', res);
                SuccessToast({
                    title: 'Congratulation',
                    text: 'Offer Deleted Successfully 👍',
                });

                console.log(`Offer with ID ${item.id} deleted successfully!`);
            });
        } catch (error) {
            console.error(`Error deleting offer: ${error.message}`);
        }
    };

    const handleRejectMutation = async item => {
        try {
            deleteOfferMutation({
                variables: {
                    id: item.id,
                },
            }).then(res => {
                clearApolloCache(client);
                props.navigation.goBack()

                console.log('resssss de;eeeeee', res);
                SuccessToast({
                    title: 'Congratulation',
                    text: 'Offer Rejected Successfully 👍',
                });

                console.log(`Offer with ID ${item.id} Rejected successfully!`);
            });
        } catch (error) {
            console.error(`Error deleting offer: ${error.message}`);
        }
    };

    return (
        <Container style={styles.container}>
            <View style={styles.headerView}>
                <Header title={'Detail'} onPress={() => props.navigation.goBack()} />

            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: hp(10) }}>

                <View style={styles.swiperview}>

                    {/* <Swiper

                        cards={swiperData}
                        renderCard={(card, index) => {

                            return (
                                <ImageBackground resizeMode='cover' style={styles.backgroundImg}
                                    source={{ uri: card }}>





                                </ImageBackground>
                            );
                        }}
                        cardIndex={0}
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



                                <View style={styles.totalview}>
                                    <ResponsiveText style={styles.totalCount}>
                                        {`${index + 1}/${swiperData?.length}`}
                                    </ResponsiveText>
                                </View>

                            </ImageBackground>
                        )}
                        sliderWidth={wp(100)}
                        itemWidth={wp(95)}
                    />

                </View>
                <View style={styles.headingView}>
                    <ResponsiveText style={styles.textt}>
                        {'Title:'}
                    </ResponsiveText>
                </View>

                <View style={styles.secondview}>

                    <ResponsiveText style={styles.textt}>
                        {previousdata?.targetItem[0] ? previousdata?.targetItem[0].title : previousdata?.targetItem?.title}
                    </ResponsiveText>
                </View>




                <View style={styles.headingView}>
                    <ResponsiveText style={styles.textt}>
                        {'Discreption:'}
                    </ResponsiveText>
                </View>
                <View style={styles.secondview}>

                    <ResponsiveText style={styles.textt}>
                        {previousdata?.targetItem[0] ? previousdata?.targetItem[0].description : previousdata?.targetItem?.description}

                    </ResponsiveText>
                </View>



                {/* <View style={styles.headingView}>
                    <ResponsiveText style={styles.textt}>
                        {'Value:'}
                    </ResponsiveText>
                </View> */}


                {/* <View style={styles.secondview}>

                    <ResponsiveText style={styles.textt}>
                        ${previousdata?.targetItem[0] ? previousdata?.targetItem[0].askingPrice : previousdata?.targetItem?.askingPrice}

                    </ResponsiveText>
                </View> */}

                {previousdata?.cash && <View style={styles.headingView}>
                    <ResponsiveText style={styles.textt}>
                        {'Cash Offer:'}
                    </ResponsiveText>
                </View>}


                {previousdata?.cash && <View style={styles.secondview}>

                    <ResponsiveText style={styles.textt}>
                        ${previousdata?.cash}
                    </ResponsiveText>
                </View>

                }


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


                {props?.route?.params?.from == 'made' &&
                    <Button
                        title={'Delete'}
                        onPress={() => handleMadeDelte(previousdata)}
                        titleStyle={{}}
                        btnContainer={{ backgroundColor: "red", marginTop: hp(6), }}

                    />}

                {props?.route?.params?.from == 'recive' && <View style={styles.rowView}>
                    <Button
                        title={'Accept'}
                        onPress={() => handleAcceptMutation(previousdata)}
                        titleStyle={{}}
                        btnContainer={{
                            backgroundColor: Colors.secondaryColor, width: wp(45),
                            marginTop: hp(3),
                        }}

                    />
                    <Button
                        title={'Reject'}
                        onPress={() => handleRejectMutation(previousdata)}
                        titleStyle={{}}
                        btnContainer={{
                            backgroundColor: "red",

                            marginTop: hp(3),
                            width: wp(45)
                        }}

                    />
                </View>}

            </ScrollView>
        </Container>
    );
};

export default ProductDetail;
