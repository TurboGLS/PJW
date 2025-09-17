import { IsString, IsUrl, IsEmail, IsStrongPassword } from "class-validator";

export class AddUserDTO {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8
    })
    password!: string;
}