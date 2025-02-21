import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './components/section/navbar.jsx';
import Footer from './components/section/footer.jsx';

const RootLayout = () => {
    const location = useLocation();
    
    // Define routes where Navbar & Footer should be hidden
    const hideOnRoutes = ["/login", "/register","/admin","/adminform"];
    
    return (
        <>
            {!hideOnRoutes.includes(location.pathname) && <Navbar />}
            <App />
            {!hideOnRoutes.includes(location.pathname) && <Footer />}
        </>
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <RootLayout />
        </BrowserRouter>
    </StrictMode>
);
