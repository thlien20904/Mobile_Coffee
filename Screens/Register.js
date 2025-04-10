import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView, // Thêm ScrollView vì form dài hơn
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import styles from "../styles/Register";
// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Thêm state cho full name
  const [phone, setPhone] = useState(""); // Thêm state cho phone
  const [address, setAddress] = useState(""); // Thêm state cho address
  const navigation = useNavigation();

  // Đăng ký tài khoản thường thông qua API của bạn
  const handleSignUp = async () => {
    if (!username || !email || !password || !fullName || !phone || !address) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      const API_URL = "https://d54b-171-251-212-25.ngrok-free.app/api/register"; // Cập nhật URL đúng của bạn

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          fullName, // Thêm fullName vào request
          phone, // Thêm phone vào request
          address, // Thêm address vào request
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Sign up failed!");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  // Đăng nhập với Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed in with Google!");
          navigation.navigate("Home");
        })
        .catch(() => Alert.alert("Error", "Google sign-in failed!"));
    }
  }, [response]);

  // Đăng nhập với Facebook
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "YOUR_FACEBOOK_APP_ID",
  });

  React.useEffect(() => {
    if (fbResponse?.type === "success") {
      const { access_token } = fbResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Signed in with Facebook!");
          navigation.navigate("Home");
        })
        .catch(() => Alert.alert("Error", "Facebook sign-in failed!"));
    }
  }, [fbResponse]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={40} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Sign In</Text>
        </View>

        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subtitle}>
          Enter your details for sign up.{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account?
          </Text>
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#777" style={styles.icon} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Entypo name="email" size={20} color="#777" style={styles.icon} />
          <TextInput
            placeholder="Email address"
            style={styles.input}
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#777" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.input}
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Entypo
              name={passwordVisible ? "eye" : "eye-with-line"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* Thêm trường Full Name */}
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#777" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#777"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Thêm trường Phone */}
        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color="#777" style={styles.icon} />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            placeholderTextColor="#777"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Thêm trường Address */}
        <View style={styles.inputContainer}>
          <Entypo
            name="location-pin"
            size={20}
            color="#777"
            style={styles.icon}
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            placeholderTextColor="#777"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() => fbPromptAsync()}
        >
          <FontAwesome name="facebook-f" size={20} color="white" />
          <Text style={styles.socialText}> Connect With Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
        >
          <AntDesign name="google" size={20} color="white" />
          <Text style={styles.socialText}> Connect With Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
