import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
