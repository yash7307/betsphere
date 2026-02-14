import { writable } from 'svelte/store';

export const toasts = writable([]);

export function showToast(message, type = 'info', duration = 3000) {
    const id = Date.now();
    const newToast = { id, message, type, duration };

    toasts.update(prev => [...prev, newToast]);

    setTimeout(() => {
        removeToast(id);
    }, duration);

    return id;
}

export function removeToast(id) {
    toasts.update(prev => prev.filter(t => t.id !== id));
}

export function success(message, duration) {
    return showToast(message, 'success', duration);
}

export function error(message, duration) {
    return showToast(message, 'error', duration);
}

export function warning(message, duration) {
    return showToast(message, 'warning', duration);
}

export function info(message, duration) {
    return showToast(message, 'info', duration);
}
