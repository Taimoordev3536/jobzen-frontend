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
    // Development mode: Use test accounts
    const account = TEST_ACCOUNTS[data.email as keyof typeof TEST_ACCOUNTS];
    
    if (account && data.password === TEST_PASSWORD) {
      // Simulate successful login with test account
      const mockResponse: AuthResponse = {
        access_token: 'mock-access-token-' + account.role,
        refresh_token: 'mock-refresh-token-' + account.role,
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: account.email,
          name: account.name,
          role: account.role,
          status: UserStatus.ACTIVE,
          emailVerified: true,
          phoneVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', mockResponse.access_token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    // If not a test account, try the actual API
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    // For development, auto-create account
    const mockResponse: AuthResponse = {
      access_token: 'mock-access-token-' + data.role,
      refresh_token: 'mock-refresh-token-' + data.role,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.email.split('@')[0], // Use email username as default name
        role: data.role,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        phoneVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    
    // Store in localStorage
    localStorage.setItem('auth_token', mockResponse.access_token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    return mockResponse;
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
};
