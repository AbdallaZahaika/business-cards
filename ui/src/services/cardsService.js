import http from "./http";

export function createCard(card) {
  return http.post(`/cards`, card);
}

/// this function takes all user cards
export function getAllMyCards(page = 0) {
  return http.get(`/cards/allmyCards/?page=${page}`);
}
/// this function get card by id
export function getCard(id) {
  return http.get(`/cards/${id}`);
}

/// this function get all cards from db
export function getAll(page = 0) {
  return http.get(`/cards/allCards/?page=${page}`);
}
/// this function delete Card
export function deleteCard(id) {
  return http.delete(`/cards/${id}`);
}
/// this function edite Card
export function updateCard(card) {
  const { _id, ...data } = card;

  return http.put(`/cards/${_id}`, data);
}

//// this function search in user  cards
export function searchInMyCards(bizNumber) {
  return http.get(`/cards/search/mycard/${bizNumber}`);
}
/// this function search in all cards
export function search(value) {
  return http.get(`/cards/search/?q=${value}`);
}
//count of my cards
export function countMyCards() {
  return http.get(`/cards/count/mycards`);
}
//count of all  cards
export function countAllCards() {
  return http.get(`/cards/count/cards`);
}

/// upload new card image
export function uploadCardImage(image) {
  return http.post(`/upload/save-card-image`, image);
}

/// delete card image
export function deleteCardImage(image) {
  const dataBody = { cardImage: image };
  return http.put(`/upload/delete-card-image`, dataBody);
}

const service = {
  createCard,
  getAllMyCards,
  getCard,
  deleteCard,
  updateCard,
  getAll,
  search,
  searchInMyCards,
  countAllCards,
  countMyCards,
  uploadCardImage,
  deleteCardImage,
};

export default service;
