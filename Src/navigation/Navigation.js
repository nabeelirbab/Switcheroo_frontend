import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './mainstack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './authStack';


const { Navigator , Screen } = createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer >
      <Navigator screenOptions={{headerShown:false}} >
        <Screen name={'AuthStack'} component={AuthStack} />
        <Screen name={'MainStack'} component={MainStack} />
      </Navigator>
      {/* <MainStack/> */}
    </NavigationContainer>
  );
};

export default Navigation;
