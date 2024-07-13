import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      {user ? (
        <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
          Go to Products
        </Button>
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
