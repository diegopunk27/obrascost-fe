import { Chip } from '@mui/material';
import type { EstadoObra } from '@common-interfaces/Obra.interface';

const CONFIG: Record<EstadoObra, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  borrador: { label: 'Borrador', color: 'default' },
  en_progreso: { label: 'En progreso', color: 'info' },
  pausada: { label: 'Pausada', color: 'warning' },
  finalizada: { label: 'Finalizada', color: 'success' },
  cancelada: { label: 'Cancelada', color: 'error' },
};

interface Props {
  estado: EstadoObra;
}

const ObraStatusChip = ({ estado }: Props) => {
  const { label, color } = CONFIG[estado] ?? { label: estado, color: 'default' };
  return <Chip label={label} color={color} size="small" />;
};

export default ObraStatusChip;
