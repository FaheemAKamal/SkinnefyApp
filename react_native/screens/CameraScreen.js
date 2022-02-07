import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// for access to camera on android phone
import { Camera } from 'expo-camera';
// for using camera again if tab is in focus again
import { useIsFocused } from '@react-navigation/native';

const CAMERA_RATIO = "4:3";
var camera;

export default function CameraScreen({ navigation, route }) {
    // navigation gives access to the React Navigation method 'navigate', 
    // which will allow us to jump to the results screen when the picture is taken.
    const [hasPermission, setHasPermission] = React.useState(null);
    const [size, setSize] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);

    // to re-render camera component once add post tab is clicked again after
    // being clicked away
    const isFocused = useIsFocused();
  
    React.useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');     
      })();
    }, [])
  
    if (hasPermission === null) {
      return <View />;
    }

    if (hasPermission === false) {
      return 
      <Text>
        No access to camera
      </Text>;
    }
  
    const onPictureSaved = photo => {
      navigation.navigate('Results', { data: photo })
    }

    const getPictureSizes = async () => {
      if(camera) {
        const availableSizes = await camera.getAvailablePictureSizesAsync(CAMERA_RATIO);
        setSize(availableSizes[0]);
      }
    }

    return (
      <View style={{ flex: 1, }}>
          { isFocused &&
          <Camera style={{ flex: 1, }} type={type} ratio={CAMERA_RATIO} 
            autoFocus={false} pictureSize={size}
            ref={ref => { camera = ref; }} autoFocus
            onCameraReady={getPictureSizes}
          >
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-end"}}>
              <Text style={{fontWeight: "bold", padding: 25, fontSize: 15, color: "#fff", alignSelf: "center",}}>
                Take a picture of your skin condition
              </Text> 
              <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-evenly", 
                  alignItems: "center",}}>
                  <TouchableOpacity
                      onPress={() => {
                      camera.takePictureAsync({ 
                        base64: true, 
                        compression: 0.0, 
                        onPictureSaved: onPictureSaved});
                      }}
                  >
                      <Ionicons
                        name='ios-radio-button-off'
                        color="#fefefe"
                        size={70}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                      setType(
                      type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                  }}>
                      <Ionicons
                      name='ios-refresh'
                      color="#fefefe"
                      size={35}
                      />
                  </TouchableOpacity>
              </View>
            </View>
          </Camera>
          }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  input: {
    backgroundColor: "#fefefe", 
    borderRadius: 5, borderColor: "#dddddd", borderWidth: 1,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#dddddd",
    borderColor: "#cccccc",
  },
  sliderThumb: {
    borderColor: "#bbbbbb",
    borderWidth: 1,
    elevation: 1,
  }
});

CameraScreen.navigationOptions = {
  header: null,
};