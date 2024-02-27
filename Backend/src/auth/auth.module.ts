import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";

@Module({

	controllers: [ AuthController ],
	providers: [ AuthService ],
	imports: [

		// ? Importamos las ConfigModules para usar envs
		ConfigModule,

		// ? Importamos las ConfigModules para la BD
		TypeOrmModule.forFeature([ User ]),

		// ? Importamos PassportModule para definir la estrategia de autenticación
		PassportModule.register({ defaultStrategy: "jwt" }),
		
		// ? Importamos JwtModule crear nuestros tokens sin usar aun el payload
		JwtModule.registerAsync({ 
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( configService: ConfigService ) => {
				return {
					secret: configService.get( "JWT_SECRET" ),
					signOptions: { expiresIn: "2h" }
				}
			}
		}),
	],
	
	exports: [ TypeOrmModule, PassportModule, JwtModule ],
})

export class AuthModule { }
