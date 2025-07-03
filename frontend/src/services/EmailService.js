import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getEmails() {
    return apiClient.get("/emails");
  },
  getEmail(id) {
    return apiClient.get(`/emails/${id}`);
  },
  deleteEmail(id) {
    return apiClient.delete(`/emails/${id}`);
  }
};
