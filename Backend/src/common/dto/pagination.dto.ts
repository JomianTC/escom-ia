import { IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {

	@IsOptional()
	@Min(1)
	@IsPositive()
	@Type( () => Number )
	page?: number;

	@IsOptional()
	@Min(1)
	@IsPositive()
	@Type( () => Number )
	limit?: number;
}