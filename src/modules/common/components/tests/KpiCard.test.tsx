import KpiCard from '@common-components/KpiCard/KpiCard.component';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('KpiCard', () => {
  it('muestra el título y el valor', () => {
    render(<KpiCard title="Total obras" value={5} />);
    expect(screen.getByText('Total obras')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('muestra el subtítulo cuando se provee', () => {
    render(<KpiCard title="Obras" value={3} subtitle="activas este mes" />);
    expect(screen.getByText('activas este mes')).toBeInTheDocument();
  });

  it('no muestra subtítulo cuando no se provee', () => {
    render(<KpiCard title="Obras" value={3} />);
    expect(screen.queryByText('activas este mes')).not.toBeInTheDocument();
  });

  it('muestra el valor como string', () => {
    render(<KpiCard title="Presupuesto" value="$1.500.000" />);
    expect(screen.getByText('$1.500.000')).toBeInTheDocument();
  });

  it('renderiza el ícono cuando se provee', () => {
    const TestIcon = () => <span data-testid="test-icon">★</span>;
    render(<KpiCard title="Obras" value={1} icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('no renderiza contenedor de ícono cuando no se provee', () => {
    const { container } = render(<KpiCard title="Obras" value={1} />);
    expect(container.querySelectorAll('[data-testid]')).toHaveLength(0);
  });
});
