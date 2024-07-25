import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  ActivityIndicator,
  Divider,
  Button as RNPButton,
  TextInput,
} from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import supabase from "../auth/supabase";
import { Authorization } from "../context/context";
import {
  displayNameState,
  emailState,
  passwordState,
} from "../recoil/settings";

const Settings = () => {
  const userEmail = useRecoilValue(emailState);
  const [email, setEmail] = useState(userEmail);

  const userDisplayName = useRecoilValue(displayNameState);
  const [displayName, setDisplayName] = useState(userDisplayName);

  const userPasswordPlainText = useRecoilValue(passwordState);
  const [password, setPassword] = useState(userPasswordPlainText);

  const { userSession, isLoading, setUserSettings } = useContext(Authorization);

  useEffect(() => {
    return () => {
      setEmail(userEmail);
      setDisplayName(userDisplayName);
      setPassword(userPasswordPlainText);
    };
  }, []);

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../../assets/backgrounds/bg_5.png")} // Replace with your image URL
        resizeMode="cover" // This prop ensures the image covers the whole area
        style={styles.backgroundImage}
      >
        <ActivityIndicator size="large" animating={true} color={"#fffbff"} />
      </ImageBackground>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground
        source={require("../../assets/backgrounds/bg_6.png")} // Replace with your image URL
        resizeMode="cover" // This prop ensures the image covers the whole area
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["#000000", "#000000", "transparent", "#000000"]}
          //   style={styles.gradient}
          locations={[0.0, 0.05, 0.5, 1]}
          style={{ height: "100%", width: "100%" }}
          //   colors={["#00000000", "#000000"]}
        >
          <SafeAreaView style={styles.container}>
            <View
              style={{
                padding: 20,
                // borderWidth: 1,
                // borderColor: "red",
                // flex: 1,
                width: "100%",
              }}
            >
              <TextInput
                label="Name"
                style={styles.textInput}
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
              />
              <View style={{ margin: 4 }}></View>
              <TextInput
                label="Email"
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={{ margin: 4 }}></View>
              <TextInput
                secureTextEntry={true}
                label="Password"
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.logoutBtnContainer}>
              <RNPButton
                buttonColor="red"
                style={{
                  width: "100%",

                  fontSize: 12,
                }}
                mode="contained"
                onPress={() => supabase.auth.signOut()}
              >
                Log out
              </RNPButton>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    position: "relative",
    // padding: 200,

    // borderWidth: 1,
    // borderColor: "red",
  },
  logoutBtnContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    bottom: 40,
  },

  backgroundImage: {
    width: "100%", // Full width
    height: "100%", // Full height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  textInput: {
    width: "100%",
  },
});
