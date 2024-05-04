import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Administrator } from "../auth/entities/admin.entity";
import { BcryptAdapter } from "../config/bcrypt.adapter";
import { HandleErrors } from "../common/handle-errors";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../auth/entities/user.entity";

@Injectable()
export class UserService {

	constructor(
		@InjectRepository( User )
		private readonly userRepository: Repository<User>,
		@InjectRepository( Administrator )
		private readonly adminRepository: Repository<Administrator>,
		private readonly cloudinaryService: CloudinaryService,
		private readonly mailerService: MailerService,
	) {}

	async findByEmail( email: string ) {
		
		try {
			const userFound = await this.userRepository.findOne({ 
				where: { email_academico: email.toLowerCase() }
			});

			if ( !userFound )
				throw new BadRequestException({ mensaje: "Usuario no encontrado" });

			return userFound;

		} catch ( error ) { HandleErrors( error ); }
	}

	async findByEmailUserAdmin( email: string ) {
		
		try {
			const userFound = await this.userRepository.findOne({ 
				where: { email_academico: email.toLowerCase() }
			});

			const adminFound = await this.adminRepository.findOne({ 
				where: { email: email.toLowerCase() }
			});

			if ( !userFound && !adminFound )
				throw new BadRequestException({ mensaje: "Usuario o Administrador no encontrado" });

			return;

		} catch ( error ) { HandleErrors( error ); }
	}

	async resetPassword( email_recuperacion: string ) {

		try {

			const userFound = await this.userRepository.findOne({ 
				where: { email_recuperacion }
			});

			if ( !userFound )
				throw new BadRequestException({ mensaje: "Email de recuperacion no registrado" });

			await this.mailerService.sendMail({
				to: email_recuperacion,
				from: {
					name: "No Reply",
					address: `${ process.env.MAILER_EMAIL }`,
				},
				subject: "Restablecimiento de contraseña",
				template: "email-template",
			});

			return { mensaje: "Correo de recuperación enviado correctamente" }

		} catch ( error ) { HandleErrors( error ); }
	}

	async newPassword( email_recuperacion: string, contrasena: string ) {

		try {

			const userFound = await this.userRepository.findOne({
				where: { email_recuperacion }
			});
	
			if ( !userFound )
				throw new BadRequestException({ mensaje: "Usuario no encontrado" });

			await this.userRepository.update( userFound.id, { contrasena: BcryptAdapter.hash( contrasena ) })
	
			return { mensaje: "Contraseña actualizada correctamente" };

		} catch ( error ) { HandleErrors( error ); }
	}

	async findByEmailAdmin( email: string ) {
		
		try {

			const adminFound = await this.adminRepository.findOne({ 
				where: { email: email.toLowerCase() }
			});

			if ( !adminFound )
				throw new BadRequestException({ mensaje: "Administrador no encontrado" });

			return adminFound;

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateProfilePicture( email: string, file: Express.Multer.File ) {

		try {

			const userFound = await this.userRepository.findOne({ 
				where: { email_academico: email }
			});

			if ( !userFound )
				throw new BadRequestException({ mensaje: "Usuario no encontrado" });

			await this.deletePicture( userFound.id );

			if ( !file )
				throw new BadRequestException({ mensaje: "No se subio ningun archivo" });

			const fileExtension = file.mimetype.split( "/" )[ 1 ];
			const validExtensions = [ "jpg", "png", "jpeg", "gif" ];

			if ( !validExtensions.includes( fileExtension ) )
				throw new BadRequestException({ mensaje: "Tipo de archivo no permitido" });

			if ( file.size > 2097152 )
				throw new BadRequestException({ mensaje: "El archivo es mayor a 2MB" });

			file.originalname = userFound.id;

			const { secure_url } = await this.cloudinaryService.uploadImage( file );

			if ( !secure_url )
				throw new BadRequestException( "Error subiendo la imagen" );

			await this.userRepository.update( userFound.id, { foto_perfil: secure_url });

			return {
				mensaje: "Foto recibida correctamente",
				foto_perfil: secure_url
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateUserInfo( email: string, updateUserDto: UpdateUserDto ) {

		const { email_academico = "", email_recuperacion = "" } = updateUserDto;

		try {

			const userFound = await this.findByEmail( email );

			const userFoundEmailAcademico = await this.userRepository.findOne({ 
				where: { email_academico }
			});

			if ( userFoundEmailAcademico )
				throw new BadRequestException({ mensaje: "Email academico ya registrado" });

			const userFoundEmailRecuperacion = await this.userRepository.findOne({ 
				where: { email_recuperacion }
			});

			if ( userFoundEmailRecuperacion )
				throw new BadRequestException({ mensaje: "Email de recuperacion ya registrado" });

			await this.userRepository.update( userFound.id, updateUserDto );

			return {
				mensaje: "Información actualizada correctamente"
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async removeProfilePicture( email: string ) {

		try {

			const userFound = await this.userRepository.findOne({ 
				where: { email_academico: email }
			});

			if ( !userFound )
				throw new BadRequestException({ mensaje: "Usuario no encontrado" });

			await this.userRepository.update( userFound.id, { foto_perfil: "" });

			await this.deletePicture( userFound.id );

			return {
				mensaje: "Foto eliminada correctamente"
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async deletePicture( fileName: string ) {
		await this.cloudinaryService.deleteImage( fileName );
	}
}
