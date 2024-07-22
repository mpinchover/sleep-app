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
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
const supabaseUrl = "https://wdylwouqozgzhdnqkrnx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(
//   supabaseUrl,
// );

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
  });

  const signUpUser = async () => {
    setIsLoading(true);
    try {
      // const { data, error } = await supabase.auth.signUp({
      //   email: "example@email.com",
      //   password: "example-password",
      // });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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
          onPress={() => console.log("Pressed")}
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
