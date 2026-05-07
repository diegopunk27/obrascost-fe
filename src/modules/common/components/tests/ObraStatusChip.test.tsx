import ObraStatusChip from '@common-components/ObraStatusChip/ObraStatusChip.component';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ObraStatusChip', () => {
  it('muestra Borrador para estado borrador', () => {
    render(<ObraStatusChip estado="borrador" />);
    expect(screen.getByText('Borrador')).toBeInTheDocument();
  });

  it('muestra En progreso para estado en_progreso', () => {
    render(<ObraStatusChip estado="en_progreso" />);
    expect(screen.getByText('En progreso')).toBeInTheDocument();
  });

  it('muestra Pausada para estado pausada', () => {
    render(<ObraStatusChip estado="pausada" />);
    expect(screen.getByText('Pausada')).toBeInTheDocument();
  });

  it('muestra Finalizada para estado finalizada', () => {
    render(<ObraStatusChip estado="finalizada" />);
    expect(screen.getByText('Finalizada')).toBeInTheDocument();
  });

  it('muestra Cancelada para estado cancelada', () => {
    render(<ObraStatusChip estado="cancelada" />);
    expect(screen.getByText('Cancelada')).toBeInTheDocument();
  });
});
