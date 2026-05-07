import AppLayout from '@common-components/AppLayout/AppLayout.component';
import { AppContext } from '@global-contexts/AppContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { CurrentUser } from '@common-interfaces/Auth.interface';

const mockUser: CurrentUser = { id: 1, email: 'test@obrascost.com', role_id: 1, role_name: 'admin' };

const renderWithProviders = (logout = vi.fn(), user: CurrentUser | null = mockUser) => {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AppContext.Provider value={{ token: 'tok', user, login: vi.fn(), logout }}>
        <AppLayout>
          <div data-testid="child-content">Contenido principal</div>
        </AppLayout>
      </AppContext.Provider>
    </MemoryRouter>,
  );
};

describe('AppLayout', () => {
  it('renderiza el título ObrasCost en el sidebar', () => {
    renderWithProviders();
    expect(screen.getByText('ObrasCost')).toBeInTheDocument();
  });

  it('muestra el email del usuario en el sidebar', () => {
    renderWithProviders();
    expect(screen.getByText('test@obrascost.com')).toBeInTheDocument();
  });

  it('renderiza los ítems de navegación', () => {
    renderWithProviders();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
  });

  it('renderiza el contenido hijo', () => {
    renderWithProviders();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('llama a logout al hacer click en el botón de cierre de sesión', async () => {
    const logout = vi.fn();
    renderWithProviders(logout);

    await userEvent.click(screen.getByTitle('Cerrar sesión'));

    expect(logout).toHaveBeenCalledOnce();
  });

  it('no muestra email cuando user es null', () => {
    renderWithProviders(vi.fn(), null);
    expect(screen.queryByText('test@obrascost.com')).not.toBeInTheDocument();
  });
});
