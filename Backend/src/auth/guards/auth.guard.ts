import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async canActivate( context: ExecutionContext ): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader( request );

		if ( !token )
			throw new UnauthorizedException({ message: "No se encontron el token" });

		try {
			
			const payload = await this.jwtService.verifyAsync( token, { 
				secret: this.configService.get( "JWT_SECRET" )
			});

			request[ "email" ] = payload.email;
			
		} catch { throw new UnauthorizedException({ message: "Token no valido" }); }
		
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [ type, token ] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}


