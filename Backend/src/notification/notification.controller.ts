import { Controller, Post, Body, Param, UseGuards, Delete } from "@nestjs/common";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationService } from "./notification.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "../user/user.service";

@Controller( "notification" )
export class NotificationController {
	
	constructor( 
		private readonly notificationService: NotificationService,
		private readonly userService: UserService
	){}

	@Post( "subscription/:id" )
	@UseGuards( AuthGuard )
	async create( 
		@GetTokenPayload() email: string,
		@Param( "id" ) id: string,
		@Body() createNotificationDto: CreateNotificationDto
	) {

		const user = await this.userService.findByEmail( email );

		await this.notificationService.create( user.id, id, createNotificationDto );
		return { message: "Suscripcion creada correctamente" }
	}

	@Delete( "subscription/:id" )
	@UseGuards( AuthGuard )
	async delete( 
		@GetTokenPayload() email: string,
		@Param( "id" ) id: string,
	) {

		const user = await this.userService.findByEmail( email );
		return await this.notificationService.remove( user.id, id );
	}
}
