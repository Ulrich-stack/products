import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate('/products'); // Redirection vers la page des produits
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Register;
