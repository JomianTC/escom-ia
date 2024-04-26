import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { Administrator } from "./entities/admin.entity";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./entities/user.entity";
export declare class AuthService {
    private readonly userRepository;
    private readonly adminRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, adminRepository: Repository<Administrator>, jwtService: JwtService);
    loginUser(loginUserDto: LoginUserDto): Promise<{
        mensaje: string;
        usuario: User;
        token: string;
    }>;
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        mensaje: string;
        usuario: User;
    }>;
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        mensaje: string;
        admin: Administrator;
        token: string;
    }>;
    registerAdmin(registerAdminDto: RegisterAdminDto): Promise<{
        mensaje: string;
        admin: Administrator;
    }>;
    private createJWTToken;
}
