import { Controller, UseGuards, UseInterceptors, UploadedFile, Put, Delete, Get, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetTokenPayload } from "./decorators/get-token-payload.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
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

	@Put( "update" )
	@UseGuards( AuthGuard )
	async updateUser( 
		@GetTokenPayload() email: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.userService.updateUserInfo( email, updateUserDto );
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
