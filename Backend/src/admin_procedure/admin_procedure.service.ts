import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateAdminProcedureDto } from "./dto/create-admin_procedure.dto";
import { UpdateAdminProcedureDto } from "./dto/update-admin_procedure.dto";
import { AdminProcedure } from './entities/admin_procedure.entity';
import { Procedure } from "../procedure/entities/procedure.entity";
import { Administrator } from "../auth/entities/admin.entity";
import { PaginationDto } from "../common/dto/pagination.dto";
import { HandleErrors } from "../common/handle-errors";

@Injectable()
export class AdminProcedureService {

	constructor(
		@InjectRepository( AdminProcedure )
		private readonly adminProRepository: Repository< AdminProcedure >,
	) {}

	async create( createAdminProcedureDto: CreateAdminProcedureDto ) {
		
		try {

			const adminProcedure = this.adminProRepository.create( createAdminProcedureDto );
			await this.adminProRepository.save( adminProcedure );

		} catch ( error ) { HandleErrors( error ); }
	}

	async findAll( admin: Administrator, paginationDto: PaginationDto) {

		const { limit = 10, page = 1 } = paginationDto;

		try {

			const adminProceduresFound = await this.adminProRepository.find({
				where: { admin },
				take: limit,
				skip: ( page - 1 ) * limit
			});
			
			if ( adminProceduresFound.length === 0 ) 
				throw new BadRequestException({ mensaje: "No se encontraron trámites" });
		
			const total = await this.adminProRepository.countBy({ admin });

			const adminProcedures = adminProceduresFound.map( adminProcedure => adminProcedure.procedure.id );
			
			return { adminProcedures, total };

		} catch ( error ) { HandleErrors( error ); }
	}

	async findOne( admin: Administrator, procedure: Procedure ) {
		try {

			const adminProcedure = await this.adminProRepository.findOneBy({ procedure, admin });

			if ( !adminProcedure ) 
				throw new BadRequestException({ mensaje: "No se encontró el permiso" });

			if ( adminProcedure.admin.id !== admin.id )
				throw new BadRequestException({ mensaje: "No tienes permisos para ver este trámite" });

			return adminProcedure.id;

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( admin: Administrator, procedure: Procedure ) {

		try { 
			await this.adminProRepository.createQueryBuilder( "admin_tramites" )
				.where( "admin_tramites.adminId = :admin", { admin: admin.id })
				.andWhere( "admin_tramites.procedureId = :procedure", { procedure: procedure.id })
				.delete()
				.execute();
		} catch ( error ) { HandleErrors( error ); }
	}

	async checkPermission( admin: Administrator, procedure: Procedure ){

		try {

			const adminProcedure = await this.adminProRepository.createQueryBuilder( "admin_tramites" )
				.where( "admin_tramites.adminId = :admin", { admin: admin.id })
				.andWhere( "admin_tramites.procedureId = :procedure", { procedure: procedure.id })
				.getOne();

			if ( adminProcedure ) return true;

			return false;

		} catch ( error ) {	HandleErrors( error ); }
	}
}
