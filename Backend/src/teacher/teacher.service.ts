import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { HandleErrors } from "../common/handle-errors";
import { Teacher } from "./entities/teacher.entity";

@Injectable()
export class TeacherService {

	constructor(
		@InjectRepository( Teacher )
		private readonly teacherRepository: Repository<Teacher>
	){}

	async create( createTeacherDto: CreateTeacherDto ) {
		
		try {

			const teacherFound = await this.teacherRepository.findOne({ 
				where: { email: createTeacherDto.email }
			});

			if ( teacherFound ) 
				throw new BadRequestException({ message: "El Profesor ya está registrado" });

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

	// TODO: Verificar si el correo o el contacto ya estan registrados
	async update( id: string, updateTeacherDto: UpdateTeacherDto ) {

		try {

			const teacherFound = await this.teacherRepository.findOneBy({ id });

			if ( !teacherFound )
				throw new BadRequestException({ message: "Profesor no registrado" });

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
}
