import { w as writable } from "./index.js";
const toasts = writable([]);
function showToast(message, type = "info", duration = 3e3) {
  const id = Date.now();
  const newToast = { id, message, type, duration };
  toasts.update((prev) => [...prev, newToast]);
  setTimeout(() => {
    removeToast(id);
  }, duration);
  return id;
}
function removeToast(id) {
  toasts.update((prev) => prev.filter((t) => t.id !== id));
}
function error(message, duration) {
  return showToast(message, "error", duration);
}
export {
  error as e,
  toasts as t
};
