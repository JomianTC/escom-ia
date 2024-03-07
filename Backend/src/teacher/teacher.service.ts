import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { HandleErrors } from "../common/handle-errors";
import { Teacher } from "./entities/teacher.entity";

@Injectable()
export class TeacherService {

	constructor(
		@InjectRepository( Teacher )
		private readonly teacherRepository: Repository<Teacher>,
		private readonly cloudinaryService: CloudinaryService
	){}

	async create( createTeacherDto: CreateTeacherDto ) {

		const { email, contacto } = createTeacherDto;
		
		try {

			const teacherFound = await this.teacherRepository.find({ 
				where: [ { email }, { contacto } ]
			});

			if ( teacherFound ){

				teacherFound.forEach( teacher => {

					if ( teacher.email === email )
						throw new BadRequestException({ message: "El email ya está registrado" });

					if ( teacher.contacto === contacto )
						throw new BadRequestException({ message: "El contacto ya está registrado" });
				}); 
			}

			const newTeacher = this.teacherRepository.create( createTeacherDto );
			await this.teacherRepository.save( newTeacher );

			return {
				message: "Profesor registrado exitosamente",
				teacher: newTeacher
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( paginationDto: PaginationDto ) {

		const { limit = 10, page = 1 } = paginationDto;

		try {
			
			const teachersFound = await this.teacherRepository.find({ 
				skip: ( page - 1 ) * limit,
				take: limit
			});

			if ( !teachersFound )
				throw new BadRequestException({ message: "No hay profesores registrados" });
		
			const totalTeachers = await this.teacherRepository.count();
				
			return {
				teachers: teachersFound,
				total: totalTeachers
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

			return teacherFound;

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateTeacherDto: UpdateTeacherDto ) {

		const { email = "", contacto = "" } = updateTeacherDto;

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

			const teacherByUniques = await this.teacherRepository.find({ 
				where: [ { email }, { contacto } ]
			});

			if ( teacherByUniques ){

				teacherByUniques.forEach( teacher => {

					if ( teacher.id === teacherFound.id )
						return;

					if ( teacher.email === email )
						throw new BadRequestException({ message: "El email ya está registrado" });

					if ( teacher.contacto === contacto )
						throw new BadRequestException({ message: "El contacto ya está registrado" });
				}); 
			}

			// ? Aqui actualizamos el profesor pero sin regresar una entidad
			// const newTeacher = await this.teacherRepository.update( { id }, updateTeacherDto );

			// ? Aqui actualizamos el profesor y regresamos una entidad, el orden de los parametros
			// ? es importante, el primero es lo que no cambia, y lo segundo lo que cambia
			const newTeacher = await this.teacherRepository.save({
				...teacherFound,
				...updateTeacherDto
			});

			return {
				message: "Profesor actualizado exitosamente",
				teacher: newTeacher
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

			await this.teacherRepository.delete({ id });

			return { message: "Profesor eliminado exitosamente" };

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateProfilePicture( id: string, file: Express.Multer.File ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

			await this.deletePicture( teacherFound.id );

			if ( !file )
				throw new BadRequestException({ message: "No se subio ningun archivo" });

			const fileExtension = file.mimetype.split( "/" )[ 1 ];
			const validExtensions = [ "jpg", "png", "jpeg", "gif" ];

			if ( !validExtensions.includes( fileExtension ) )
				throw new BadRequestException({ message: "Tipo de archivo no permitido" });

			if ( file.size > 2097152 )
				throw new BadRequestException({ message: "El archivo es mayor a 2MB" });

			file.originalname = teacherFound.id;

			const { secure_url } = await this.cloudinaryService.uploadImage( file );

			if ( !secure_url )
				throw new BadRequestException( "Error subiendo la imagen" );

			await this.teacherRepository.update( teacherFound.id, { foto_perfil: secure_url });

			return {
				message: "Foto recibida correctamente",
				foto_perfil: secure_url
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async removeProfilePicture( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id }); 

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

			await this.teacherRepository.update( teacherFound.id, { foto_perfil: "" });

			await this.deletePicture( teacherFound.id );

			return {
				message: "Foto eliminada correctamente"
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async deletePicture( fileName: string ) {
		await this.cloudinaryService.deleteImage( fileName );
	}
}
