import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Registration from './components/Registration';
import PageNotFound from './pages/PageNotFound';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NewsList from './components/NewsList';
import Favorites from './components/Favorites';
import NavbarComp from './components/NavbarComp';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <NavbarComp />
   <ToastContainer/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/favorite-article" element={<Favorites />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>


);


reportWebVitals();
