import type { Rubro, RubroCreate } from '@common-interfaces/Rubro.interface';
import { useRubros } from '@common-hooks/index';
import MoneyInput from '@common-components/MoneyInput/MoneyInput.component';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

interface FormState {
  nombre: string;
  descripcion: string;
  costo_referencia_m2: string;
}

const emptyForm = (): FormState => ({ nombre: '', descripcion: '', costo_referencia_m2: '' });

const RubrosManager = () => {
  const { rubros, isLoading, create, update, remove } = useRubros(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Rubro | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  const handleOpen = (rubro?: Rubro) => {
    if (rubro) {
      setEditing(rubro);
      setForm({
        nombre: rubro.nombre,
        descripcion: rubro.descripcion,
        costo_referencia_m2: String(rubro.costo_referencia_m2),
      });
    } else {
      setEditing(null);
      setForm(emptyForm());
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: RubroCreate = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        costo_referencia_m2: parseFloat(form.costo_referencia_m2) || 0,
      };
      if (editing) {
        await update(editing.id, body);
      } else {
        await create(body);
      }
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActivo = async (rubro: Rubro) => {
    await update(rubro.id, { activo: !rubro.activo });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          data-testid="btn-nuevo-rubro"
        >
          Nuevo rubro
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Costo ref/m²</TableCell>
            <TableCell align="center">Activo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rubros.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell>
                <Typography variant="body2" fontWeight={600}>{r.nombre}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">{r.descripcion}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">{fmt(r.costo_referencia_m2)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={r.activo}
                  size="small"
                  onChange={() => handleToggleActivo(r)}
                  data-testid={`switch-rubro-${r.id}`}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => handleOpen(r)} data-testid={`btn-edit-rubro-${r.id}`}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => remove(r.id)} data-testid={`btn-del-rubro-${r.id}`}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {rubros.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="text.secondary" py={2}>
                  No hay rubros cargados
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Editar rubro' : 'Nuevo rubro'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              fullWidth
              required
              inputProps={{ 'data-testid': 'input-rubro-nombre' }}
            />
            <TextField
              label="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
              fullWidth
              multiline
              rows={2}
            />
            <MoneyInput
              label="Costo de referencia por m²"
              value={form.costo_referencia_m2}
              onChange={(v) => setForm((f) => ({ ...f, costo_referencia_m2: v }))}
              fullWidth
              inputProps={{ 'data-testid': 'input-rubro-costo' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !form.nombre || !form.costo_referencia_m2}
            data-testid="btn-save-rubro"
          >
            {saving ? <CircularProgress size={18} /> : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RubrosManager;
