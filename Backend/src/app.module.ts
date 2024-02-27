import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [

		// ? Importar el módulo de configuración para .env
		ConfigModule.forRoot(),

		// ? Importar el módulo de TypeORM para la BD
		TypeOrmModule.forRoot({

			type: "mysql",

			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,

			autoLoadEntities: true,
			synchronize: true,
		}),

		AuthModule,
	],
	controllers: [],
	providers: [],
})

export class AppModule { }
