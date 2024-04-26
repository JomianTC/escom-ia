/// <reference types="multer" />
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findByEmail(email: string): Promise<import("../auth/entities/user.entity").User>;
    resetPassword(email_recuperacion: string): Promise<{
        mensaje: string;
    }>;
    newPassword(email_recuperacion: string, contrasena: string): Promise<{
        mensaje: string;
    }>;
    updateUser(email: string, updateUserDto: UpdateUserDto): Promise<{
        mensaje: string;
    }>;
    update(email: string, file: Express.Multer.File): Promise<{
        mensaje: string;
        foto_perfil: any;
    }>;
    remove(email: string): Promise<{
        mensaje: string;
    }>;
}
