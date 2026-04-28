import { AppLayout } from '@common-components/index';
import { DashboardPage, ObraDetailPage, ConfiguracionPage } from '@global-pages/index';
import { Navigate, Route, Routes } from 'react-router';

const CommonRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/obras/:id" element={<ObraDetailPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default CommonRoutes;
