import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRequirementProcedureDto } from "./dto/create-requirement_procedure.dto";
import { UpdateRequirementProcedureDto } from "./dto/update-requirement_procedure.dto";
import { RequirementProcedure } from "./entities/requirement_procedure.entity";
import { RequirementsService } from "../requirements/requirements.service";
import { Procedure } from '../procedure/entities/procedure.entity';
import { HandleErrors } from "../common/handle-errors";

@Injectable()
export class RequirementProcedureService {

	constructor(
		@InjectRepository( RequirementProcedure )
		private readonly reqProRepository: Repository< RequirementProcedure >,
		private readonly reqService: RequirementsService
	){}

	async create( createRequirementProcedureDto: CreateRequirementProcedureDto ) {

		const { id_requirements, procedure } = createRequirementProcedureDto;

		try {
			
			const reqsFound = await this.reqService.findStack( id_requirements );

			reqsFound.forEach( async ( requerimiento ) => {
				const reqPro = this.reqProRepository.create({ requerimiento, tramite: procedure });
				await this.reqProRepository.save( reqPro );
			});
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async findStack( procedure: Procedure ) {
		
		try {
			
			const reqsProFound = await this.reqProRepository.find({
				where: { tramite: procedure },
			});

			if ( reqsProFound.length === 0 ) 
				return [ "Sin requerimientos" ];


			return reqsProFound.map( requirement => requirement.requerimiento.nombre );

		} catch ( error ) { HandleErrors( error ); }
	}

	async update( updateRequirementProcedureDto: UpdateRequirementProcedureDto ) {
	
		const { id_requirements, procedure } = updateRequirementProcedureDto;

		try {

			await Promise.all([
				this.remove( procedure ),
				this.create({ id_requirements, procedure }),
			]);

		} catch ( error ) { HandleErrors( error ); }
	}

	async remove( procedure: Procedure ) {
		
		try {

			const reqsProcedureFound = await this.reqProRepository.find({
				where: { tramite: procedure },
			});

			reqsProcedureFound.forEach( async ( reqPro ) => {
				await this.reqProRepository.remove( reqPro );
			});
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
