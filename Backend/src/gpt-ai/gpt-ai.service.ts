import { Injectable, BadRequestException } from '@nestjs/common';
import { G4F } from "g4f";
import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { HandleErrors } from "src/common/handle-errors";
import { Procedure } from "src/procedure/entities/procedure.entity";

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
		let consultaGPT = "Crea un comentario sobre un profesor de la manera mas respectuosa posible como si fueras un alumno usando los siguientes tags:\n";

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

		let consultaGPT = "Con base en la siguiente informacion responde la siguiente pregunta si es posible, ";
		consultaGPT += "piensa muy bien la relacion entre la pregunta y la respuesta dada ";
		consultaGPT += "y actua como si fueras un asistente virtual y supieras las respuestas\n";
		consultaGPT += "Es muy importante que toda la conversacion sea sobre esta informacion y cualquier cosa que no se encuentre en ella ";
		consultaGPT += "simplemente no la respondas ni ahora ni en consultas futuras\n\n";
		
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

		let consultaGPT = "Responde con 'Buen Comentario' si el siguiente comentario no contiene palabras mal sonantes, doble sentido y no falta al respeto ";
		consultaGPT += "en caso contrario responde con un 'Mal Comentario': ";

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
