import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Container from '../../../components/Container';
import styles from './styles';
import Header, { HeaderleftImage } from '../../../components/Header';
import { Alert, Modal, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image } from 'react-native';
import Button from '../../../components/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../components/Responsiveui';
import ResponsiveText from '../../../components/ResponsiveText';
import CustomModal from '../../../components/CustomModal';
import { ComplaintAgainstuser, createMessage, getallchMessages, markmessageasread, unMatchOffer } from '../../../Apis/Apis';
import { useGetMyNameQuery } from '../../../Graphql/Graphql';
import moment from 'moment/moment';

import { HubConnectionBuilder } from '@microsoft/signalr';
import Colors from '../../../theme/colors';
import { SuccessToast } from '../../../components/SuccessToast';
import Images from '../../../components/Images';


const CHattscreen = (props) => {
    let sender = props.route.params.item;
    console.log('sendersendersender', sender);
    const [Detail, setDetail] = useState('');
    const [title, settitle] = useState('');
    const [reportUser, setreportUser] = useState(false)
    const [userRepotDetailModal, setuserRepotDetailModal] = useState(false);
    const handleReportauser = async () => {

        try {

            if (!title) {
                Alert.alert('Field Required', 'Please write title of your report');
            }
            else if (!Detail) {

                Alert.alert('Field Required', 'Please write detail discreption of your report with reason');

            }
            else {


                console.log(sender?.targetUser[0]?.id, 'SelectedItemDataSelectedItemData')

                let responsereport = await ComplaintAgainstuser(sender?.targetUser[0]?.id, title, Detail)
                console.log('responsereportresponsereportresponsereport', responsereport);
                if (responsereport) {
                    setreportUser(false), setuserRepotDetailModal(false)
                    setDetail('')
                    settitle('')
                    SuccessToast({
                        title: 'Congratulation',
                        text: `Your complaint has been registered. We're on it and will get back to you soon. Thank you for letting us know!`,
                    });
                }



            }





        } catch (error) {

        }
    }

    const unMatchCall = async () => {
        try {

            console.log('sender?.offerIdsender?.offerIdsender?.offerId', sender?.offerId);
            let response = await unMatchOffer(sender?.offerId)
            setunmatchModal(false)
            props.navigation.navigate('TabBarNav', {
                screen: 'Message'
            })

            console.log('responseresponseresponse', response);
        } catch (error) {
            console.log('errorrrrr====>>>>', error);
        }
    }

    const [messages, setMessages] = useState([]);
    const connection = new HubConnectionBuilder()
        .withUrl('http://13.50.221.83/chatHub')
        // .withUrl('http://172.16.0.50:5002/chatHub')

        .build();
    useEffect(() => {
        // Build new connection
        // const connection = new HubConnectionBuilder()
        //     .withUrl("http://13.50.221.83/chatHub")
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();




        // Start the connection
        const startConnection = async () => {
            try {
                connection.start()
                    .then(() => {
                        connection.on('ReceiveMessage', (message) => {

                            const formateMessage = {
                                _id: message.id,
                                text: message.messageText,
                                createdAt: moment(message.createdAt).toDate(),
                                user: {
                                    _id: message.createdByUserId,
                                    // name: message.targetUser[0]?.firstName || 'Unknown', // Adjust according to your data
                                    // avatar: message.targetUser[0]?.avatarUrl,
                                },
                                // Other properties you might need
                            }
                            setMessages((previousMessages) =>
                                GiftedChat.append(previousMessages, formateMessage)
                            );

                            console.log('##(#(#(#(#)()())()())###$$****messagemessage-=-=-=-=-=-*#**#*#*#', message);
                            // Handle received messages here
                        });
                        console.log('Connection started!',)
                    })
                    .catch(err => console.error('Error while establishing connection :(', err));
                // await connection.start();
                // console.log('SignalR Connected');
            } catch (err) {
                console.log('Error while establishing connection', err);
            }
        };

        startConnection();

        return () => {
            connection.stop()
                .then(() => console.log('Disconnected!'))
                .catch(err => console.error('SignalR Disconnection Error: ', err));
        };
    }, []);

    const [unmatchModal, setunmatchModal] = useState(false);
    const {
        data: mydata,
        loading: myloading,
        error,
        refetch: refresshPmydata,
    } = useGetMyNameQuery({
        fetchPolicy: 'network-only',
    });

    let myid = mydata?.me.id;
    // console.log('myPersnolDatamyPersnolDatamyPersnolData', myid);
    useEffect(() => {
        markmessageasread(sender?.offerId)
        getListofmessages()
        // messaging().onMessage(async remoteMessage => {

        //     getListofmessages()
        // })
    }, []);


    const getListofmessages = () => {
        getallchMessages(sender?.offerId).then(res => {
            // console.log('res.data.messages', res.data.messages);
            const formattedMessages = res.data.messages.map(msg => ({
                _id: msg.id,
                text: msg.messageText,
                createdAt: moment(msg.createdAt).toDate(),
                user: {
                    _id: msg.createdByUserId,
                    name: msg.targetUser[0]?.firstName || 'Unknown', // Adjust according to your data
                    avatar: msg.targetUser[0]?.avatarUrl,
                },
                // Other properties you might need
            }));

            // console.log('formattedMessagesformattedMessages', formattedMessages);
            formattedMessages.sort((a, b) => b.createdAt - a.createdAt);

            setMessages(formattedMessages)
        }).catch(
            eror => {
                // console.log('erererere', eror);
            }
        )
    }

    const onSend = (newMessages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );

        console.log('newMessagesnewMessagesnewMessages', newMessages);
        createMessage(newMessages[0].text, sender?.offerId).then(res => {
            // console.log('response send', res);
            // getListofmessages()
        }).catch(erorr => {
            console.log('error on create', erorr);
        })
    };

    return (
        <Container style={styles.container}>
            <View style={styles.headerView}>
                {/* <HeaderleftImage title={sender?.targetItem[0]?.title}
                    onPress={() => props.navigation.goBack()}
                    onUnmatchPress={() => setunmatchModal(true)}
                /> */}
                <Header
                    title={sender?.targetItem[0]?.title}
                    onPress={() => props.navigation.goBack()}
                    onLefticonPress={() => setreportUser(true)} />


            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: myid,
                }}

                renderAvatar={null} // Remove user profile image
                textInputProps={{
                    style: { color: 'black', width: wp(80), }

                }}
            //   renderSend={(props) => (

            //       <View style={{ marginRight: 10, marginBottom: 5 }}>
            //         <ResponsiveText style={{ color: 'blue' }}>Send</ResponsiveText> 
            //       </View>

            //   )}
            />
            {/* <Button
                title="Unmatch"
                btnContainer={{ marginTop: hp(2), }}
                onPress={() => { setunmatchModal(true) }}
            /> */}

            <CustomModal
                modalVisible={unmatchModal} setModalVisible={setunmatchModal}>

                <View style={styles.deletemodal}>
                    <ResponsiveText style={styles.deletetxt}>
                        Are you sure you want to unmatch this item?
                    </ResponsiveText>
                    <View style={styles.btnrow}>
                        <Button
                            title={'Yes'}
                            btnContainer={styles.btn}
                            onPress={() => unMatchCall()}
                        />

                        <Button
                            title={'No'}
                            btnContainer={styles.btnno}
                            onPress={() => setunmatchModal(false)}
                        />
                    </View>

                </View>
            </CustomModal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={reportUser}
                onRequestClose={() => {
                    setreportUser(false);
                }}>
                <TouchableWithoutFeedback onPress={() => setreportUser(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity
                                style={styles.modlbtn}
                                onPress={() => { setunmatchModal(true), setreportUser(false) }}>
                                <ResponsiveText style={styles.buttonText}>
                                    Unmatch
                                </ResponsiveText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modlbtn}
                                onPress={() => { setreportUser(false), setuserRepotDetailModal(true) }}>
                                <ResponsiveText style={styles.buttonText}>
                                    Report User
                                </ResponsiveText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modlbtn}
                                onPress={() => setreportUser(false)}>
                                <ResponsiveText style={styles.buttonTextcancel}>
                                    Cancel
                                </ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <CustomModal modalVisible={userRepotDetailModal} setModalVisible={setuserRepotDetailModal}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => setuserRepotDetailModal(false)} style={{ padding: 10, alignSelf: 'flex-end', position: 'absolute', top: -wp(9), right: wp(-5) }}>
                        <Image
                            source={Images.close}
                            style={{ width: wp(8), height: wp(8) }}
                        />

                    </TouchableOpacity>
                    <TextInput
                        placeholder="Title of report"
                        value={title}
                        onChangeText={text => settitle(text)}
                        style={{ ...styles.input2, marginTop: hp(2) }}

                        placeholderTextColor={Colors.graytext}

                    />

                    <TextInput
                        placeholder="write detail discreption of your report with reason"
                        value={Detail}
                        onChangeText={text => setDetail(text)}
                        style={[styles.input2, { height: 200 }]} // Make the message input taller
                        multiline={true}
                        placeholderTextColor={Colors.graytext}

                    />
                    <Button title="Report this item"
                        btnContainer={styles.contactUs}
                        onPress={() => handleReportauser()} />
                </View>
            </CustomModal>
        </Container>
    );
};

export default CHattscreen;
