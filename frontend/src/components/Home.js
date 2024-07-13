import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight={'bold'}>
          Home
        </Typography>
        {user ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Go to Products
          </Button>
        ) : (
          <Box display="flex" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
