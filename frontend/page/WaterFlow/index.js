import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CameraComp from "./components/Camera";

const WaterFlowPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GHI CHỈ SỐ NƯỚC</Text>
      <CameraComp />
      <View style={styles.resultGroup}>
        <View style={styles.resultItem}>
          <Text style={styles.resultTitle}>AI nhận diện</Text>
          <Text style={styles.result}>0046</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultTitle}>Thực tế</Text>
          <Text style={styles.result}>0046</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>HỦY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4285F4",
    textAlign: "center",
    marginBottom: 14,
  },
  resultGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  resultItem: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E8F7",
    borderRadius: 8,
    padding: 12,
    minWidth: 180,
    minHeight: 180,
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  result: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#DB4437",
  },
  actions: {
    marginTop: 12,
    marginRight: 27,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    height: 40,
    width: 96,
    borderRadius: 4,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtn: {
    height: 40,
    width: 120,
    borderRadius: 4,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WaterFlowPage;
