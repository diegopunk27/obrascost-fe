import type { GastoCreate } from '@common-interfaces/Gasto.interface';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface Props {
  open: boolean;
  obraId: number;
  onClose: () => void;
  onSave: (body: GastoCreate) => Promise<void>;
}

const GastoFormDialog = ({ open, onClose, onSave }: Props) => {
  const today = new Date().toISOString().split('T')[0];
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(today);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setDescripcion('');
    setMonto('');
    setFecha(today);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ descripcion, monto: Number(monto), fecha });
      reset();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Registrar gasto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              fullWidth
              inputProps={{ 'data-testid': 'gasto-descripcion' }}
            />
            <TextField
              label="Monto ($)"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 0.01, step: '0.01', 'data-testid': 'gasto-monto' }}
            />
            <TextField
              label="Fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={saving}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={saving} data-testid="gasto-guardar">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GastoFormDialog;
