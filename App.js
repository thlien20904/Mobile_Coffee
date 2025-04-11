import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Forget from "./Screens/Forget";
import Home from "./Screens/Home";
import Order from "./Screens/Order";
import ProductDetail from "./Screens/ProductDetail";
import Cart from "./Screens/Cart"; // Thêm import Cart
import Checkout from "./Screens/Checkout"; // Thêm import Checkout
import OrderConfirmation from "./Screens/OrderConfirmation"; // Thêm import OrderConfirmation

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Order") {
            iconName = focused ? "cafe" : "cafe-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Store") {
            iconName = focused ? "storefront" : "storefront-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Offers") {
            iconName = focused ? "local-offer" : "local-offer";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "More") {
            iconName = focused ? "menu" : "menu";
            return <Feather name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#F37934",
        tabBarInactiveTintColor: "#777777",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#EEEEEE",
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: "Trang chủ", headerShown: false }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{ title: "Đặt hàng", headerShown: false }}
      />
      <Tab.Screen
        name="Store"
        component={Home}
        options={{ title: "Cửa hàng", headerShown: false }}
      />
      <Tab.Screen
        name="Offers"
        component={Home}
        options={{ title: "Ưu đãi", headerShown: false }}
      />
      <Tab.Screen
        name="More"
        component={Home}
        options={{ title: "Khác", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Xóa dữ liệu AsyncStorage để kiểm tra giao diện chưa đăng nhập
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared");

        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const user = await AsyncStorage.getItem("userInfo");
        console.log("isLoggedIn from AsyncStorage:", loggedIn);
        console.log("userInfo from AsyncStorage:", user);
        setIsLoggedIn(loggedIn === "true");
        setUserInfo(user ? JSON.parse(user) : null);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              initialParams={{ userInfo }}
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmation}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Forget" component={Forget} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmation}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
