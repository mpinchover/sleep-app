import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Divider, Button as RNPButton } from "react-native-paper";
import {
  useFonts,
  Inter_900Black,
  Inter_100Thin,
  Inter_200ExtraLight,
} from "@expo-google-fonts/inter";
import supabase from "../auth/supabase";
import { useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
  });

  const signUpUser = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "example@email.com",
        password: "example-password",
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../../assets/backgrounds/bg_5_darkened.png")} // Replace with your image URL
        resizeMode="cover" // This prop ensures the image covers the whole area
        style={styles.backgroundImage}
      >
        <ActivityIndicator size="large" animating={true} color={"#fffbff"} />
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      source={require("../../assets/backgrounds/bg_5_darkened.png")} // Replace with your image URL
      resizeMode="cover" // This prop ensures the image covers the whole area
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.title}>
          Slept
        </Text>
        <TextInput
          label="Name"
          style={styles.textInput}
          // value={text}
          // onChangeText={(text) => setText(text)}
        />
        <Divider style={{ margin: 4 }} />
        <TextInput
          label="Email"
          style={styles.textInput}
          // value={text}
          // onChangeText={(text) => setText(text)}
        />
        <Divider style={{ margin: 4 }} />
        <TextInput
          label="Password"
          style={styles.textInput}

          // value={text}
          // onChangeText={(text) => setText(text)}
        />

        <Divider style={{ margin: 8 }} />
        <RNPButton
          style={{ width: "100%", margin: 0, fontSize: 12 }}
          mode="contained"
          onPress={signUpUser}
        >
          Sign up
        </RNPButton>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            width: "100%",
            color: "#fffbff",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fffbff",
              fontSize: 16,
            }}
          >
            Have an account? Log in.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // paddingHorizontal: 20,

    left: 0,
    right: 0,
    position: "relative",
    // paddingHorizontal: 20,
  },
  title: {
    color: "#fffbff",
    position: "absolute",
    top: "20%",
    fontFamily: "Inter_200ExtraLight",
  },
  textInput: {
    width: "100%",
  },
});
