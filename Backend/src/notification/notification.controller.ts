import { Controller, Post, Body, Param, UseGuards, Delete, Get, ParseUUIDPipe } from "@nestjs/common";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { ProcedureService } from "../procedure/procedure.service";
import { NotificationService } from "./notification.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "../user/user.service";

@Controller( "notification" )
export class NotificationController {
	
	constructor( 
		private readonly notificationService: NotificationService,
		private readonly userService: UserService,
		private readonly procedureService: ProcedureService
	){}

	@Get( "key" )
	@UseGuards( AuthGuard )
	async obtainKey( @GetTokenPayload() email: string ) {

		await this.userService.findByEmail( email );
		return { 
			message: "Llave enviada correctamente",
			publicKey: process.env.VAPID_PUBLIC_KEY
		}
	}

	@Get( "subscription/:id" )
	@UseGuards( AuthGuard )
	async checkProcedureNotification( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string
	) {

		const user = await this.userService.findByEmail( email );
		await this.procedureService.findOne( id );
		const isActivated = await this.notificationService.checkProcedureNotification( user.id, id );
		return { isActivated }
	}

	@Post( "subscription/:id" )
	@UseGuards( AuthGuard )
	async create( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body() createNotificationDto: CreateNotificationDto
	) {

		const user = await this.userService.findByEmail( email );
		await this.procedureService.findOne( id );

		await this.notificationService.create( user.id, id, createNotificationDto );
		return { message: "Suscripcion creada correctamente" }
	}

	@Post( "checkDevice" )
	@UseGuards( AuthGuard )
	async checkNotifications( 
		@GetTokenPayload() email: string,
		@Body() createNotificationDto: CreateNotificationDto
	) {

		const user = await this.userService.findByEmail( email );
		return await this.notificationService.checkNotifications( user.id, createNotificationDto );
	}

	@Delete( "subscription/:id" )
	@UseGuards( AuthGuard )
	async delete( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string,
	) {

		const user = await this.userService.findByEmail( email );
		await this.procedureService.findOne( id );
		return await this.notificationService.remove( user.id, id );
	}

	@Delete( "subscription/delete/all" )
	@UseGuards( AuthGuard )
	async deleteAll( 
		@GetTokenPayload() email: string,
		@Body() createNotificationDto: CreateNotificationDto
	) {

		await this.userService.findByEmail( email );
		return await this.notificationService.removeAll( createNotificationDto.endpoint );
	}
}
