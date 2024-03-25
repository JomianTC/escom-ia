import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseUUIDPipe, Query, Put, BadRequestException } from "@nestjs/common";
import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { AdminProcedureService } from "../admin_procedure/admin_procedure.service";
import { GetTokenPayload } from "../user/decorators/get-token-payload.decorator";
import { NotificationService } from "../notification/notification.service";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ProcedureService } from "./procedure.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserService } from '../user/user.service';

@Controller( "procedure" )
export class ProcedureController {

	private nonNewProcedures = [];

	constructor( 
		private readonly procedureService: ProcedureService,
		private readonly reqProService: RequirementProcedureService,
		private readonly userService: UserService,
		private readonly adminProService: AdminProcedureService,
		private readonly notificationService: NotificationService,
	){ 
		this.create24HTimer();
		this.obtainNonNewProcedures();
	}

	// ? Metodos Alumno

	@Get()
	async findAll( @Query() paginationDto: PaginationDto ){

		return this.procedureService.findAll( paginationDto );

		// const { procedures, total } = await this.procedureService.findAll( paginationDto );

		// const fullProcedures = await Promise.all( procedures.map( async ( procedure ) => {

		// 	const requirements = await this.reqProService.findStack( procedure );
		// 	return { tramite: procedure, requerimientos: requirements };
		// }));

		// return { tramites: fullProcedures, total };
	}

	@Get( ":id" )
	async findOne( @Param( "id", ParseUUIDPipe ) id: string ){

		const procedure = await this.procedureService.findOne( id );
		const requirements = await this.reqProService.findStack( procedure );

		return {
			procedure,
			requirements
		}
	}

	// ? Metodos Admin

	@Post()
	@UseGuards( AuthGuard )
	async create( 
		@GetTokenPayload() email: string,
		@Body() createProcedureDto: CreateProcedureDto
	) {

		const procedure = await this.procedureService.create( createProcedureDto );		
		await this.reqProService.create({ 
			id_requirements: createProcedureDto.requerimentos,
			procedure
		});

		const admin = await this.userService.findByEmailAdmin( email );
		await this.adminProService.create({ admin, procedure });

		return { message: "Trámite creado correctamente" }
	}

	@Get( "admin/findAll" )
	@UseGuards( AuthGuard )
	async findAllWithPermissions (
		@GetTokenPayload() email: string,
		@Query() paginationDto: PaginationDto
	) {
		const admin = await this.userService.findByEmailAdmin( email );
		const { adminProcedures, total } = await this.adminProService.findAll( admin, paginationDto );
		const adminProceduresFound = await this.procedureService.findStack( adminProcedures );

		const fullProcedures = await Promise.all( adminProceduresFound.map( async ( procedure ) => {

			const requirements = await this.reqProService.findStack( procedure );
			return { tramite: procedure, requerimientos: requirements };
		}));

		return { tramites: fullProcedures, total };
	}

	@Get( "admin/:id" )
	@UseGuards( AuthGuard )
	async findOneWithPermissions( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string
	) {

		const { procedure } = await this.checkPermission( email, id );

		const requirements = await this.reqProService.findStack( procedure );
		return { tramite: procedure, requerimientos: requirements };
	}

	@Post( "admin/:id" )
	@UseGuards( AuthGuard )
	async givePermissions( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body( "email" ) newAdminEmail: string
	) {

		const { procedure } = await this.checkPermission( email, id );

		const adminToGive = await this.userService.findByEmailAdmin( newAdminEmail );

		const adminAlreadyHasPermission = await this.adminProService.checkPermission( adminToGive, procedure );

		if ( adminAlreadyHasPermission )
			throw new BadRequestException({ message: "El administrador ya tiene permisos" });

		await this.adminProService.create({ admin: adminToGive, procedure });
		
		return { message: "Permisos otorgados correctamente" };
	}

	@Delete( "admin/:id" )
	@UseGuards( AuthGuard )
	async revokePermissions( 
		@GetTokenPayload() email: string,
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body( "email" ) deleteAdminEmail: string
	) {

		await this.checkPermission( email, id );

		const admin = await this.userService.findByEmailAdmin( deleteAdminEmail );
		const procedure = await this.procedureService.findOne( id );

		const adminDosntHavePermission = await this.adminProService.checkPermission( admin, procedure );

		if ( !adminDosntHavePermission )
			throw new BadRequestException({ message: "El administrador nunca tuvo permisos" });

		await this.adminProService.remove( admin, procedure );
		
		return { message: "Permisos revocados correctamente" };
	}

	@Put( ":id" )
	@UseGuards( AuthGuard )
	async update( 
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body() updateProcedureDto: UpdateProcedureDto
	){
		
		const estado = await this.procedureService.update( id, updateProcedureDto );
		const { message } = await this.procedureService.updateDate( id, updateProcedureDto );

		if ( estado && message !== "X" )
			await this.notificationService.sendNotification( id, "Modificacion de Fechas", message );

		const procedure = await this.procedureService.findOne( id );
		await this.reqProService.update({ id_requirements: updateProcedureDto.requerimentos, procedure });
		
		return { message: "Trámite actualizado correctamente" };
	}

	@Delete( ":id" )
	@UseGuards( AuthGuard )
	async remove( 
		@Param( "id", ParseUUIDPipe ) id: string,
		@Body( "estado" ) estado: boolean
	) {

		const procedure = await this.procedureService.findOne( id );
		const { message } = await this.procedureService.remove( id, estado );

		if ( !this.nonNewProcedures.includes( id ) ){
			await this.notificationService.sendAllNotification( `El tramite ${ procedure.nombre } ahora esta disponible` );
			this.nonNewProcedures.push( id );
		}
		
		if ( estado )
			await this.notificationService.sendNotification( 
				id, "Activacion de Tramite", `El tramite: ${ procedure.nombre } esta activo` );
		else
			await this.notificationService.sendNotification( 
				id, "Activacion de Tramite", `El tramite: ${ procedure.nombre } esta inactivo` );

		return { message };
	}

	async checkPermission( email: string, id: string ){
		
		const admin = await this.userService.findByEmailAdmin( email );
		const procedure = await this.procedureService.findOne( id );
		const adminProcedureId = await this.adminProService.findOne( admin, procedure );

		return { admin, procedure, adminProcedureId };
	}

	async create24HTimer(){

		const todayAtNine = new Date();
		todayAtNine.setHours( 9 );
		todayAtNine.setMinutes( 0 );
		todayAtNine.setSeconds( 0 );
		todayAtNine.setMilliseconds( 0 );

		let tiempoRestante = todayAtNine.getTime() - Date.now();

		if ( tiempoRestante < 0 )
			tiempoRestante += 24 * 60 * 60 * 1000;

		setTimeout( async () => { 
		
			try { 
				
				const { procedures } = await this.procedureService.findAll({ limit: 1000, page: 1 });
				
				procedures.forEach( async ( procedure ) => {
					
					const today = `${ todayAtNine.getDate() }-${ todayAtNine.getMonth() }`;
					const procedureDay = `${ procedure.fechaTermino.getDate() }-${ procedure.fechaTermino.getMonth() }`;

					if ( today !== procedureDay ) return;

					if ( !procedure.estado ) return;

					await this.notificationService
					.sendNotification( procedure.id, "AVISO", `El tramite: ${ procedure.nombre } termina HOY!!!` );
				});

				console.log( "Notificaciones enviadas 9AM" );
			
			} catch ( error ) { console.log( `${ error.message } que terminen el dia de hoy` ); }

		}, tiempoRestante );
	}

	async obtainNonNewProcedures(){
		const { procedures } = await this.procedureService.findAll({ limit: 1000, page: 1 });
		procedures.forEach( procedure => { this.nonNewProcedures.push( procedure.id ) });
	}
}
