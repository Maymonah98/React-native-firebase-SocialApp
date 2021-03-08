import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://img.icons8.com/bubbles/200/000000/appointment-reminders.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>لا يوجد تنبيهات</Text>
      <Text style={styles.sub}>
جميع التنبيهات المهمة سوف تظهر هنا      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : "#e3dad0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sub: {
    fontWeight: "400",
    color: "#37373750",
  },
});
