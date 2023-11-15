import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const cameraRef = useRef(null);

  const handleCameraReady = () => {
    console.log("Camera is ready");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri, width, height } = await cameraRef.current.takePictureAsync();
      setImageUri({ uri, width, height });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result);
    }
  };

  const handleFrameMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setFramePosition({ x: locationX - 190, y: locationY - 190 }); // Adjust the values based on the frame size
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  });

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permission...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>TITLE</Text>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        ratio={"1:1"}
        onCameraReady={handleCameraReady}
      >
        <ImageBackground
          style={styles.overlay}
          source={{ uri: imageUri?.uri }} // Use ImageBackground instead of Image
        >
          <View
            style={[styles.frame, { transform: [{ translateX: framePosition.x }, { translateY: framePosition.y }] }]}
            onTouchMove={handleFrameMove}
          />
          {/* Add four small frames in the center */}
          <View style={styles.smallFrameGroup}>
            <View style={styles.smallFrame} />
            <View style={styles.smallFrame} />
            <View style={styles.smallFrame} />
            <View style={styles.smallFrame} />
          </View>
        </ImageBackground>
      </Camera>
      <View style={styles.cameraOverlay}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.container1}> shahaha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  camera: {
    // flex: 1,
    width: 380,
    height: 380,
    padding: -17,
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 380,
    height: 380,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
  },
  smallFrameGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -200,
    gap: 6,
  },
  smallFrame: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  cameraOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  pickButton: {
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default App;
