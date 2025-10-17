import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailExample from '../screens/Detail/DetailExample';
import DrawerNavigator from './DrawerNavigator';
import StartScreen from '../screens/StartScreen';
import DetailScreen from '../screens/Detail/DetailExample';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailExample"
        component={DetailExample}
        options={{headerShown: false}} // ✅ tambahkan ini
      />
      <Stack.Screen
        name="DetailExample2"
        component={DetailScreen}
        options={{headerShown: false}} // ✅ tambahkan ini juga
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
