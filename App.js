import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

export default class App extends React.Component {
  state = {
    videoPath: undefined,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Pick Video"
          onPress={async () => {
            const {
              status,
            } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status == "granted") {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                quality: 1,
              });
              console.log("RESULT: ", result);
              if (!result.cancelled) {
                this.setState({ videoPath: result.uri });
              }
            }
          }}
        />
        <Video
          style={styles.video}
          source={
            this.state.videoPath ? { uri: this.state.videoPath } : undefined
          }
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
