// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { AboutUs, CreateAccount, Home, Services, SignIn } from './screens';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { AppRoutes } from './router/routes';
import Layout from './components/Layout';

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isUserLoggedIn');
    setIsUserLoggedIn(loggedIn === 'true');
  }, []);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem('isUserLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('isUserLoggedIn');
  };

  const [filters, setFilters] = useState({ phones: false, headphones: false, accessories: false });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Provider store={store}>
      <Router>
        <Layout
          isUserLoggedIn={isUserLoggedIn}
          handleLogout={handleLogout}
          handleFilterChange={handleFilterChange}
          filters={filters}
        >
          <Routes>
            <Route
              path={AppRoutes.root}
              element={<Navigate to={isUserLoggedIn ? AppRoutes.products : AppRoutes.sign_in} />}
            />
            <Route path={AppRoutes.sign_in} element={<SignIn onLogin={handleLogin} />} />
            <Route path={AppRoutes.create_account} element={<CreateAccount />} />
            <Route
              path={AppRoutes.products}
              element={
                isUserLoggedIn ? <ProductList filters={filters} /> : <Navigate to={AppRoutes.sign_in} />
              }
            />
            <Route
              path="/products/:id"
              element={
                isUserLoggedIn ? <ProductDetails /> : <Navigate to={AppRoutes.sign_in} />
              }
            />
            <Route
              path={AppRoutes.services}
              element={
                isUserLoggedIn ? <Services /> : <Navigate to={AppRoutes.sign_in} />
              }
            />
            <Route
              path={AppRoutes.home}
              element={
                isUserLoggedIn ? <Home /> : <Navigate to={AppRoutes.sign_in} />
              }
            />
            <Route
              path={AppRoutes.aboutus}
              element={
                isUserLoggedIn ? <AboutUs /> : <Navigate to={AppRoutes.sign_in} />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
