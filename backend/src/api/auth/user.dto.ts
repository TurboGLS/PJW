import { IsString, IsUrl, IsEmail, IsStrongPassword } from "class-validator";

export class AddUserDTO {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEmail()
    username!: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8
    })
    password!: string;
}