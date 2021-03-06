import * as firebase from "firebase";

import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import getAvatarUrl from "../utils/getImageAdorable";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
	const [ phoneNumber, setPhoneNumber ] = useState();

  const navigation = useNavigation();

  function handleSignUp() {
    const avatarUrl = getAvatarUrl();
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        firebase
          .firestore()
          .collection("users")
          .doc(userCredentials.user.uid)
          .set({
            posts: 0,
            followers: 0,
            following: 0,
            name: name,
            photoURL: avatarUrl,
            email : email,
						phoneNumber: phoneNumber
          })
          .then(() => {
            userCredentials.user.updateProfile({
              displayName: name,
              photoURL: avatarUrl,
            });
            setLoading(false);
            navigation.navigate("AppTab", { screen: "Home" });
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.greeting}>{`مرحباً \n سجل حسابك للبدء`}</Text>

        <View style={styles.errorMessage}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>اسم المستخدم</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>الايميل</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>رقم الجوال</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType={'number-pad'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>كلمة المرور</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontWeight: "500" }}>تسجيل</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
          <Text style={{ color: "#414959", fontSize: 13 }}>
          لديك حساب ؟  {" "}
            <Text
              onPress={() => navigation.navigate("login")}
              style={{ fontWeight: "500", color: "#d19677" }}
            >
              دخول
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#e3dad0",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 5,
    color : "#b5846a",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#344960",
    fontSize: 10,
    textTransform: "uppercase",
    alignSelf:"flex-end",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#344960",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
