import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Procedure Endpoints", () => {
	
	let app: INestApplication;
	let token: string;

	const procedureWithReqId = "87ded2a6-7a59-4b05-9dcb-4b5dbbb78790";
	const procedureWithoutReqId = "a0ebd616-c323-42ec-8e31-5f3cab44b8ba";

	const updateProcedureId = "87ded2a6-7a59-4b05-9dcb-4b5dbbb78790";
	const falseUpdateProcedureId = "87ded2a6-7a59-4b05-9dcb-4b5dbbb78791";
	const deleteProcedureId = "cf03d445-d33d-4b2c-8dd9-1b697c333c9a";

	const newProcedure = {
		nombre: "Nueva Credencial 18",
		descripcion: "Este tramite te ayudara a obtener una nueva creadencial en caso de perdida",
		fechaInicio: "2024-10-01",
		fechaTermino: "2024-10-30",
		estado: true,
		esInformativo: false,
		requerimentos: [
			"f2e146d3-a444-4313-a635-e71f4302d752",
			"339e7d04-d86d-4e64-90eb-6c03163b643c",
			"295bffde-7374-4332-b460-1d314df18d99"
		]
	}

	const updatedProcedure = {
		nombre: "Nueva tramite XXX",
		descripcion: "Este tramite no hace nada",
		fechaInicio: "2024-6-11",
		fechaTermino: "2024-6-12",
		estado: true,
		esInformativo: true,
		requerimentos: [
			"f2e146d3-a444-4313-a635-e71f4302d752",
			"339e7d04-d86d-4e64-90eb-6c03163b643c",
			"295bffde-7374-4332-b460-1d314df18d99"
		]
	}

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const data = fs.readFileSync( "./test/data/sample-jwt.json", "utf-8" );
		token = await JSON.parse( data ).token;
	});

	// ? User endpoints

	// * Success Get Procedures

	test( "Should return an array of procedures with no pagination", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure" );

		expect( status ).toBe( 200 );

		expect( body.procedures.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of Tags with pagination 5", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure?page=1&limit=5" );

		expect( status ).toBe( 200 );

		expect( body.procedures.length ).toBe( 5 );
		expect( typeof body.total ).toBe( "number" );
	});

	// ! Error Get Procedures
	// ? No existen errores para esta ruta incluso si no hay tramites registrados

	// * Success Get Procedure By ID
	test( "Should return a procedure with requirements", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/" + procedureWithReqId );

		expect( status ).toBe( 200 );
		
		expect( body.procedure ).toBeDefined();
		expect( body.requirements ).toBeDefined();
		expect( body.requirements.length ).toBe( 1 );
		expect( body.requirements[0] ).toBe( "Sin requerimientos" );
	});
	
	test( "Should return a procedure without requirements", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/" + procedureWithoutReqId );

		expect( status ).toBe( 200 );
		
		expect( body.procedure ).toBeDefined();
		expect( body.requirements ).toBeDefined();
		expect( body.requirements.length ).toBe( 1 );
		expect( body.requirements.length ).toBe( 1 );
	});

	// ! Error Get Procedure By ID
	test( "Should return a not valid ID error - Get Procedure By ID", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/123" )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});
	
	test( "Should return a not register tag error - Get Procedure By ID", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/" + falseUpdateProcedureId )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	// ? Admin endpoints

	// * Success Create Procedure

	test( "Should create a new Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure" )
			.auth( token, { type: "bearer" } )
			.send( newProcedure );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Trámite creado correctamente" );
	});

	// ! Error Create Procedure

	test( "Should return invalid token error - Create Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/procedure" )
		.auth( "Token", { type: "bearer" } )
		.send( newProcedure );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return procedure already exists - Create Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure" )
			.auth( token, { type: "bearer" } )
			.send( newProcedure );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Ya existe un trámite con ese nombre" );
	});	
	
	// * Success Update Procedure

	test( "Should return a updated Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/" + updateProcedureId )
			.auth( token, { type: "bearer" } )
			.send( updatedProcedure );

		console.log( body );

		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Trámite actualizado correctamente" );
	});

	// ! Error Update Procedure

	test( "Should return a not valid ID error - Update Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/123" )
			.auth( token, { type: "bearer" } )
			.send( updatedProcedure );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Update Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/procedure/" + updateProcedureId )
		.auth( "Token", { type: "bearer" } )
		.send( updatedProcedure );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});
	
	test( "Should return a not register tag error - Update Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/" + falseUpdateProcedureId )
			.auth( token, { type: "bearer" } )
			.send( updatedProcedure );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	// * Success Delete Procedure

	test( "Should delete a Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "El Trámite ahora esta inactivo" );
	});

	// ! Error Delete Procedure

	test( "Should return a not valid ID error - Delete Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/123" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Delete Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not register tag error - Delete Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + falseUpdateProcedureId )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	afterAll( async () => { await app.close(); });
});
