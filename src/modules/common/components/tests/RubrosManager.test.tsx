import RubrosManager from '@common-components/RubrosManager/RubrosManager.component';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Rubro } from '@common-interfaces/Rubro.interface';

vi.mock('@common-hooks/index', () => ({
  useRubros: vi.fn(),
}));

import { useRubros } from '@common-hooks/index';

const mockRubros: Array<Rubro> = [
  { id: 1, nombre: 'Estructura', descripcion: 'Hormigón', costo_referencia_m2: 35000, activo: true },
  { id: 2, nombre: 'Pintura', descripcion: 'Paredes interiores', costo_referencia_m2: 8000, activo: false },
];

const defaultHook = () => ({
  rubros: mockRubros,
  isLoading: false,
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
});

describe('RubrosManager', () => {
  it('muestra CircularProgress mientras carga', () => {
    vi.mocked(useRubros).mockReturnValue({ ...defaultHook(), isLoading: true, rubros: [] });
    render(<RubrosManager />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('muestra los rubros en la tabla', () => {
    vi.mocked(useRubros).mockReturnValue(defaultHook());
    render(<RubrosManager />);
    expect(screen.getByText('Estructura')).toBeInTheDocument();
    expect(screen.getByText('Pintura')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay rubros', () => {
    vi.mocked(useRubros).mockReturnValue({ ...defaultHook(), rubros: [] });
    render(<RubrosManager />);
    expect(screen.getByText('No hay rubros cargados')).toBeInTheDocument();
  });

  it('el botón Nuevo rubro abre el dialog', async () => {
    vi.mocked(useRubros).mockReturnValue(defaultHook());
    render(<RubrosManager />);

    await userEvent.click(screen.getByTestId('btn-nuevo-rubro'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('input-rubro-nombre')).toBeInTheDocument();
  });

  it('el botón eliminar llama a remove con el id del rubro', async () => {
    const remove = vi.fn();
    vi.mocked(useRubros).mockReturnValue({ ...defaultHook(), remove });
    render(<RubrosManager />);

    await userEvent.click(screen.getByTestId('btn-del-rubro-1'));

    expect(remove).toHaveBeenCalledWith(1);
  });

  it('el botón editar abre el dialog con los datos del rubro', async () => {
    vi.mocked(useRubros).mockReturnValue(defaultHook());
    render(<RubrosManager />);

    await userEvent.click(screen.getByTestId('btn-edit-rubro-1'));

    expect(screen.getByText('Editar rubro')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Estructura')).toBeInTheDocument();
  });

  it('el switch activo llama a update con activo invertido', async () => {
    const update = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useRubros).mockReturnValue({ ...defaultHook(), update });
    render(<RubrosManager />);

    const switchEl = screen.getByTestId('switch-rubro-1');
    const switchInput = switchEl.querySelector('input') as HTMLInputElement;
    fireEvent.click(switchInput);

    expect(update).toHaveBeenCalledWith(1, { activo: false });
  });
});
