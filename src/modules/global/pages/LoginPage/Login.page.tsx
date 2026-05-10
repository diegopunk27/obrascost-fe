import { AppContext } from '@global-contexts/AppContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const REASON_MESSAGES: Record<string, string> = {
  inactivity: 'Tu sesión expiró por inactividad. Volvé a iniciar sesión.',
  expired: 'Tu sesión expiró. Volvé a iniciar sesión.',
};

const FEATURES = [
  'Seguimiento de presupuestos y gastos reales',
  'Estimación por rubros con factores regionales',
  'Análisis inteligente con IA generativa',
];

const BlueprintDecoration = () => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.08,
    }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Grid lines */}
      {Array.from(Array(20).keys()).map((lineIdx) => (
        <line
          key={`h${lineIdx}`}
          x1="0"
          y1={`${lineIdx * 5}%`}
          x2="100%"
          y2={`${lineIdx * 5}%`}
          stroke="white"
          strokeWidth="0.5"
        />
      ))}
      {Array.from(Array(20).keys()).map((lineIdx) => (
        <line
          key={`v${lineIdx}`}
          x1={`${lineIdx * 5}%`}
          y1="0"
          x2={`${lineIdx * 5}%`}
          y2="100%"
          stroke="white"
          strokeWidth="0.5"
        />
      ))}
      {/* Building silhouette */}
      <rect x="15%" y="45%" width="22%" height="50%" fill="white" />
      <rect x="20%" y="30%" width="12%" height="15%" fill="white" />
      <rect x="45%" y="55%" width="30%" height="40%" fill="white" />
      <rect x="50%" y="38%" width="8%" height="17%" fill="white" />
      <rect x="62%" y="38%" width="8%" height="17%" fill="white" />
      {/* Dimension lines */}
      <line x1="13%" y1="96%" x2="39%" y2="96%" stroke="white" strokeWidth="1" />
      <line x1="13%" y1="93%" x2="13%" y2="99%" stroke="white" strokeWidth="1" />
      <line x1="39%" y1="93%" x2="39%" y2="99%" stroke="white" strokeWidth="1" />
    </svg>
  </Box>
);

const LoginPage = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');
  const reasonMessage = reason ? REASON_MESSAGES[reason] : null;
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Left brand panel ─────────────────────────────── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          width: '45%',
          position: 'relative',
          bgcolor: 'primary.main',
          px: 6,
          py: 8,
          overflow: 'hidden',
        }}
      >
        <BlueprintDecoration />

        {/* Logo */}
        <Box sx={{ position: 'relative', zIndex: 1, mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                bgcolor: 'secondary.main',
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={900} color="white" lineHeight={1}>
                OC
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={800} color="white" letterSpacing={-0.5}>
              ObrasCost
            </Typography>
          </Box>
          <Box
            sx={{
              width: 40,
              height: 3,
              bgcolor: 'secondary.main',
              borderRadius: 2,
              ml: 7,
            }}
          />
        </Box>

        {/* Tagline */}
        <Box sx={{ position: 'relative', zIndex: 1, mb: 5 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            color="white"
            lineHeight={1.3}
            mb={1.5}
          >
            Gestión inteligente de costos de obras de construcción
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)' }}>
            Presupuestá, controlá gastos y estimá con IA en un solo lugar.
          </Typography>
        </Box>

        {/* Feature list */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {FEATURES.map((feature) => (
            <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
              <CheckCircleOutlineIcon sx={{ color: 'secondary.light', mt: 0.2, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Bottom accent bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: 'secondary.main',
          }}
        />
      </Box>

      {/* ── Right form panel ─────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          px: { xs: 3, sm: 6, lg: 10 },
          py: 8,
        }}
      >
        {/* Mobile logo */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1, mb: 4 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'secondary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" fontWeight={900} color="white">OC</Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} color="primary">ObrasCost</Typography>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Typography variant="h5" fontWeight={700} color="primary.dark" mb={0.5}>
            Bienvenido de vuelta
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Ingresá tus credenciales para continuar
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {reasonMessage && !error && (
              <Alert severity="info" sx={{ borderRadius: 2 }}>{reasonMessage}</Alert>
            )}
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoFocus
              variant="outlined"
              inputProps={{ 'data-testid': 'input-email' }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              inputProps={{ 'data-testid': 'input-password' }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              data-testid="btn-login"
              sx={{
                mt: 0.5,
                py: 1.4,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': { boxShadow: '0 4px 12px rgba(30,40,53,0.25)' },
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Iniciar sesión'}
            </Button>
          </Box>

          <Typography variant="caption" color="text.disabled" display="block" textAlign="center" mt={4}>
            ObrasCost © {new Date().getFullYear()} — Gestión de obras de construcción
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
