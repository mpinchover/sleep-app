// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home";
// const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View } from "react-native";
import Login from "./src/screens/login";
import Signup from "./src/screens/signup";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn && (
          <>
            <Stack.Screen
              options={({}) => {
                return {
                  headerShown: false,
                };
              }}
              name="Home"
              component={HomeScreen}
            />
          </>
        )}

        {!isLoggedIn && (
          <>
            <Stack.Screen
              options={({}) => {
                return {
                  headerShown: false,
                };
              }}
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={({}) => {
                return {
                  headerShown: false,
                };
              }}
              name="Login"
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
