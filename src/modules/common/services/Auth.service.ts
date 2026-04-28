import { CurrentUser, LoginRequest, TokenResponse } from '@common-interfaces/Auth.interface';
import { getData, postData } from './Services';

const TOKEN_KEY = 'obrascost_token';

export class AuthService {
  async login(body: LoginRequest): Promise<TokenResponse> {
    const res = await postData<LoginRequest, TokenResponse>('/auth/login', body);
    localStorage.setItem(TOKEN_KEY, res.access_token);
    return res;
  }

  async getMe(): Promise<CurrentUser> {
    return getData<CurrentUser>('/auth/me');
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}

export const authService = new AuthService();
