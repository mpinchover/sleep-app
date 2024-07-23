import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Divider, Button as RNPButton, TextInput } from "react-native-paper";
import supabase from "../auth/supabase";

const Settings = () => {
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/backgrounds/bg_6_darkened.png")} // Replace with your image URL
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
                value={email}
                onChangeText={(text) => setEmail(text)}
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
  },
  textInput: {
    width: "100%",
  },
});
