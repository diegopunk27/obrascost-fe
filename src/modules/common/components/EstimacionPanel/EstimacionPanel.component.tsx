import type { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalculateIcon from '@mui/icons-material/Calculate';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

interface Props {
  estimacion: EstimacionResult | null;
  estimando: boolean;
  onEstimar: (conIa: boolean) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const EstimacionPanel = ({ estimacion, estimando, onEstimar }: Props) => (
  <Box>
    <Stack direction="row" spacing={2} mb={3}>
      <Button
        variant="outlined"
        startIcon={estimando ? <CircularProgress size={16} /> : <CalculateIcon />}
        onClick={() => onEstimar(false)}
        disabled={estimando}
        data-testid="btn-estimar"
      >
        Estimar
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={estimando ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
        onClick={() => onEstimar(true)}
        disabled={estimando}
        data-testid="btn-estimar-ia"
      >
        Estimar con IA
      </Button>
    </Stack>

    {estimacion && (
      <Stack spacing={2}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: 2, color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>Total estimado</Typography>
          <Typography variant="h4" fontWeight={700}>{fmt(estimacion.total_estimado)}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Margen de error: ±{estimacion.margen_error_pct}% · Fuente: {estimacion.fuente}
          </Typography>
        </Box>

        {estimacion.sugerencia_ia && (
          <Alert severity="info" icon={<AutoAwesomeIcon />}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>Sugerencia IA</Typography>
            {estimacion.sugerencia_ia}
            {estimacion.ajuste_recomendado_pct != null && (
              <Typography variant="caption" display="block" mt={0.5}>
                Ajuste recomendado: {estimacion.ajuste_recomendado_pct > 0 ? '+' : ''}{estimacion.ajuste_recomendado_pct}%
              </Typography>
            )}
          </Alert>
        )}

        {estimacion.alertas.length > 0 && (
          <Alert severity="warning">
            {estimacion.alertas.map((a, i) => <Typography key={i} variant="body2">{a}</Typography>)}
          </Alert>
        )}

        <Typography variant="subtitle2" color="text.secondary">Desglose por rubro</Typography>
        <Divider />
        <List dense disablePadding>
          {Object.entries(estimacion.desglose_por_rubro).map(([nombre, monto]) => (
            <ListItem key={nombre} disableGutters sx={{ py: 0.5 }}>
              <ListItemText primary={nombre} />
              <Typography variant="body2" fontWeight={600}>{fmt(monto)}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    )}
  </Box>
);

export default EstimacionPanel;
