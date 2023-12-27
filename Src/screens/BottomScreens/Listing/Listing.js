import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import styles from './styles';
import Images from '../../../components/Images';
import ResponsiveText from '../../../components/ResponsiveText';
import Colors from '../../../theme/colors';
import SwipableListButton from '../../../components/SwipeAble';
import FastImage from 'react-native-fast-image';
import {
  AccetReciveOffer,
  DeleteMadeoffer,
  GetReciveOffer,
  GetmadeOffer,
  clearApolloCache,
  useGetAlloffers,
} from '../../../Graphql/Graphql';
import { SuccessToast } from '../../../components/SuccessToast';
import { heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { useApolloClient } from '@apollo/react-hooks';
import { useIsFocused } from '@react-navigation/native';
import { markNotificationAszero } from '../../../Apis/Apis';
import { useDispatch } from 'react-redux';
import { addNotificationcount } from '../../../redux/actions/userDataAction';

const Listing = props => {
  const client = useApolloClient();
  const dispatch = useDispatch()
  const { getmadeOffer, madeLoading, madedata, madeerror } = GetmadeOffer();
  const { getReciveOffers, reciveLoading, reciveData, reciveerror } =
    GetReciveOffer();
  const [allMadeOfer, setallMadeOfer] = useState([]);
  const [allReciveOffer, setallReciveOffer] = useState([]);
  const [deleteOfferMutation] = DeleteMadeoffer();
  const [acceptOffer] = AccetReciveOffer();

  useEffect(() => {

    markNotificationAszero().then(Res => {
      console.log('respmmmmmmesssageee', Res);
      dispatch(addNotificationcount(0))


    })
    getmadeOffer();
    getReciveOffers();




    if (madedata != undefined) {
      setallMadeOfer(madedata);
    }
    if (reciveData != undefined) {
      setallReciveOffer(reciveData);
    }

    console.log('getmadeOffer', madeLoading, madedata, madeerror, 'errorrr');
    console.log(
      'getReciveOffers',
      reciveLoading,
      reciveData,
      reciveerror,
      'errorrr',
    );
  }, [useIsFocused(), madedata, reciveData]);

  const handleMadeDelte = async item => {
    try {
      deleteOfferMutation({
        variables: {
          id: item.id,
        },
      }).then(res => {
        clearApolloCache(client);
        getmadeOffer();

        console.log('resssss de;eeeeee', res);
        SuccessToast({
          title: 'Congratulation',
          text: 'Offer Deleted Successfully ',
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
        getReciveOffers();

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


  const handleAcceptMutation = async item => {

    try {
      acceptOffer({
        variables: {
          offerId: item.id,
        },
      }).then(res => {
        clearApolloCache(client);
        getReciveOffers();

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

  const MadeUI = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', {
        item: item,
        from: 'made'
      })} style={styles.Madeuimain}>
        <FastImage
          style={styles.uiImage}
          source={{
            uri: item?.targetItem?.mainImageUrl,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textdiscreption}>
          <ResponsiveText style={styles.titletext}>
            {item?.targetItem?.title}
          </ResponsiveText>

          <ResponsiveText style={styles.descreption}>
            {item?.targetItem?.description}
          </ResponsiveText>
        </View>

        <TouchableOpacity
          onPress={() => handleMadeDelte(item)}
          style={styles.deleteBtn}>
          <ResponsiveText style={styles.deleteBtntxt}>
            {'Delete'}
          </ResponsiveText>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const ReciveUi = ({ item, index }) => {

    // console.log('itemitemitem', item?.sourceStatus, item?.targeteStatus, item?.sourceStatus == 0 || item?.targeteStatus == 0);
    return (
      <>
        {(item?.sourceStatus == 0 || item?.targeteStatus == 0) ? <View style={styles.reciveMain}>

          <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', {
            item: item,
            from: 'recive'
          })} style={styles.Madeuimain}>
            <View style={{ ...styles.Madeuimain, borderBottomWidth: 0 }}>
              <View style={styles.rowview}>
                <FastImage
                  style={styles.uiImage}
                  source={{
                    uri: item?.targetItem?.mainImageUrl,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.textdiscreption}>
                  <ResponsiveText style={styles.titletext}>
                    {item?.targetItem?.title}
                  </ResponsiveText>

                  <ResponsiveText style={styles.descreption}>
                    {item?.targetItem?.description}
                  </ResponsiveText>
                </View>
              </View>

              <ResponsiveText style={styles.rate}>
                ${item?.cash}
              </ResponsiveText>
            </View>
          </TouchableOpacity>

          <View style={styles.rowview2}>
            <TouchableOpacity
              onPress={() => handleAcceptMutation(item)}
              style={styles.acceptBtn}>
              <ResponsiveText style={styles.aceptreject}>
                {'Accept'}
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRejectMutation(item)}
              style={styles.rejectBtn}>
              <ResponsiveText style={styles.aceptreject}>
                {'Reject'}
              </ResponsiveText>
            </TouchableOpacity>
          </View>

        </View>



          : null}

      </>

    );
  };

  const [tab, settab] = useState('Recieve');

  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.dotimg} />
        <ResponsiveText style={styles.headerText}>
          {'Cash Offers'}
        </ResponsiveText>
        <TouchableOpacity>
          <View style={styles.dotimg} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabrow}>
        <TouchableOpacity
          onPress={() => {
            settab('Recieve');

            getReciveOffers();
          }}
          style={{
            ...styles.buttontext,
            borderColor:
              tab == 'Recieve' ? Colors.btncolor : `${Colors.black}20`,
          }}>
          <ResponsiveText
            style={{
              ...styles.textcolor,
              color: tab == 'Recieve' ? Colors.btncolor : Colors.graytext,
            }}>
            {'Received'}
          </ResponsiveText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            getmadeOffer(), settab('Made');
          }}
          style={{
            ...styles.buttontext,
            borderColor:
              tab != 'Recieve' ? Colors.btncolor : `${Colors.black}20`,
          }}>
          <ResponsiveText
            style={{
              ...styles.textcolor,
              color: tab != 'Recieve' ? Colors.btncolor : Colors.graytext,
            }}>
            {'Made'}
          </ResponsiveText>
        </TouchableOpacity>
      </View>

      {tab == 'Recieve' ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp(10) }}
          style={styles.reciveview}>
          {allReciveOffer?.receivedOffers?.length > 0 ? (
            <FlatList
              data={allReciveOffer?.receivedOffers}
              renderItem={ReciveUi}
            />
          ) : (
            <ResponsiveText style={styles.choosebtntxt}>
              {'You have no offers receive yet'}
            </ResponsiveText>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp(10) }}
          style={styles.reciveview}>
          {allMadeOfer?.createdOffers?.length > 0 ? (
            <FlatList data={allMadeOfer?.createdOffers} renderItem={MadeUI} />
          ) : (
            <ResponsiveText style={styles.choosebtntxt}>
              {'You have no offers made yet'}
            </ResponsiveText>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

export default Listing;
