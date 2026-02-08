import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="toast-container" style={{
            position: 'fixed',
            top: '80px',
            right: '16px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '400px'
        }}>
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

function ToastItem({ toast, onClose }) {
    const typeStyles = {
        success: {
            background: 'var(--color-success)',
            color: '#000'
        },
        error: {
            background: 'var(--color-danger)',
            color: '#fff'
        },
        warning: {
            background: 'var(--color-warning)',
            color: '#000'
        },
        info: {
            background: 'var(--color-info)',
            color: '#fff'
        }
    };

    const style = {
        ...typeStyles[toast.type],
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        animation: 'slideIn 0.3s ease',
        minWidth: '250px'
    };

    return (
        <div style={style}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{toast.message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '0 4px',
                    lineHeight: 1
                }}
            >
                ×
            </button>
        </div>
    );
}
