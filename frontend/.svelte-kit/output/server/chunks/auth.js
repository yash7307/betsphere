import { w as writable } from "./index.js";
import "./api.js";
const user = writable(null);
const authLoading = writable(true);
export {
  authLoading as a,
  user as u
};
