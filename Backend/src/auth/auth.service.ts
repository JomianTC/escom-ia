import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";

import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { RegisterUserDto } from "./dto/register-user.dto";
import { BcryptAdapter } from "../config/bcrypt.adapter";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository( User )
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) { }

	async login( loginUserDto: LoginUserDto ) {

		const { email_academico, boleta } = loginUserDto;

		const userFound = await this.userRepository.findOne({
			where: { email_academico }
		});

		if ( !userFound )
			throw new UnauthorizedException({ message: "Usuario no encontrado" });

		if ( !BcryptAdapter.compare( boleta, userFound.boleta ) )
			throw new UnauthorizedException({ message: "Boleta incorrecta" });

		delete userFound.boleta;

		return {
			message: "Inicio de sesión exitoso!",
			user: userFound,
			token: this.createJWTToken({ email_academico }),
		};
	}

	async register( registerUserDto: RegisterUserDto ) {

		const { boleta, ...userData } = registerUserDto;

		const user = this.userRepository.create({
			...userData,
			boleta: BcryptAdapter.hash( boleta )
		});

		await this.userRepository.save( user );
		delete user.boleta;

		return {
			message: "Usuario registrado con exito!",
			user,
		};
	}

	private createJWTToken( payload: JwtPayload ) {
		const token = this.jwtService.sign(payload);
		return token;
	}
}
