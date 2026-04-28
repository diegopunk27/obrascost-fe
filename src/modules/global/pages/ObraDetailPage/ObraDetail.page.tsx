import { useObra } from '@common-hooks/index';
import { useGastos } from '@common-hooks/index';
import { EstimacionPanel, GastoFormDialog, ObraStatusChip } from '@common-components/index';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import type { GastoCreate } from '@common-interfaces/Gasto.interface';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const ObraDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const obraId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();

  const { obra, isLoading, error, estimacion, estimando, estimar } = useObra(obraId);
  const { gastos, isLoading: gastosLoading, create: createGasto, remove: removeGasto, total } = useGastos(obraId);

  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateGasto = async (body: GastoCreate) => {
    await createGasto(body);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !obra) {
    return <Alert severity="error">No se pudo cargar la obra.</Alert>;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <IconButton onClick={() => navigate('/dashboard')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>{obra.nombre}</Typography>
        <ObraStatusChip estado={obra.estado} />
      </Box>

      <Box display="flex" gap={3} mb={3} flexWrap="wrap">
        {obra.direccion && (
          <Typography variant="body2" color="text.secondary">{obra.direccion}</Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {obra.superficie_m2} m²
        </Typography>
        {obra.presupuesto_inicial && (
          <Typography variant="body2" color="text.secondary">
            Presupuesto: {fmt(obra.presupuesto_inicial)}
          </Typography>
        )}
      </Box>

      <Tabs value={tab} onChange={(tabEvent, v) => { void tabEvent; setTab(v); }} sx={{ mb: 3 }}>
        <Tab label="Gastos" data-testid="tab-gastos" />
        <Tab label="Estimación" data-testid="tab-estimacion" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Total gastos: {fmt(total)}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setDialogOpen(true)} data-testid="btn-agregar-gasto">
              Agregar gasto
            </Button>
          </Box>
          <GastoFormDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={handleCreateGasto}
            obraId={obraId!}
          />

          <Paper variant="outlined">
            {gastosLoading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <List dense disablePadding>
                {gastos.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.secondary" align="center">
                          No hay gastos registrados
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                {gastos.map((g, i) => (
                  <Box key={g.id}>
                    {i > 0 && <Divider />}
                    <ListItem
                      secondaryAction={
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeGasto(g.id)}
                          data-testid={`btn-del-gasto-${g.id}`}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                      data-testid={`gasto-item-${g.id}`}
                    >
                      <ListItemText
                        primary={g.descripcion}
                        secondary={g.fecha}
                      />
                      <Typography variant="body2" fontWeight={600} mr={5}>
                        {fmt(g.monto)}
                      </Typography>
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      )}

      {tab === 1 && (
        <EstimacionPanel
          estimacion={estimacion}
          estimando={estimando}
          onEstimar={estimar}
        />
      )}
    </Box>
  );
};

export default ObraDetailPage;
