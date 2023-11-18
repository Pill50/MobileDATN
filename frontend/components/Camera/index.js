import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const CameraComp = () => {
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
      <View style={styles.action}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>CHỤP ẢNH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
  action: {
    display: "flex",
    justifyContent: "center",
  },
  captureButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 120,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#4285F4",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CameraComp;
