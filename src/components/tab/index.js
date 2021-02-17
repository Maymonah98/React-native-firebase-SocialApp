import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../../screens/Home";
import Profile from "../../screens/Profile";
import Messages from "../../screens/Messages";
import Notifications from "../../screens/Notifications";

import Load from "../Load";

const Tab = createBottomTabNavigator();

export default function AppTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#d19677",
        inactiveTintColor: "#B8BBc4",
        showLabel: false,
        style: {
          height: 80,
          backgroundColor: "#344960",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatboxes" color={color} size={26} />
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Load"
        component={Load}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Post");
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-add-circle"
              color={"#B8BBc4"}
              size={48}
              
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
