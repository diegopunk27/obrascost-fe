import { RubrosManager } from '@common-components/index';
import { AppContext } from '@global-contexts/AppContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import {
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';

const ConfiguracionPage = () => {
  const { user } = useContext(AppContext);
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Configuración</Typography>

      <Tabs value={tab} onChange={(tabEvent, v) => { void tabEvent; setTab(v); }} sx={{ mb: 3 }}>
        <Tab icon={<CategoryIcon />} iconPosition="start" label="Rubros" data-testid="tab-rubros" />
        <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Cuenta" data-testid="tab-cuenta" />
      </Tabs>


      {tab === 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Catálogo de rubros</Typography>
          <RubrosManager />
        </Paper>
      )}

      {tab === 1 && (
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 480 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Datos de la cuenta</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body2" fontWeight={600}>{user?.email ?? '—'}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Rol</Typography>
              <Typography variant="body2" fontWeight={600}>{user?.role_name ?? '—'}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ConfiguracionPage;
