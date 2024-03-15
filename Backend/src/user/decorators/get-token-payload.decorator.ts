import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetTokenPayload = createParamDecorator(
	( _data: string, context: ExecutionContext ) => {
		
		const request = context.switchToHttp().getRequest();
		const email = request.email;
		
		if ( !email ){
			console.log( "Error obteniendo el email - Decorador GetTokenPayload" );
			throw new InternalServerErrorException( "Internal Server Error" );
		}

		return email;
	}
);
