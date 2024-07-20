import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
  ResizeMode,
  Video,
} from "expo-av";
import { useEffect, useRef, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get("window").width;

const VOICEOVER_URL =
  "https://storage.googleapis.com/sleep-voiceover-audio/voiceover/voiceover.mp3";

const audioUri = require("./assets/vinyl_looped.mp3");

const MainButton = ({ onPress, label, animateButton }) => {
  const mainButtonOpacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (animateButton) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(mainButtonOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(mainButtonOpacity, {
            toValue: 0.4,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop(); // Clean up the animation when the component unmounts or the animateButton changes
    } else {
      mainButtonOpacity.setValue(1); // Set opacity to 1 when not animating
    }
  }, [animateButton, mainButtonOpacity]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[styles.mainButton, { opacity: mainButtonOpacity }]}
      >
        <Text style={styles.mainButtonText}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [isPlayingSleep, setIsPlayingSleep] = useState(false);
  const [voiceOverAudio, setVoiceOverAudio] = useState();
  const [voiceOverUrl, setVoiceOverUrl] = useState();
  const [backgroundNoiseAudio, setBackgroundNoiseAudio] = useState();

  _onPlaybackStatusUpdate = async (playbackStatus) => {
    // console.log("PLAYBACK", playbackStatus.positionMillis);
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  fetchVoiceoverAudio = async (voiceOverUrl) => {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: voiceOverUrl.toString() },
      { shouldPlay: true }
    );
    setVoiceOverAudio(playbackObject);
    const status = await playbackObject.getStatusAsync();
    await sleep(status.durationMillis + 2000);
    const newUrl = new String(voiceOverUrl);
    setVoiceOverUrl(newUrl);
  };

  start = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      audioUri,
      { shouldPlay: true, isLooping: true },
      _onPlaybackStatusUpdate
    );
    playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    setBackgroundNoiseAudio(playbackObject);
  };

  useEffect(() => {
    if (voiceOverUrl && isPlayingSleep) {
      fetchVoiceoverAudio(voiceOverUrl);
    }

    return () => {};
  }, [isPlayingSleep, voiceOverUrl]);

  handleStart = async () => {
    setIsPlayingSleep(true);
    setVoiceOverUrl(new String(VOICEOVER_URL));
    start();
    // startAnimation();
  };

  handleStop = () => {
    setVoiceOverUrl(null);
    setIsPlayingSleep(false);
    backgroundNoiseAudio.stopAsync();
    voiceOverAudio.stopAsync();
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <ImageBackground
          source={require("./assets/backgrounds/bg_1.png")} // Replace with your image URL
          resizeMode="cover" // This prop ensures the image covers the whole area
          style={styles.backgroundImage}
        >
          <LinearGradient
            style={{ height: "100%", width: "100%" }}
            colors={["#00000000", "#000000"]}
          />
          <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonContainer}>
              {!isPlayingSleep && (
                <MainButton label="Start" onPress={handleStart} />
              )}
              {isPlayingSleep && (
                <MainButton
                  animateButton={true}
                  label="Stop"
                  onPress={handleStop}
                />
              )}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    width: "100%", // Full width
    height: "100%", // Full height
    // flex: 1,
    // justifyContent: "center", // Centers children vertically
  },
  mainButton: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 500,
    // display:"flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText: {
    color: "purple",
    fontSize: 16,
  },
  mainButtonContainer: {
    position: "absolute",
    bottom: 100,
  },
});
