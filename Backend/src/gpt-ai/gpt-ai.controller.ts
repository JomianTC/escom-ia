import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
import { ProcedureService } from '../procedure/procedure.service';
import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "../user/user.service";
import { GptAiService } from "./gpt-ai.service";

@Controller( "gptai" )
export class GptAiController {

	constructor(
		private readonly gptAiService: GptAiService,
		private readonly userService: UserService,
		private readonly procedureService: ProcedureService,
		private readonly reqProService: RequirementProcedureService 
	){}

	@Post( "coment" )
	@UseGuards( AuthGuard )
	async createComent( 
		@GetTokenPayload() email: string,
		@Body() createGptAiDto: CreateGptAiDto
	){

		await this.userService.findByEmail( email );
		return this.gptAiService.createComent( createGptAiDto );
	}

	@Post( "askSomething" )
	@UseGuards( AuthGuard )
	async askSomething( 
		@GetTokenPayload() email: string,
		@Body() createGptAiDto: CreateGptAiDto
	){

		await this.userService.findByEmail( email );
		
		const { procedures } = await this.procedureService.findAll({ page: 1, limit: 100 });
		const fullProcedures = await Promise.all( procedures.map( async ( procedure ) => {
			const requirements = await this.reqProService.findStack( procedure );
			return { tramite: procedure, requerimientos: requirements };
		}));

		return this.gptAiService.askSomething( createGptAiDto, fullProcedures );
	}

	@Post( "coment/validate" )
	@UseGuards( AuthGuard )
	async validateComent( 
		@GetTokenPayload() email: string,
		@Body() createGptAiDto: CreateGptAiDto
	){

		await this.userService.findByEmail( email );
		return this.gptAiService.validateComent( createGptAiDto );
	}
}
