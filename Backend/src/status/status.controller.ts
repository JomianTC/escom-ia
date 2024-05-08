import { Controller, Get } from "@nestjs/common";

@Controller( "status" )
export class StatusController {

	constructor(){}

	@Get()
	keepAlive() {
		return { mensaje: "Servidor Online!!!" };
	}
}
