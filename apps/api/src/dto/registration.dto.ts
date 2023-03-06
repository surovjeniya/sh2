import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, {
    message:
      'The password must contain one lowercase and one uppercase letter.',
  })
  @Length(9,100, {
    message: 'Password must be more than 9 characters',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  registered_from_url: string;
}
