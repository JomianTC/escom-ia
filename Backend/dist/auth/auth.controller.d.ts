import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { RegisterAdminDto } from "./dto/register-admin.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(loginUserDto: LoginUserDto): Promise<{
        mensaje: string;
        usuario: import("./entities/user.entity").User;
        token: string;
    }>;
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        mensaje: string;
        usuario: import("./entities/user.entity").User;
    }>;
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        mensaje: string;
        admin: import("./entities/admin.entity").Administrator;
        token: string;
    }>;
    registerAdmin(registerAdminDto: RegisterAdminDto): Promise<{
        mensaje: string;
        admin: import("./entities/admin.entity").Administrator;
    }>;
    checkAuth(): {
        message: string;
    };
}
