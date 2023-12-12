import React, { Children, useEffect, useRef } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from './Responsiveui';
import Colors from '../theme/colors';
import { Fonts } from '../theme/Fonts';
const btnWidth = 80;
export default function SwipableListButton({rightButtons,Children,onPress}) {
    
    const leftButtons = [];

  
    const offset = [-btnWidth * rightButtons.length, btnWidth * leftButtons.length];
    
    let panValue = { x: 0, y: 0 };
    let isOpenState = useRef(false).current;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const itemTranslate = pan.x.interpolate({ inputRange: offset, outputRange: offset, extrapolate: 'clamp' });
    const translateLeftBtns = pan.x.interpolate({ inputRange: [-leftButtons.length * btnWidth, 0], outputRange: [-leftButtons.length * btnWidth, 0], extrapolate: 'clamp' });
    const translateRightBtns = pan.x.interpolate({ inputRange: [0, rightButtons.length * btnWidth], outputRange: [0, rightButtons.length * btnWidth], extrapolate: 'clamp' });
    useEffect(() => {
        pan.addListener(value => {
            panValue = value;
        });
    }, [])
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponder: (e, g) => false,
            onPanResponderGrant: () => {
                pan.setOffset({ x: panValue.x, y: panValue.y });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (e, g) => {
                pan.flattenOffset();
                if (g.vx > 0.5 || g.dx > btnWidth * leftButtons.length / 2) {
                    if (isOpenState && g.dx > 0) {
                        reset();
                        return;
                    }
                    move(false);
                    return;
                }
                if (g.vx < -0.5 || g.dx < -btnWidth * rightButtons.length / 2) {
                    if (isOpenState && g.dx < 0) {
                        reset();
                        return;
                    }
                    move(true);
                    return;
                }
                reset()

            },
            onPanResponderTerminate: () => {
                reset();
            },
        }),
    ).current;
    const reset = () => {
        isOpenState = false;
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }
    const move = (toLeft) => {
        isOpenState = true;
        Animated.spring(pan, {
            toValue: { x: toLeft ? -btnWidth * rightButtons.length : btnWidth * leftButtons.length, y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }

    return (
        
        <ScrollView style={styles.container}>
           <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>
                {rightButtons.map(btn => (
                    <TouchableOpacity onPress={()=>{onPress(btn,reset)}} key={btn} style={[styles.btn, { backgroundColor: btn?.backgroundColor }]}>
                        <Text style={{fontFamily:Fonts.FontsBold,fontSize:14,color:Colors.white}}>{btn?.title}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
            <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >
              {Children}
            </Animated.View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
   container:{
    marginTop:hp(1),
    borderBottomWidth:0.6,
    borderColor:`${Colors.graytext}70`,
    backgroundColor:`${'#D9D9D9'}30`,
    paddingBottom:1,


   },
    item: {
   
        backgroundColor: '#fff',
      
    },
    txt: {
        color: '#fff',
        letterSpacing: 1
    },
    btnContainer: {
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center"
    },
    btn: {
       
        width: btnWidth,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:hp(4.5)
    }
})