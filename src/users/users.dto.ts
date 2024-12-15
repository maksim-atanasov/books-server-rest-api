import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
}

export type TUpdateUserDto = Partial<CreateUserDto>;
