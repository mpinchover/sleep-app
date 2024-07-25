// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home";
// const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import { TouchableOpacity, View, Text } from "react-native";
import Login from "./src/screens/login";
import Signup from "./src/screens/signup";
import { useContext, useEffect, useState } from "react";
import { AuthContext, Authorization } from "./src/context/context";
import supabase from "./src/auth/supabase";
import Settings from "./src/screens/settings";
const Stack = createNativeStackNavigator();

const MainApp = () => {
  const { userSession, isLoading, updateSettings } = useContext(Authorization);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userSession && (
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

            <Stack.Screen
              options={({ navigation }) => {
                return {
                  // headerShown: false,

                  headerTitleStyle: {
                    color: "#fffbff",
                  },
                  // headerStyle: {
                  //   backgroundColor: "black",
                  // },
                  headerTransparent: true,

                  headerLeft: () => {
                    return (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: "#fffbff" }}>Cancel</Text>
                      </TouchableOpacity>
                    );
                  },
                  headerRight: () => {
                    return (
                      <TouchableOpacity>
                        <Text
                          onPress={async () => {
                            try {
                              await updateSettings();
                              navigation.goBack();
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                          style={{ color: "#fffbff" }}
                        >
                          Save
                        </Text>
                      </TouchableOpacity>
                    );
                  },
                };
              }}
              name="Settings"
              component={Settings}
            />
          </>
        )}

        {!userSession && (
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

const App = () => {
  return (
    <RecoilRoot>
      <AuthContext>
        <MainApp />
      </AuthContext>
    </RecoilRoot>
  );
};

export default App;
