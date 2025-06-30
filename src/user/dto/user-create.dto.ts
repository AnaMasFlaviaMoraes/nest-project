export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'SUPERUSER' | 'ADMIN' | 'USER';
}
