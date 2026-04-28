import { AppContext } from '@global-contexts/AppContext';
import { Alert, Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Credenciales inválidas. Verificá tu email y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
          ObrasCost
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Gestión de costos de obras de construcción
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoFocus
            inputProps={{ 'data-testid': 'input-email' }}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            inputProps={{ 'data-testid': 'input-password' }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            data-testid="btn-login"
            sx={{ mt: 1, py: 1.2 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Iniciar sesión'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
