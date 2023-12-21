import {
    Alert,
    Image,
    ImageBackground,

    Modal,

    ScrollView,

    TextInput,

    TouchableOpacity,
    TouchableWithoutFeedback,
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
import { getAddressFromLatLng, reportAnitem } from '../../../Apis/Apis';
import { useApolloClient } from '@apollo/react-hooks';
import Carousel from 'react-native-snap-carousel';

const ProductDetail = props => {
    let previousdata = props?.route?.params?.item
    console.log('previousdatapreviousdatapreviousdata', previousdata);

    const [swiperData, setswiperData] = useState(previousdata?.targetItem[0] ? [...previousdata?.targetItem[0].imageUrls, previousdata?.targetItem[0].mainImageUrl] : [...previousdata?.targetItem?.imageUrls, previousdata?.targetItem?.mainImageUrl])
    const [deleteOfferMutation] = DeleteMadeoffer();
    const [acceptOffer] = AccetReciveOffer();
    const client = useApolloClient();

    const [ReportItem, setReportItem] = useState(false);

    const [Location, setLocation] = useState('');

    const [ItemRepotDetailModal, setItemRepotDetailModal] = useState(false);
    const [CounterOfferModal, setCounterOfferModal] = useState(false);
    const [Detail, setDetail] = useState('');
    const [title, settitle] = useState('');
    const [counterOfferValue, setcounterOfferValue] = useState('');

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


    const reportItemHandle = async () => {

        // 

        if (!title) {
            Alert.alert('Field Required', 'Please write title of your report');
        }
        else if (!Detail) {

            Alert.alert('Field Required', 'Please write detail discreption of your report with reason');

        }
        else {

            const response = await reportAnitem(previousdata?.targetItem.id, title, Detail)
            console.log('responseresponseresponse offfffffff report', response);
            if (response?.data.createItemComplaint) {
                setDetail(''),
                    settitle('')
                setItemRepotDetailModal(false)
                setReportItem(false)
                SuccessToast({
                    title: 'Congratulation',
                    text: `Your complaint has been registered. We're on it and will get back to you soon. Thank you for letting us know!`,
                });
            }


        }

    }

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
                    text: 'Offer Accepted Successfully ',
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
                    text: 'Offer Deleted Successfully',
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
                    text: 'Offer Rejected Successfully ',
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
                {props?.route?.params?.from != 'recive' ? <Header title={'Detail'} onPress={() => props.navigation.goBack()}

                    onLefticonPress={() => setReportItem(true)} />
                    :
                    <Header title={'Detail'} onPress={() => props.navigation.goBack()} />}


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
                        enableSnap={true}
                        activeSlideAlignment={'center'}

                        layout={'stack'} layoutCardOffset={`2`}
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
                <Button
                    title={'Send a Counter Offer'}
                    onPress={() => setCounterOfferModal(true)}
                    titleStyle={{}}
                    btnContainer={{

                        marginTop: hp(3),
                    }}

                />

                {props?.route?.params?.from == 'made' &&
                    <Button
                        title={'Delete Offer'}
                        onPress={() => handleMadeDelte(previousdata)}
                        titleStyle={{}}
                        btnContainer={{ backgroundColor: "red", marginTop: hp(6), borderColor: 'darkred', }}

                    />}

                {props?.route?.params?.from == 'recive' && <View style={styles.rowView}>
                    <Button
                        title={'Accept'}
                        onPress={() => handleAcceptMutation(previousdata)}
                        titleStyle={{}}
                        btnContainer={{
                            backgroundColor: Colors.secondaryColor, width: wp(45),
                            marginTop: hp(3),
                            borderColor: Colors.grentext,
                        }}

                    />
                    <Button
                        title={'Reject'}
                        onPress={() => handleRejectMutation(previousdata)}
                        titleStyle={{}}
                        btnContainer={{
                            backgroundColor: "red",
                            borderColor: '#c21f0a',

                            marginTop: hp(3),
                            width: wp(45)
                        }}

                    />
                </View>}



            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={ReportItem}
                onRequestClose={() => {
                    setReportItem(false);
                }}>
                <TouchableWithoutFeedback onPress={() => setReportItem(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.modlbtn}
                                hitSlop={styles.hitslop}
                                onPress={() => { setItemRepotDetailModal(true), console.log('report userrrrrrr') }}>
                                <ResponsiveText style={styles.buttonText}>
                                    Report Item
                                </ResponsiveText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modlbtn}
                                onPress={() => setReportItem(false)}>
                                <ResponsiveText style={styles.buttonTextcancel}>
                                    Cancel
                                </ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <CustomModal modalVisible={ItemRepotDetailModal} setModalVisible={setItemRepotDetailModal}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        placeholder="Title of report"
                        value={title}
                        onChangeText={text => settitle(text)}
                        style={styles.input}
                        placeholderTextColor={Colors.graytext}

                    />

                    <TextInput
                        placeholder="write detail discreption of your report with reason"
                        value={Detail}
                        onChangeText={text => setDetail(text)}
                        style={[styles.input, { height: 200 }]} // Make the message input taller
                        multiline={true}
                        placeholderTextColor={Colors.graytext}

                    />
                    <Button title="Report this item"
                        btnContainer={styles.contactUs}
                        onPress={() => { reportItemHandle() }} />
                </View>
            </CustomModal>



            <CustomModal modalVisible={CounterOfferModal} setModalVisible={setCounterOfferModal}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        placeholder="Enter counter offer $ value"
                        value={counterOfferValue}
                        onChangeText={text => setcounterOfferValue(text)}
                        style={styles.input}
                        placeholderTextColor={Colors.graytext}
                    />

                    <Button title="Send a Counter Offer"
                        btnContainer={styles.contactUs2}
                        onPress={() => { setCounterOfferModal(false) }} />
                </View>
            </CustomModal>
        </Container>
    );
};

export default ProductDetail;
