import GastoFormDialog from '@common-components/GastoFormDialog/GastoFormDialog.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('GastoFormDialog', () => {
  it('no muestra el dialog cuando open=false', () => {
    render(<GastoFormDialog open={false} obraId={1} onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.queryByText('Registrar gasto')).not.toBeInTheDocument();
  });

  it('muestra el dialog cuando open=true', () => {
    render(<GastoFormDialog open={true} obraId={1} onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.getByText('Registrar gasto')).toBeInTheDocument();
  });

  it('muestra los campos descripción, monto y fecha', () => {
    render(<GastoFormDialog open={true} obraId={1} onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.getByTestId('gasto-descripcion')).toBeInTheDocument();
    expect(screen.getByTestId('gasto-monto')).toBeInTheDocument();
  });

  it('llama onClose al hacer click en Cancelar', async () => {
    const onClose = vi.fn();
    render(<GastoFormDialog open={true} obraId={1} onClose={onClose} onSave={vi.fn()} />);

    await userEvent.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('llama onSave con los datos del formulario al hacer submit', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    render(<GastoFormDialog open={true} obraId={1} onClose={onClose} onSave={onSave} />);

    await userEvent.type(screen.getByTestId('gasto-descripcion'), 'Cemento');
    await userEvent.type(screen.getByTestId('gasto-monto'), '15000');
    await userEvent.click(screen.getByText('Guardar'));

    expect(onSave).toHaveBeenCalledOnce();
    const callArg = onSave.mock.calls[0][0];
    expect(callArg.descripcion).toBe('Cemento');
    expect(callArg.monto).toBe(15000);
  });
});
