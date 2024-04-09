import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { HandleErrors } from "src/common/handle-errors";
import { Procedure } from 'src/procedure/entities/procedure.entity';

// import OpenAI from "openai";

type ProcedureReq = {
	tramite: Procedure;
	requerimientos: string[];
}[]

@Injectable()
export class GptAiService {

	// private readonly openai = new OpenAI({ apiKey: "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" });

	async createComent( createGptAiDto: CreateGptAiDto ) {

		const { tags } = createGptAiDto;
		let consultaGPT = "Crea un comentario sobre un profesor de la manera mas respectuosa posible usando los siguientes tags:\n";

		try {

			if ( tags.length === 0  )
				throw new BadRequestException({ message: "Los tags son requeridos" });

			tags.forEach( tag => {
				consultaGPT += ` ${ tag }\n`;
			});

			// CONSULTA A GPT-3
			// const completion = await openai.chat.completions.create({
			// 	messages: [{ role: "system", content: consultaGPT }],
			// 	model: "gpt-3.5-turbo",
			// });

			// console.log(completion.choices[0]);

			return { message: consultaGPT };
			
		} catch ( error ) { HandleErrors( error ); }
	}
	
	async askSomething( createGptAiDto: CreateGptAiDto, procedures: ProcedureReq ) {

		const { consulta } = createGptAiDto;

		let consultaGPT = "Con base en la siguiente informacion responde la siguiente pregunta ";
		consultaGPT += "si es posible, si no es posible simplemente di que no puedes responder la pregunta ";
		consultaGPT += "piensa muy bien la relacion entre la pregunta y la respuesta dada ";
		consultaGPT += "y actua como si fueras un asistente virtual y supieras las respuestas en caso de que si\n";
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
				informacion += `Fecha de inicio: ${ procedure.tramite.fechaInicio }\n`;
				informacion += `Fecha de Termino: ${ procedure.tramite.fechaTermino }\n`;
				informacion += `Requerimientos: \n`;
				
				procedure.requerimientos.forEach( requerimiento => {
					informacion += `${ requerimiento }\n`;
				});

				informacion += `},\n`;
			});
			
			// CONSULTA A GPT-3
			// const completion = await openai.chat.completions.create({
			//	messages: [{ role: "system", content: consulta }],
			// 	model: "gpt-3.5-turbo",
			// });

			// console.log(completion.choices[0]);

			return { message: consultaGPT + informacion + `\nPregunta: ${ consulta }` };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async validateComent( createGptAiDto: CreateGptAiDto ) {

		const { comentario } = createGptAiDto;

		let consultaGPT = "Responde unicamente con un si o no si el siguiente comentario es respetuoso: ";

		try {

			if ( !comentario )
				throw new BadRequestException({ message: "El comentario es requerido" });

			// CONSULTA A GPT-3
			// const completion = await openai.chat.completions.create({
			// 	messages: [{ role: "system", content: `${ consultaGPT }\n${ comentario }` }],
			// 	model: "gpt-3.5-turbo",
			// });

			// console.log(completion.choices[0]);

			return { message: `${ consultaGPT }\n${ comentario }` };
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
