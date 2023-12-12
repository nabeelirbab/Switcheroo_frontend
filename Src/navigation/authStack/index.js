import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screens/Splash/Splash';
import Login from '../../screens/Login/Login';
import Signup from '../../screens/Signup/Signup';
import Onboarding from '../../screens/Onboarding/Onboarding';
import ForgotPassword from '../../screens/ForgotPassword/ForgotPassword';
import OtpScreen from '../../screens/OtpScreen/OtpScreen';
import Welcome from '../../screens/Welcome/Welcome';
import Addprofile from '../../screens/Addprofile/Addprofile';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import AddphoneNumber from '../../screens/AddPhoneNumber/AddPhoneNumber';
import OtpForverifay from '../../screens/OtpForverifay/OtpForverifay';


const Stack = createNativeStackNavigator();

const AuthStack = props => {
  console.log('propspropspropsprops stackkk', props);
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Addprofile" component={Addprofile} />
      <Stack.Screen name="AddphoneNumber" component={AddphoneNumber} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="OtpForverifay" component={OtpForverifay} />

    </Stack.Navigator>
  );
};

export default AuthStack;
