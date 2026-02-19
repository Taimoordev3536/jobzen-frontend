import api from '@/lib/api';
import { LoginDto, RegisterDto, AuthResponse, UserRole, UserStatus } from '@/types/auth';

// Test accounts for development
const TEST_ACCOUNTS = {
  'admin@gmail.com': {
    role: UserRole.ADMIN,
    name: 'Admin User',
    email: 'admin@gmail.com'
  },
  'employer@gmail.com': {
    role: UserRole.EMPLOYER,
    name: 'Sarah Johnson',
    email: 'employer@gmail.com'
  },
  'worker@gmail.com': {
    role: UserRole.WORKER,
    name: 'John Smith',
    email: 'worker@gmail.com'
  },
  'client@gmail.com': {
    role: UserRole.CLIENT,
    name: 'Tech Corp',
    email: 'client@gmail.com'
  },
  'partner@gmail.com': {
    role: UserRole.PARTNER,
    name: 'Partner Solutions',
    email: 'partner@gmail.com'
  },
  'inspector@gmail.com': {
    role: UserRole.INSPECTOR,
    name: 'Inspector General',
    email: 'inspector@gmail.com'
  },
};

const TEST_PASSWORD = '12345678';

export const authService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    // Development mode: Use test accounts (Disabled for API testing)
    // const account = TEST_ACCOUNTS[data.email as keyof typeof TEST_ACCOUNTS];

    // if (account && data.password === TEST_PASSWORD) {
    //   // ... mock response ...
    // }

    // Try the actual API
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);

      // Store tokens
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);

      // Store tokens
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    // Try to call backend logout if available
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore error if backend is not available
    }
  },

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, password: string) {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/users/me');
    return response.data;
  },

  async updateProfile(data: {
    name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
  }) {
    const response = await api.patch('/users/profile', data);
    return response.data;
  },

  async createManagedUser(data: any) {
    const response = await api.post('/users/managed', data);
    return response.data;
  },

  async getManagedUsers(role?: UserRole) {
    const response = await api.get('/users/managed', { params: { role } });
    return response.data;
  },

  async deleteManagedUser(id: string) {
    const response = await api.delete(`/users/managed/${id}`);
    return response.data;
  },
};
