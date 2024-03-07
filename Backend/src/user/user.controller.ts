import { Controller, UseGuards, UseInterceptors, UploadedFile, Put, Delete, Get } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetTokenPayload } from "./decorators/get-token-payload.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "./user.service";

@Controller( "user" )
export class UserController {
	
	constructor( 
		private readonly userService: UserService,
	) { }

	@Get()
	async findByEmail( email: string ){
		return this.userService.findByEmail( email );
	}

	@Put( "update/profile-picture" )
	@UseGuards( AuthGuard )
	@UseInterceptors( FileInterceptor( "file" ) )
	async update( @GetTokenPayload() email: string, @UploadedFile() file: Express.Multer.File ) {
		return this.userService.updateProfilePicture( email, file );
	}
	
	@Delete( "delete/profile-picture" )
	@UseGuards( AuthGuard )
	async remove( @GetTokenPayload() email: string ) {
		return this.userService.removeProfilePicture( email );
	}
}
