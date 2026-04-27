import { EjemploProvider } from '@common-contexts/EjemploContext';
import { EjemploPage } from '@common-pages/EjemploPage';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Proyecto inicial con React y Vite
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Boilerplate con TypeScript, Material-UI, SWR y AG Grid (ejemplo en la sección inferior).
      </Typography>
      <EjemploProvider>
        <EjemploPage />
      </EjemploProvider>
    </Container>
  );
};

export default HomePage;
