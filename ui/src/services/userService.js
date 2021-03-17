import http from "./http";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

/// this function takes User Info
export function getUserInfo() {
  return http.get(`/users/me`).then((resp) => resp.data);
}
/// this function takes all user cards favorited
export function allFavorite(data) {
  return http.get(`/users/favoriteCards/?numbers=${data}`);
}
//this function add the card to user favorites cards
export function favorite(data) {
  return http.patch(`/users/favorite`, { cards: [data] });
}
//this function remove from card to user favorites cards
export function unFavorite(data) {
  return http.patch(`/users/unFavorite`, { cards: [data] });
}
/// this function get toke and  Decode the token and return date from the token
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}
export function logout() {
  localStorage.setItem("user", null);
  localStorage.removeItem("token");
  http.refreshRequestToken();
}
export async function login(email, password) {
  const { data } = await http.post(`/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
  http.refreshRequestToken();
}

const service = {
  login,
  logout,
  getCurrentUser,
  getUserInfo,
  allFavorite,
  favorite,
  unFavorite,
};

export default service;
