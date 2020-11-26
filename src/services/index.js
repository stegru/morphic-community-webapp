import axios from "axios";
import { API_URL } from "@/utils/constants";

export const HTTP = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json; charset=utf-8" }
});
