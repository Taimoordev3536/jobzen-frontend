export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  EMPLOYER = 'employer',
  CLIENT = 'client',
  WORKER = 'worker',
  INSPECTOR = 'inspector',
  UNASSIGNED = 'unassigned',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  profileImage?: string;
  avatarUrl?: string;
  provider?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
