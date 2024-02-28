import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export const HandleErrors = ( error: any ) => {

	if( error instanceof BadRequestException ) throw error;
	if( error instanceof UnauthorizedException ) throw error;
	if( error instanceof ForbiddenException ) throw error;
	if( error instanceof NotFoundException ) throw error;

	console.log({ message: error.message });
	throw new InternalServerErrorException({ message: "Internal Server Error" });
};
