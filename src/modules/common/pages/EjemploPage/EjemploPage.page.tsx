import { Ejemplo, EjemploContext } from '@common-contexts/EjemploContext';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useContext, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

/** Fila de demostración para AG Grid (sin acoplar a capas del portal como GenericTable). */
interface DemoRow {
  id: number;
  name: string;
  role: string;
}

const EjemploPage = () => {
  const {
    data,
    isFetchSlow,
    isValidating,
    handleDelete,
    handlePatch,
    handlePost,
    handlePut,
  } = useContext(EjemploContext);

  const demoColumnDefs = useMemo<Array<ColDef<DemoRow>>>(
    () => [
      { field: 'id', headerName: 'ID', maxWidth: 90 },
      { field: 'name', headerName: 'Nombre', flex: 1 },
      { field: 'role', headerName: 'Rol', flex: 1 },
    ],
    [],
  );

  const demoRowData = useMemo<Array<DemoRow>>(
    () => [
      { id: 1, name: 'Ejemplo A', role: 'Admin' },
      { id: 2, name: 'Ejemplo B', role: 'Usuario' },
    ],
    [],
  );

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Página ejemplo
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
          <Button variant="outlined" size="small" onClick={handleDelete}>
            DELETE
          </Button>
          <Button variant="outlined" size="small" onClick={handlePatch}>
            PATCH
          </Button>
          <Button variant="outlined" size="small" onClick={handlePost}>
            POST
          </Button>
          <Button variant="outlined" size="small" onClick={handlePut}>
            PUT
          </Button>
        </Stack>
        <Box>
          {isValidating ? (
            <Typography variant="body2" color="text.secondary">
              Cargando...
            </Typography>
          ) : null}
          {isFetchSlow ? (
            <Typography variant="body2" color="warning.main">
              Tenemos problemas con la carga.
            </Typography>
          ) : null}
          {data && Array.isArray(data)
            ? data.map((item: Ejemplo) => (
                <Typography key={item.id} variant="body2" component="p">
                  {item.title}
                </Typography>
              ))
            : null}
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          AG Grid (mínimo)
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          En proyectos grandes suele usarse un wrapper tipo GenericTable del portal JetSmart; aquí solo se
          muestran imports de tema y una grilla básica.
        </Typography>
        <div className="ag-theme-quartz" style={{ width: '100%', height: 220 }}>
          <AgGridReact<DemoRow>
            rowData={demoRowData}
            columnDefs={demoColumnDefs}
            defaultColDef={{ sortable: true, resizable: true }}
            domLayout="normal"
          />
        </div>
      </Box>
    </Stack>
  );
};

export default EjemploPage;
