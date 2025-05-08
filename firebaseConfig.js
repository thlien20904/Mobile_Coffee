import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

// Firebase sẽ tự động sử dụng GoogleService-Info.plist khi build
if (!firebase.apps.length) {
  firebase.initializeApp();
  console.log("Firebase initialized successfully");
} else {
  console.log("Firebase already initialized");
}

export const auth = firebase.auth();