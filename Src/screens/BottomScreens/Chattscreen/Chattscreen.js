import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Container from '../../../components/Container';
import styles from './styles';
import Header, { HeaderleftImage } from '../../../components/Header';
import { View } from 'react-native';
import Button from '../../../components/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../components/Responsiveui';
import ResponsiveText from '../../../components/ResponsiveText';
import CustomModal from '../../../components/CustomModal';
import { createMessage, getallchMessages, markmessageasread, unMatchOffer } from '../../../Apis/Apis';
import { useGetMyNameQuery } from '../../../Graphql/Graphql';
import moment from 'moment/moment';

import { HubConnectionBuilder } from '@microsoft/signalr';


const CHattscreen = (props) => {
    let sender = props.route.params.item;
    console.log('sendersendersender', sender);


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
                <HeaderleftImage title={sender?.targetItem[0]?.title}
                    onPress={() => props.navigation.goBack()}
                    onUnmatchPress={() => setunmatchModal(true)}
                />

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
        </Container>
    );
};

export default CHattscreen;
