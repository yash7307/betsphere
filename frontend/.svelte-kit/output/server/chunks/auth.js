import { w as writable } from "./index.js";
import "./api.js";
const user = writable(null);
const isAuthenticated = writable(false);
const authLoading = writable(true);
export {
  authLoading as a,
  isAuthenticated as i,
  user as u
};
