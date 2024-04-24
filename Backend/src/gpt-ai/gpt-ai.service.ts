import { Injectable, BadRequestException } from '@nestjs/common';
import { G4F } from "g4f";
import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { HandleErrors } from "src/common/handle-errors";
import { Procedure } from "src/procedure/entities/procedure.entity";
import { createComentQuery } from './queries/create-coment.query';
import { validateComentQuery } from './queries/validate-coment.query';
import { respondQuestionsQuery } from './queries/respond-questions.query';

// import OpenAI from "openai";

type ProcedureReq = {
	tramite: Procedure;
	requerimientos: string[];
}[]

@Injectable()
export class GptAiService {

	private readonly g4f = new G4F();

	// private readonly openai = new OpenAI({ apiKey: "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" });

	async createComent( createGptAiDto: CreateGptAiDto ) {

		const { tags } = createGptAiDto;
		let consultaGPT = createComentQuery;

		try {

			if ( tags.length === 0  )
				throw new BadRequestException({ message: "Los tags son requeridos" });

			tags.forEach( tag => {
				consultaGPT += ` ${ tag }\n`;
			});

			const responseGTP = await this.g4f.chatCompletion([
				{
					role: "user", 
					content: consultaGPT
				}
			]);

			return { mensaje: responseGTP };
			
		} catch ( error ) { HandleErrors( error ); }
	}
	
	async askSomething( createGptAiDto: CreateGptAiDto, procedures: ProcedureReq ) {

		const { consulta } = createGptAiDto;

		const consultaGPT = respondQuestionsQuery;
		let informacion = "";
		
		try {

			if ( !consulta )
				throw new BadRequestException({ message: "La consulta es requerida" });

			procedures.forEach( procedure => {
			
				informacion += `{\n`;
				informacion += `Tramite: ${ procedure.tramite.nombre }\n`;
				informacion += `Descripcion: ${ procedure.tramite.descripcion }\n`;
				informacion += `Fecha de inicio: ${ procedure.tramite.fechaInicio.toDateString() }\n`;
				informacion += `Fecha de Termino: ${ procedure.tramite.fechaTermino.toDateString() }\n`;
				informacion += `Requerimientos: \n`;
				
				procedure.requerimientos.forEach( requerimiento => {
					informacion += `${ requerimiento }\n`;
				});
				
				informacion += `Enlaces: \n`;
				
				const { links } = procedure.tramite;

				const enlaces = links.split("-----");
				enlaces.pop();

				enlaces.forEach( enlace => {
					informacion += `${ enlace }\n`;
				});
				
				informacion += `},\n`;
			});
			
			const responseGTP = await this.g4f.chatCompletion([
				{
					role: "user", 
					content: consultaGPT + informacion
				},
				{
					role: "user", 
					content: `\nPregunta: ${ consulta }`
				},
			]);

			return { mensaje: responseGTP };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async validateComent( createGptAiDto: CreateGptAiDto ) {

		const { comentario } = createGptAiDto;

		let consultaGPT = validateComentQuery;

		try {

			if ( !comentario )
				throw new BadRequestException({ message: "El comentario es requerido" });

			const responseGTP = await this.g4f.chatCompletion([
				{
					role: "user", 
					content: `${ consultaGPT }\n${ comentario }`
				}
			]);

			return { mensaje: responseGTP };
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
