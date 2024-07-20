import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
  ResizeMode,
  Video,
} from "expo-av";
import { useEffect, useRef, useState } from "react";

const audioUri = require("./assets/vinyl_looped.mp3");

export default function App() {
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

  fetchAndPlayVoiceAudio = async () => {
    while (true) {
      console.log("PLAYING 1");
      const url =
        "https://storage.googleapis.com/sleep-voiceover-audio/voiceover/voiceover.mp3";

      console.log("PLAYING 2");
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      console.log("PLAYING 3");
      const status = await playbackObject.getStatusAsync();

      console.log("PLAYING 4");
      await sleep(status.durationMillis + 30000);
    }
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
  };

  useEffect(() => {
    fetchAndPlayVoiceAudio();
    start();
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TouchableOpacity>
        <Text>Hey ther</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
