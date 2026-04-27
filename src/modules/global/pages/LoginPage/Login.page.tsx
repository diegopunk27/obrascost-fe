import { Box, Button, Container, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Iniciar sesión
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
        <Button variant="contained" color="primary">
          Regálame un token
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
