import AsyncStorage from "@react-native-async-storage/async-storage";
 const API_BASE_URL = "http://"

export const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password}),
    });
    return await response.json();
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Failed to sign up"}
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ email, password}),
    });
    const data = await response.json();
    if (response.ok) {
      await AsyncStorage.setItem("userToken", data.token);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Failed to log in"}
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
    });
    await AsyncStorage.removeItem("userToken");
    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to log out"}
  }
};
