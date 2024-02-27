import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {

	const app = await NestFactory.create( AppModule );
	const logger = new Logger( "Bootstrap" );

		// ? Establecer este prefijo para todas las rutas del proyecto
		app.setGlobalPrefix( "api" );

		// ? Habilitar CORS con opciones por defecto
		app.enableCors();
	
		// ? Utilizar un pipe de validación global
		/*
			? Este pipe se aplica a todas las rutas de la aplicación
			? Si falta un parametro del DTO en la peticion este regresara un error
			? Si existe un parametro que no pertenece al DTO regresara un error
		*/
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
			})
		);
	
		// ? Iniciar el servidor
		await app.listen( process.env.PORT || 8080 );
	
		// ? Mostrar un mensaje en consola mediante el logger integrado de NestJS
		logger.log( `Server running on port ${ process.env.PORT || 8080 }` );
}

bootstrap();
