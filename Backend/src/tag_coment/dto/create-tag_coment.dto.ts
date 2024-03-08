import { IsArray, IsString } from "class-validator";
import { Coment } from "../../coment/entities/coment.entity";

export class CreateTagComentDto {

	@IsArray()
	tags_id: string[];

	@IsString()
	coment: Coment;
}
