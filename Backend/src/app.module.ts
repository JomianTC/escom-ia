import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RequirementProcedureModule } from "./requirement_procedure/requirement_procedure.module";
import { AdminProcedureModule } from "./admin_procedure/admin_procedure.module";
import { RequirementsModule } from "./requirements/requirements.module";
import { NotificationModule } from "./notification/notification.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { TagComentModule } from "./tag_coment/tag_coment.module";
import { ProcedureModule } from "./procedure/procedure.module";
import { TeacherModule } from "./teacher/teacher.module";
import { ComentModule } from "./coment/coment.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TagModule } from "./tag/tag.module";
import { GptAiModule } from "./gpt-ai/gpt-ai.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { StatusModule } from './status/status.module';

@Module({
	imports: [

		// ? Importar el módulo de configuración para .env
		ConfigModule.forRoot(),

		// ? Importamos el modulo para servir contenido estatico
		// ? Solamente lo usaremos para probar las notificaciones push
		// ServeStaticModule.forRoot({
		// 	rootPath: join( __dirname, "..", "public" ),
		// }),

		// ? Importar el módulo de TypeORM para la BD
		TypeOrmModule.forRoot({

			type: "postgres",

			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			ssl: true,
			extra: {
				ssl: {
					rejectUnauthorized: false,
				},
			},

			autoLoadEntities: true,
			synchronize: true,
		}),

		// ? Importar el módulo de envío de correos
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILER_SERVICE,
				auth: {
					user: process.env.MAILER_EMAIL,
					pass: process.env.MAILER_SECRET_KEY,
				},
			},
			template: {
				dir: join(__dirname, ".." + "/templates"),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			}
		}),

		AuthModule,

		UserModule,

		CloudinaryModule,

		TeacherModule,

		ComentModule,

		TagModule,

		TagComentModule,

		ProcedureModule,

		RequirementsModule,

		RequirementProcedureModule,

		AdminProcedureModule,

		NotificationModule,

		GptAiModule,

		StatusModule,
	],
	controllers: [],
	providers: [],
})

export class AppModule { }
console.log(__dirname);