export class UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'SUPERUSER' | 'ADMIN' | 'USER';
  password?: string; 
}
