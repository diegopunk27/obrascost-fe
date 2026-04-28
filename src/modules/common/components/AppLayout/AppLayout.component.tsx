import { AppContext } from '@global-contexts/AppContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactNode, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
];

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const { logout, user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          },
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography variant="h6" fontWeight={700} color="secondary.light" noWrap>
            ObrasCost
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <List sx={{ flex: 1, pt: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                selected={active}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.12)' },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                <ListItemIcon sx={{ color: active ? 'secondary.light' : 'rgba(255,255,255,0.7)', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, color: active ? '#fff' : 'rgba(255,255,255,0.7)' }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="rgba(255,255,255,0.6)" display="block">
              {user?.email ?? ''}
            </Typography>
          </Box>
          <IconButton size="small" onClick={logout} sx={{ color: 'rgba(255,255,255,0.7)' }} title="Cerrar sesión">
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flex: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
