import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";

export default class App extends React.Component {
  state = {
    source: undefined,
  };

  render() {
    console.log("RENDER, source: ", this.state.source);
    return (
      <View style={styles.container}>
        <Button
          title="Toggle Video Source"
          onPress={() =>
            this.setState((state) => ({
              source: state.source ? undefined : require("./assets/video.mp4"),
            }))
          }
        />
        <Video
          style={styles.video}
          source={this.state.source || { uri: null }}
          shouldPlay={true}
          isLooping
          useNativeControls={true}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          onError={(err) => console.log("onError: ", err)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  video: {
    marginTop: 20,
    width: 300,
    height: 400,
  },
});
