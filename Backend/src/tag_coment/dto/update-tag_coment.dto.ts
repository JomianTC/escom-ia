import { PartialType } from "@nestjs/mapped-types";
import { CreateTagComentDto } from "./create-tag_coment.dto";

export class UpdateTagComentDto extends PartialType( CreateTagComentDto ) {}
