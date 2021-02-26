import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {Picker} from '@react-native-picker/picker';

import "firebase/firestore";

import Fire from "../components/Fire";

import {
  View,
  Text,
  Alert,
  Image,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
//  Picker
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Post() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    "https://img.icons8.com/material-outlined/24/000000/user--v1.png"
  );

  const navigation = useNavigation();

  useEffect(() => {
    getPhotoPermissions();
    setPhotoUrl(Fire.shared.userData.photoURL);
  }, []);


  // state = {
  //   language: 'java',
  // };  
  async function getPhotoPermissions() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        Alert.alert("Error", "We need access to your camera for this");
      }
    }
  }

  async function handlePost() {
    const data = {
      text: text.trim(),
      localUri: image,
      likes: 0,
      comments: [],
    };

    return Fire.shared
      .addPost(data)
      .then(() => {
        setText("");
        setImage(null);
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert("error", JSON.stringify(err));
      });
  }

  async function pickImage() {
    const resul = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resul.cancelled) {
      setImage(resul.uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="md-arrow-back" size={34} color="#e3dad0" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => handlePost()}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22,color:"#e3dad0" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
      <View style={styles.inputContainer}>

        <View>
            <Text style={styles.inputTitle}>name of item</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoFocus
              placeholder="What is your item ?"
              value={text}
              onChangeText={setText}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>price</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoFocus
              placeholder="price of item"
              value={text}
              onChangeText={setText}
            />
          </View>
          <View>
            <Text style={styles.inputTitle }>description</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoFocus
              placeholder="describe your item"
              value={text}
              onChangeText={setText}
            />
          </View>

          <View>
           <Text  style={styles.inputTitle} >Offered for</Text> 
           <Picker
            // selectedValue={this.state.language}
           style={{borderBottomWidth: StyleSheet.hairlineWidth,
                   borderTopWidth: StyleSheet.hairlineWidth,
                   marginTop:15
           }}
           // onValueChange={(itemValue, itemIndex) =>
           //   this.setState({language: itemValue})
           //   }
            >
            <Picker.Item label="Sale" value="sale"/>
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="borrowing" value="borrowing" />
            </Picker>
          </View>
      </View>

      <TouchableOpacity style={styles.avatar} onPress={() => pickImage()}>
        <Ionicons name="md-camera" size={32}  />
      </TouchableOpacity>

      <View
        style={{
          marginHorizontal: 32,
          marginTop: 32,
          height: 300,
          width: "90%",
        }}
      >
        <Image
          source={{ uri: image }}
          fadeDuration={1000}
          style={{ flex: 1 }}
        />
      </View>
      <Button title="teste" onPress={() => Alert.alert("teste", image)} />
      </ScrollView>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3dad0",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 10,
    paddingTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor : "#344960"
  },
  inputContainer: {
    margin: 10,
    alignItems: "stretch",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
  inputTitle: {
    color: "#344960",
    fontSize: 14,
    textTransform: "uppercase",
    marginTop : 6
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
    marginBottom: 6,
  },
});
