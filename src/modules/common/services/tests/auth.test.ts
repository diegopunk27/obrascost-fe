import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Services', () => ({
  getData: vi.fn(),
  postData: vi.fn(),
  patchData: vi.fn(),
  deleteData: vi.fn(),
}));

import * as Services from '@common-services/Services';
import { AuthService } from '@common-services/Auth.service';

const TOKEN_KEY = 'obrascost_token';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('llama a postData con credenciales y retorna TokenResponse', async () => {
      const tokenRes = { access_token: 'tok123', token_type: 'bearer' };
      vi.mocked(Services.postData).mockResolvedValue(tokenRes);

      const result = await service.login({ email: 'a@b.com', password: '123' });

      expect(Services.postData).toHaveBeenCalledWith('/auth/login', { email: 'a@b.com', password: '123' });
      expect(result.access_token).toBe('tok123');
    });

    it('guarda el token en localStorage', async () => {
      vi.mocked(Services.postData).mockResolvedValue({ access_token: 'saved', token_type: 'bearer' });

      await service.login({ email: 'a@b.com', password: 'pass' });

      expect(localStorage.getItem(TOKEN_KEY)).toBe('saved');
    });
  });

  describe('getMe', () => {
    it('llama a getData con /auth/me', async () => {
      const user = { id: 1, email: 'a@b.com', role_id: 1, role_name: 'admin' };
      vi.mocked(Services.getData).mockResolvedValue(user);

      const result = await service.getMe();

      expect(Services.getData).toHaveBeenCalledWith('/auth/me');
      expect(result.email).toBe('a@b.com');
    });
  });

  describe('logout', () => {
    it('elimina el token de localStorage', () => {
      localStorage.setItem(TOKEN_KEY, 'tok');
      service.logout();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });
  });

  describe('getToken', () => {
    it('retorna null cuando no hay token', () => {
      expect(service.getToken()).toBeNull();
    });

    it('retorna el token cuando está guardado', () => {
      localStorage.setItem(TOKEN_KEY, 'stored');
      expect(service.getToken()).toBe('stored');
    });
  });
});
