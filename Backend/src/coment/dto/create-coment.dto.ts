import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateComentDto {

	@IsString()
	id_profesor: string;

	@IsNumber()
	@Min( 1 )
	@Max( 5 )
	puntuacion: number;

	@IsString()
	comentario: string;
}
