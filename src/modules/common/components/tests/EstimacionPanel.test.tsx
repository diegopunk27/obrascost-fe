import EstimacionPanel from '@common-components/EstimacionPanel/EstimacionPanel.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';

const mockEstimacion: EstimacionResult = {
  total_estimado: 3_000_000,
  desglose_por_rubro: { Estructura: 2_000_000, Pintura: 500_000 },
  margen_error_pct: 15,
  fuente: 'heuristica',
  alertas: [],
};

const mockEstimacionConIA: EstimacionResult = {
  ...mockEstimacion,
  fuente: 'ia',
  sugerencia_ia: 'Considerar aumento en terminaciones.',
  ajuste_recomendado_pct: 5,
  alertas: ['Costo elevado para la región'],
};

describe('EstimacionPanel', () => {
  it('renderiza los botones Estimar y Estimar con IA', () => {
    render(<EstimacionPanel estimacion={null} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByTestId('btn-estimar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-estimar-ia')).toBeInTheDocument();
  });

  it('click en Estimar llama onEstimar con false', async () => {
    const onEstimar = vi.fn();
    render(<EstimacionPanel estimacion={null} estimando={false} onEstimar={onEstimar} />);

    await userEvent.click(screen.getByTestId('btn-estimar'));

    expect(onEstimar).toHaveBeenCalledWith(false);
  });

  it('click en Estimar con IA llama onEstimar con true', async () => {
    const onEstimar = vi.fn();
    render(<EstimacionPanel estimacion={null} estimando={false} onEstimar={onEstimar} />);

    await userEvent.click(screen.getByTestId('btn-estimar-ia'));

    expect(onEstimar).toHaveBeenCalledWith(true);
  });

  it('botones deshabilitados cuando estimando=true', () => {
    render(<EstimacionPanel estimacion={null} estimando={true} onEstimar={vi.fn()} />);
    expect(screen.getByTestId('btn-estimar')).toBeDisabled();
    expect(screen.getByTestId('btn-estimar-ia')).toBeDisabled();
  });

  it('no muestra resultados cuando estimacion es null', () => {
    render(<EstimacionPanel estimacion={null} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.queryByText('Total estimado')).not.toBeInTheDocument();
  });

  it('muestra total estimado cuando hay estimacion', () => {
    render(<EstimacionPanel estimacion={mockEstimacion} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByText('Total estimado')).toBeInTheDocument();
  });

  it('muestra el desglose por rubros', () => {
    render(<EstimacionPanel estimacion={mockEstimacion} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByText('Estructura')).toBeInTheDocument();
    expect(screen.getByText('Pintura')).toBeInTheDocument();
  });

  it('muestra alertas cuando existen', () => {
    render(<EstimacionPanel estimacion={mockEstimacionConIA} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByText('Costo elevado para la región')).toBeInTheDocument();
  });

  it('muestra sugerencia IA cuando está presente', () => {
    render(<EstimacionPanel estimacion={mockEstimacionConIA} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByText('Análisis IA')).toBeInTheDocument();
    expect(screen.getByText('Considerar aumento en terminaciones.')).toBeInTheDocument();
  });

  it('muestra fuente de la estimacion', () => {
    render(<EstimacionPanel estimacion={mockEstimacion} estimando={false} onEstimar={vi.fn()} />);
    expect(screen.getByText(/heuristica/i)).toBeInTheDocument();
  });
});
