import type { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
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

const EstimacionPanel = ({ estimacion, estimando, onEstimar }: Props) => {
  const ajustePct = estimacion?.ajuste_recomendado_pct ?? null;
  const totalAjustado =
    ajustePct != null && estimacion
      ? estimacion.total_estimado * (1 + ajustePct / 100)
      : null;

  return (
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
          {/* Totals row */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* Heuristic total — always shown */}
            <Box sx={{ flex: 1, p: 2, bgcolor: 'primary.main', borderRadius: 2, color: 'white' }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {totalAjustado != null ? 'Base heurística' : 'Total estimado'}
              </Typography>
              <Typography variant="h4" fontWeight={700}>{fmt(estimacion.total_estimado)}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                ±{estimacion.margen_error_pct}% · {estimacion.fuente}
              </Typography>
            </Box>

            {/* AI-adjusted total — only when AI provided an adjustment */}
            {totalAjustado != null && (
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  bgcolor: 'secondary.main',
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
                  <AutoAwesomeIcon sx={{ fontSize: 14, opacity: 0.85 }} />
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>Total ajustado por IA</Typography>
                </Stack>
                <Typography variant="h4" fontWeight={700}>{fmt(totalAjustado)}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {ajustePct > 0 ? (
                    <TrendingUpIcon sx={{ fontSize: 14, opacity: 0.85 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 14, opacity: 0.85 }} />
                  )}
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    {ajustePct > 0 ? '+' : ''}{ajustePct}% recomendado
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>

          {estimacion.sugerencia_ia && (
            <Alert severity="info" icon={<AutoAwesomeIcon />}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>Análisis IA</Typography>
              {estimacion.sugerencia_ia}
            </Alert>
          )}

          {estimacion.alertas.length > 0 && (
            <Alert severity="warning">
              {estimacion.alertas.map((alerta, idx) => (
                <Typography key={idx} variant="body2">{alerta}</Typography>
              ))}
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
};

export default EstimacionPanel;
