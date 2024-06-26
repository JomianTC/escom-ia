import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { HandleErrors } from "../common/handle-errors";
import { Teacher } from "./entities/teacher.entity";
import { Coment } from "src/coment/entities/coment.entity";

@Injectable()
export class TeacherService {

	constructor(
		@InjectRepository( Teacher )
		private readonly teacherRepository: Repository<Teacher>,
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
						throw new BadRequestException({ mensaje: "El email ya está registrado" });

					if ( teacher.contacto === contacto )
						throw new BadRequestException({ mensaje: "El contacto ya está registrado" });
				}); 
			}

			const newTeacher = this.teacherRepository.create( createTeacherDto );
			await this.teacherRepository.save( newTeacher );

			return {
				mensaje: "Profesor registrado exitosamente",
				profesor: newTeacher
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
				throw new BadRequestException({ mensaje: "No hay profesores registrados" });
		
			const totalTeachers = await this.teacherRepository.count();
				
			return {
				profesores: teachersFound,
				total: totalTeachers
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ mensaje: "Profesor no registrado" });

			return teacherFound;

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( id: string, updateTeacherDto: UpdateTeacherDto ) {

		const { email = "", contacto = "" } = updateTeacherDto;

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ mensaje: "Profesor no registrado" });

			const teacherByUniques = await this.teacherRepository.find({ 
				where: [ { email }, { contacto } ]
			});

			if ( teacherByUniques ){

				teacherByUniques.forEach( teacher => {

					if ( teacher.id === teacherFound.id )
						return;

					if ( teacher.email === email )
						throw new BadRequestException({ mensaje: "El email ya está registrado" });

					if ( teacher.contacto === contacto )
						throw new BadRequestException({ mensaje: "El contacto ya está registrado" });
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
				mensaje: "Profesor actualizado exitosamente",
				profesor: newTeacher
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ mensaje: "Profesor no registrado" });

			await this.teacherRepository.delete({ id });

			return { mensaje: "Profesor eliminado exitosamente" };

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateProfilePicture( id: string, url: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ mensaje: "Profesor no registrado" });

			await this.teacherRepository.update( teacherFound.id, { foto_perfil: url });

			return {
				mensaje: "Foto recibida correctamente",
				foto_perfil: url
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async removeProfilePicture( id: string ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id }); 

			if ( !teacherFound )
				throw new BadRequestException({ mensaje: "Profesor no registrado" });

			await this.teacherRepository.update( teacherFound.id, { foto_perfil: "" });

			return {
				mensaje: "Foto eliminada correctamente"
			};

		} catch ( error ) { HandleErrors( error ); }
	}

	async updateScore( teacherID: string, coments: Coment[], total: number ) {

		try {
			
			const teacherFound = await this.findOne( teacherID );

			let score = 0;

			coments.forEach( coment => score += coment.puntuacion );

			score = score / total;

			if ( score > 5 )
				throw new InternalServerErrorException({ mensaje: "Error al actualizar la puntuacion" });

			await this.teacherRepository.update( teacherFound.id, { calificacion: score });

		} catch ( error ) { HandleErrors( error ); }

	}
}
