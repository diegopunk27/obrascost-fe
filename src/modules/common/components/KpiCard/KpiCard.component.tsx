import { Box, Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
}

const KpiCard = ({ title, value, subtitle, icon, color = 'primary.main' }: Props) => (
  <Card elevation={1} sx={{ height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      {icon && (
        <Box sx={{ color, mt: 0.5 }}>
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={0.5}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700} color={color} lineHeight={1.2} mt={0.5}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default KpiCard;
