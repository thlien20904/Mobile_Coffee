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
import Offers from "./Screens/Offers";
import ProductDetail from "./Screens/ProductDetail";
import Cart from "./Screens/Cart";
import Checkout from "./Screens/Checkout";
import OrderConfirmation from "./Screens/OrderConfirmation";
import Voucher from "./Screens/Voucher";
import ExchangeBean from "./Screens/ExchangeBean";
import Membership from "./Screens/Membership";
import More from "./Screens/More";
import Contact from "./Screens/Contact";
import Settings from "./Screens/Settings";
import Terms from "./Screens/Terms";
import VNPayTerms from "./Screens/VNPayTerms";
import VATInvoiceGuide from "./Screens/VATInvoiceGuide";
import OrderHistory from "./Screens/OrderHistory";
import UserProfile from "./Screens/UserProfile";

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
        component={Offers}
        options={{ title: "Ưu đãi", headerShown: false }}
      />
      <Tab.Screen
        name="More"
        component={More}
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
            <Stack.Screen name="Voucher" component={Voucher} />
            <Stack.Screen name="ExchangeBean" component={ExchangeBean} />
            <Stack.Screen name="Membership" component={Membership} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="VNPayTerms" component={VNPayTerms} />
            <Stack.Screen name="VATInvoiceGuide" component={VATInvoiceGuide} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
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
            <Stack.Screen name="Voucher" component={Voucher} />
            <Stack.Screen name="ExchangeBean" component={ExchangeBean} />
            <Stack.Screen name="Membership" component={Membership} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="VNPayTerms" component={VNPayTerms} />
            <Stack.Screen name="VATInvoiceGuide" component={VATInvoiceGuide} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
