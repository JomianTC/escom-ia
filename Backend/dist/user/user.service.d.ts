/// <reference types="multer" />
import { MailerService } from "@nestjs-modules/mailer";
import { Repository } from "typeorm";
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Administrator } from "../auth/entities/admin.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../auth/entities/user.entity";
export declare class UserService {
    private readonly userRepository;
    private readonly adminRepository;
    private readonly cloudinaryService;
    private readonly mailerService;
    constructor(userRepository: Repository<User>, adminRepository: Repository<Administrator>, cloudinaryService: CloudinaryService, mailerService: MailerService);
    findByEmail(email: string): Promise<User>;
    findByEmailUserAdmin(email: string): Promise<void>;
    resetPassword(email_recuperacion: string): Promise<{
        mensaje: string;
    }>;
    newPassword(email_recuperacion: string, contrasena: string): Promise<{
        mensaje: string;
    }>;
    findByEmailAdmin(email: string): Promise<Administrator>;
    updateProfilePicture(email: string, file: Express.Multer.File): Promise<{
        mensaje: string;
        foto_perfil: any;
    }>;
    updateUserInfo(email: string, updateUserDto: UpdateUserDto): Promise<{
        mensaje: string;
    }>;
    removeProfilePicture(email: string): Promise<{
        mensaje: string;
    }>;
    deletePicture(fileName: string): Promise<void>;
}
