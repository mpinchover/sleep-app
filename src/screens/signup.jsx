import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Button, Divider } from "react-native-paper";
const Signup = ({ navigation }) => {
  return (
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
      <Button
        style={{ width: "100%", margin: 0 }}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Sign up
      </Button>

      <Button
        onPress={() => navigation.navigate("Login")}
        textColor="#fffbff"
        style={{
          width: "100%",
          color: "#fffbff",
        }}
      >
        Have an account? Log in.
      </Button>
    </View>
  );
};

export default Signup;

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
  },
  textInput: {
    width: "100%",
  },
});
