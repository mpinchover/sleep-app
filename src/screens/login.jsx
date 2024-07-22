import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Divider, Button as RNPButton } from "react-native-paper";
import {
  useFonts,
  Inter_900Black,
  Inter_100Thin,
  Inter_200ExtraLight,
} from "@expo-google-fonts/inter";
const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
  });

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/bg_4_darkened.png")} // Replace with your image URL
      resizeMode="cover" // This prop ensures the image covers the whole area
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.title}>
          Slept
        </Text>
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
        <RNPButton style={{ width: "100%", margin: 0 }} mode="contained">
          Log in
        </RNPButton>

        <TouchableOpacity
          color="#fffbff"
          style={{
            width: "100%",
            color: "#fffbff",
            marginTop: 10,

            // borderWidth: 1,
            // borderColor: "black",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fffbff",
              fontSize: 16,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          color="#fffbff"
          style={{
            width: "100%",
            color: "#fffbff",
            marginTop: 10,

            // borderWidth: 1,
            // borderColor: "black",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fffbff",
              fontSize: 16,
            }}
          >
            Don't have an account? Sign up.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

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
