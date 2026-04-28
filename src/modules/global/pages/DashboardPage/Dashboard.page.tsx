import { useObras } from '@common-hooks/index';
import { KpiCard, ObraStatusChip } from '@common-components/index';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import type { ObraCreate, EstadoObra } from '@common-interfaces/Obra.interface';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const ESTADOS: Array<EstadoObra> = ['borrador', 'en_progreso', 'pausada', 'finalizada', 'cancelada'];

interface NewObraForm {
  nombre: string;
  direccion: string;
  superficie_m2: string;
  fecha_inicio: string;
  presupuesto_inicial: string;
  estado: EstadoObra;
}

const emptyForm = (): NewObraForm => ({
  nombre: '',
  direccion: '',
  superficie_m2: '',
  fecha_inicio: new Date().toISOString().split('T')[0],
  presupuesto_inicial: '',
  estado: 'borrador',
});

const DashboardPage = () => {
  const { obras, isLoading, create } = useObras();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewObraForm>(emptyForm());
  const [saving, setSaving] = useState(false);

  const totalPresupuesto = obras.reduce((acc, o) => acc + (o.presupuesto_inicial ?? 0), 0);
  const obrasActivas = obras.filter((o) => o.estado === 'en_progreso').length;

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: ObraCreate = {
        nombre: form.nombre,
        direccion: form.direccion || undefined,
        superficie_m2: parseFloat(form.superficie_m2),
        fecha_inicio: form.fecha_inicio,
        presupuesto_inicial: form.presupuesto_inicial ? parseFloat(form.presupuesto_inicial) : null,
        estado: form.estado,
      };
      await create(body);
      setOpen(false);
      setForm(emptyForm());
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          data-testid="btn-nueva-obra"
        >
          Nueva obra
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={2} mb={4}>
        <KpiCard
          title="Total de obras"
          value={obras.length}
          icon={<ApartmentIcon />}
          color="primary"
        />
        <KpiCard
          title="Obras activas"
          value={obrasActivas}
          icon={<ApartmentIcon />}
          color="secondary"
        />
        <KpiCard
          title="Presupuesto total"
          value={fmt(totalPresupuesto)}
          icon={<AttachMoneyIcon />}
          color="primary"
        />
      </Box>

      <Paper variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Dirección</strong></TableCell>
              <TableCell align="right"><strong>Superficie</strong></TableCell>
              <TableCell align="right"><strong>Presupuesto</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && obras.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay obras registradas. ¡Creá la primera!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {obras.map((o) => (
              <TableRow
                key={o.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/obras/${o.id}`)}
                data-testid={`row-obra-${o.id}`}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{o.nombre}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{o.direccion || '—'}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">{o.superficie_m2} m²</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {o.presupuesto_inicial ? fmt(o.presupuesto_inicial) : '—'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <ObraStatusChip estado={o.estado} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Nueva obra</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              fullWidth
              required
              inputProps={{ 'data-testid': 'input-obra-nombre' }}
            />
            <TextField
              label="Dirección"
              value={form.direccion}
              onChange={(e) => setForm((f) => ({ ...f, direccion: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Superficie (m²)"
              value={form.superficie_m2}
              onChange={(e) => setForm((f) => ({ ...f, superficie_m2: e.target.value }))}
              fullWidth
              type="number"
              required
              inputProps={{ min: 1, 'data-testid': 'input-obra-superficie' }}
            />
            <TextField
              label="Fecha de inicio"
              value={form.fecha_inicio}
              onChange={(e) => setForm((f) => ({ ...f, fecha_inicio: e.target.value }))}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Presupuesto inicial"
              value={form.presupuesto_inicial}
              onChange={(e) => setForm((f) => ({ ...f, presupuesto_inicial: e.target.value }))}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Estado"
              value={form.estado}
              onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value as EstadoObra }))}
              fullWidth
              select
            >
              {ESTADOS.map((e) => (
                <MenuItem key={e} value={e}>{e.replace('_', ' ')}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !form.nombre || !form.superficie_m2}
            data-testid="btn-confirmar-obra"
          >
            {saving ? <CircularProgress size={18} /> : 'Crear obra'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
