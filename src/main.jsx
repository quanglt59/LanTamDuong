import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminApp from './AdminApp.jsx';
import CustomerLogin from './pages/CustomerLogin.jsx';
import CustomerRegister from './pages/CustomerRegister.jsx';

const path = window.location.pathname;

let Component;
if (path.startsWith('/admin')) {
  Component = AdminApp;
} else if (path === '/dang-nhap') {
  Component = CustomerLogin;
} else if (path === '/dang-ky') {
  Component = CustomerRegister;
} else {
  Component = App;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
  </StrictMode>
);
