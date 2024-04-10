import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";

import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { BcryptAdapter } from "../config/bcrypt.adapter";
import { Administrator } from "./entities/admin.entity";
import { HandleErrors } from "../common/handle-errors";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository( User )
		private readonly userRepository: Repository<User>,
		@InjectRepository( Administrator )
		private readonly adminRepository: Repository<Administrator>,
		private readonly jwtService: JwtService,
	) { }

	async loginUser( loginUserDto: LoginUserDto ) {

		const { boleta, contrasena } = loginUserDto;

		try {
			
			const userFound = await this.userRepository.findOne({
				where: { boleta }
			});
	
			if ( !userFound )
				throw new BadRequestException({ mensaje: "Usuario no encontrado" });
	
			if ( !BcryptAdapter.compare( contrasena, userFound.contrasena ) )
				throw new UnauthorizedException({ mensaje: "Contraseña incorrecta" });
	
			delete userFound.contrasena;
	
			return {
				mensaje: "Inicio de sesión exitoso!",
				usuario: userFound,
				token: this.createJWTToken({ email: userFound.email_academico }),
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async registerUser( registerUserDto: RegisterUserDto ) {

		const { contrasena, ...userData } = registerUserDto;

		try {

			const userFound = await this.userRepository.findOne({
				where: { boleta: userData.boleta }
			});
	
			if ( userFound )
				throw new BadRequestException({ mensaje: "Usuario ya registrado" });
			
			const user = this.userRepository.create({
				...userData,
				contrasena: BcryptAdapter.hash( contrasena )
			});
	
			await this.userRepository.save( user );
			delete user.contrasena;
	
			return {
				mensaje: "Usuario registrado con exito!",
				usuario: user,
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async loginAdmin( loginAdminDto: LoginAdminDto ) {

		const { email, identificador } = loginAdminDto;

		try {
			
			const adminFound = await this.adminRepository.findOne({
				where: { email }
			});
	
			if ( !adminFound )
				throw new BadRequestException({ mensaje: "Administrador no encontrado" });
	
			if ( !BcryptAdapter.compare( identificador, adminFound.identificador ) )
				throw new UnauthorizedException({ mensaje: "Identificador incorrecto" });
	
			delete adminFound.identificador;
	
			return {
				mensaje: "Inicio de sesión exitoso!",
				admin: adminFound,
				token: this.createJWTToken({ email }),
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async registerAdmin( registerAdminDto: RegisterAdminDto ) {

		const { identificador, ...adminData } = registerAdminDto;

		try {

			const adminFound = await this.adminRepository.findOne({
				where: { email: adminData.email }
			});
	
			if ( adminFound )
				throw new BadRequestException({ mensaje: "Administrador ya registrado" });
			
			const admin = this.adminRepository.create({
				...adminData,
				identificador: BcryptAdapter.hash( identificador )
			});
	
			await this.adminRepository.save( admin );
			delete admin.identificador;
	
			return {
				mensaje: "Administrador registrado con exito!",
				admin,
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	private createJWTToken( payload: JwtPayload ) {
		const token = this.jwtService.sign( payload );
		return token;
	}
}
