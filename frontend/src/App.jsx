import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BetProvider } from './context/BetContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout/Layout';
import Toast from './components/UI/Toast';
import Home from './pages/Home';
import InPlay from './pages/InPlay';
import MyBets from './pages/MyBets';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import './index.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// App Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/in-play" element={<InPlay />} />
        <Route path="/in-play/:matchId" element={<InPlay />} />
        <Route path="/my-bets" element={<MyBets />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <BetProvider>
          <ToastProvider>
            <Toast />
            <AppRoutes />
          </ToastProvider>
        </BetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
