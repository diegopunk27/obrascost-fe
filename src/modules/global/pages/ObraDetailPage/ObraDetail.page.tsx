import { useObra, useGastos, invalidateObras } from '@common-hooks/index';
import { EstimacionPanel, GastoFormDialog, ObraStatusChip } from '@common-components/index';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { GastoCreate } from '@common-interfaces/Gasto.interface';
import type { EstadoObra } from '@common-interfaces/Obra.interface';
import { obrasService } from '@common-services/Obras.service';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ESTADO_LABELS,
  esEstadoTerminal,
  getTransicionesValidas,
} from '@utils/estado-transiciones.util';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const extractApiMessage = (err: unknown): string => {
  const candidate = err as { response?: { data?: { message?: string; detail?: string } } };
  return (
    candidate?.response?.data?.message ??
    candidate?.response?.data?.detail ??
    'Ocurrió un error inesperado.'
  );
};

const ObraDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const obraId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();

  const { obra, isLoading, error, mutate, estimacion, estimando, estimar } = useObra(obraId);
  const { gastos, isLoading: gastosLoading, create: createGasto, remove: removeGasto, total } = useGastos(obraId);

  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [estadoMenuAnchor, setEstadoMenuAnchor] = useState<HTMLElement | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ msg: string; severity: 'success' | 'error' } | null>(null);

  const handleCreateGasto = async (body: GastoCreate) => {
    await createGasto(body);
  };

  const handleChangeEstado = async (nuevo: EstadoObra) => {
    setEstadoMenuAnchor(null);
    if (!obraId) return;
    try {
      await obrasService.update(obraId, { estado: nuevo });
      await mutate();
      await invalidateObras();
      setSnackbar({ msg: `Estado actualizado a "${ESTADO_LABELS[nuevo]}".`, severity: 'success' });
    } catch (err) {
      setSnackbar({ msg: extractApiMessage(err), severity: 'error' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!obraId) return;
    setDeleting(true);
    try {
      await obrasService.remove(obraId);
      await invalidateObras();
      navigate('/dashboard');
    } catch (err) {
      setSnackbar({ msg: extractApiMessage(err), severity: 'error' });
      setConfirmDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
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

  const transiciones = getTransicionesValidas(obra.estado);
  const sinTransicionesPosibles = esEstadoTerminal(obra.estado);
  const puedeEliminar = obra.estado === 'borrador';

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <IconButton onClick={() => navigate('/dashboard')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>{obra.nombre}</Typography>
        <ObraStatusChip estado={obra.estado} />
        <Tooltip
          title={
            sinTransicionesPosibles
              ? 'Estado terminal: no se puede modificar'
              : 'Cambiar estado'
          }
        >
          <span>
            <IconButton
              size="small"
              disabled={sinTransicionesPosibles}
              onClick={(e) => setEstadoMenuAnchor(e.currentTarget)}
              data-testid="btn-cambiar-estado"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Menu
          anchorEl={estadoMenuAnchor}
          open={Boolean(estadoMenuAnchor)}
          onClose={() => setEstadoMenuAnchor(null)}
        >
          {transiciones.map((destino) => (
            <MenuItem
              key={destino}
              onClick={() => handleChangeEstado(destino)}
              data-testid={`estado-option-${destino}`}
            >
              <ObraStatusChip estado={destino} />
              <Box ml={1.5}>{ESTADO_LABELS[destino]}</Box>
            </MenuItem>
          ))}
        </Menu>
        <Box flex={1} />
        {puedeEliminar && (
          <Tooltip title="Eliminar obra">
            <IconButton
              size="small"
              color="error"
              onClick={() => setConfirmDeleteOpen(true)}
              data-testid="btn-eliminar-obra"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
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

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        data-testid="dialog-confirmar-eliminar"
      >
        <DialogTitle>¿Eliminar esta obra?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. Solo se pueden eliminar obras en estado «borrador».
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            data-testid="btn-confirmar-eliminar"
          >
            {deleting ? <CircularProgress size={20} color="inherit" /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={5000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snackbar ? (
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar(null)}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
};

export default ObraDetailPage;
