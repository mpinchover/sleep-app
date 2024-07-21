import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Button, Divider } from "react-native-paper";
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
      <Button
        textColor="#fffbff"
        style={{
          borderWidth: 1,
          width: "100%",
          color: "#fffbff",
        }}
      >
        Forgot password?
      </Button>
      <Divider style={{ margin: 4 }} />

      <Button style={{ width: "100%", margin: 0 }} mode="contained">
        Log in
      </Button>

      <Button
        onPress={() => navigation.navigate("Signup")}
        textColor="#fffbff"
        style={{
          borderWidth: 1,
          width: "100%",
          color: "#fffbff",
        }}
      >
        Don't have an account? Sign up.
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6700D3",
    position: "relative",
    paddingHorizontal: 20,
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
