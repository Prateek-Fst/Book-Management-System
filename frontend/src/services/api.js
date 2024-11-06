import axios from "axios";
const API_URL = "http://localhost:8086/";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const registerAuthor = (authorData) => api.post("/register", authorData);
export const loginAuthor = (loginData) => api.post("/login", loginData);
export const createBook = (bookData) => api.post("/books", bookData);
export const getBooks = () => api.get("/books");
export const getBookById = (bookId) => api.get(`/books/${bookId}`);
export const createReview = (bookId, reviewData) => api.post(`/books/${bookId}/reviews`, reviewData);
export const getReviews = (bookId) => api.get(`/books/${bookId}/reviews`);
