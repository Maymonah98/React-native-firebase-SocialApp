import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { AdMobRewarded } from "expo-ads-admob";
import getImage from "../utils/getImageAdorable";

import * as firebase from "firebase";

import Fire from "../components/Fire";
import { TouchableOpacity } from "react-native-gesture-handler";

const data = Fire.shared.fakeData;

export default function Profile() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState({});

  async function test() {
    await AdMobRewarded.setAdUnitID("ca-app-pub-5014682151271774/3906623363");
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  useEffect(() => {
    console.disableYellowBox = true;
    setUserName(Fire.shared.userData.displayName);
    setAvatarUrl(Fire.shared.userData.photoURL);
    Fire.shared.userInfos
      .get()
      .then(function (doc) {
        setInfos(doc.data());
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [avatarUrl]);

  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center",  }}
      style={styles.container}
    >
      <View style={{ marginTop: 32, alignItems: "flex-start" , flexDirection : "row" ,padding: 20 }}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        </View>
        <View style={{flex:1}}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.name}>0555555</Text>
        <TouchableOpacity style={styles.button}  onPress={() => Fire.shared.singOut()}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontWeight: "bold" }}>
              تسجيل الخروج
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.status}>
          <Text style={styles.statAmount}>
            {infos?.posts ? infos?.posts : 0}
          </Text>
          <Text style={styles.statTitle}>معروضة</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statAmount}>
            {infos?.folloers ? infos?.folloers : 0}
          </Text>
          <Text style={styles.statTitle}>يتابعونك</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statAmount}>
            {infos?.following ? infos?.folowing : 0}
          </Text>
          <Text style={styles.statTitle}>تتابعهم</Text>
        </View>
      </View>
      <FlatList
        numColumns={3}
        style={styles.containerPosts}
        data={data}
        renderItem={({ item }) => {
          item = false
          return item ? (
            <View
              key={item.id}
              style={{
                flex: 1,
                borderWith: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.post}>
                <Image source={{ uri: item.avatar_url }} width={100} />
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{color: "#344960"}}>How about posting some pictures ?</Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor : "#e3dad0",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 15,
    shadowOpacity: 0.5,
    borderWidth: 4,
    borderRadius: 136 / 2,
    borderColor: "white",
  },
  containerPosts: {
    width: "95%",
    height: "auto",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#C3c5cd",
    borderRadius: 2,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },

  name: {
    marginTop: 10,
    paddingLeft: 20,
    color:"#344960",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginLeft: 20,
    marginTop: 7,
    backgroundColor: "#344960",
    borderRadius: 4,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 18,
  },
  status: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "darkgrey",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  post: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: "#333",
  },
});
