import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Requirements Endpoints", () => {
	
	let app: INestApplication;
	let token: string;

	const updateReqId = "57659d91-adc4-491f-b75e-c4493ec96ec5";
	const falseUpdateReqId = "71227124-58c2-4878-8e28-5eecf578e9f1";
	let deleteReqId = "";

	const newReq = {
		nombre: "Credencial",
		descripcion: "Copia de credencial por ambos lados",
	}

	const updatedReq = {
		nombre: "Apellido MPaterno",
		descripcion: "Escribe tu apellido materno",
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

	// * Success Get Requirements

	test( "Should return an array of requirements with no pagination", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/requirements" );

		expect( status ).toBe( 200 );

		expect( body.requirements.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of requirements with pagination 5", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/requirements?page=1&limit=5" );

		expect( status ).toBe( 200 );

		expect( body.requirements.length ).toBe( 5 );
		expect( typeof body.total ).toBe( "number" );
	});

	// ! Error Get Procedures
	// ? No existen errores para esta ruta incluso si no hay tramites registrados

	// * Success Create Requirements

	test( "Should create a new Requirement", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/requirements" )
			.auth( token, { type: "bearer" } )
			.send( newReq );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Requerimiento creado exitosamente" );

		deleteReqId = body.requirement.id;
	});

	// ! Error Create Requirements

	test( "Should return invalid token error - Create Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/requirements" )
		.auth( "Token", { type: "bearer" } )
		.send( newReq );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return requirement already exists - Create Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/requirements" )
			.auth( token, { type: "bearer" } )
			.send( newReq );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El requerimiento ya existe" );
	});	
	
	// * Success Update Requirements

	test( "Should return a updated requirement", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/requirements/" + updateReqId )
			.auth( token, { type: "bearer" } )
			.send( updatedReq );

		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Requerimiento actualizado exitosamente" );
	});

	// ! Error Update Requirements

	test( "Should return a not valid ID error - Update Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/requirements/123" )
			.auth( token, { type: "bearer" } )
			.send( updatedReq );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Update Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/requirements/" + updateReqId )
		.auth( "Token", { type: "bearer" } )
		.send( updatedReq );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});
	
	test( "Should return a not register requirement error - Update Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/requirements/" + falseUpdateReqId )
			.auth( token, { type: "bearer" } )
			.send( updatedReq );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Requerimiento no registrado" );
	});

	// * Success Delete Requirements

	test( "Should delete a requirement", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/requirements/" + deleteReqId )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Requerimiento eliminado exitosamente" );
	});

	// ! Error Delete Requirements

	test( "Should return a not valid ID error - Delete Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/requirements/123" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Delete Requirements", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/requirements/" + deleteReqId )
			.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not register requirement error - Delete Requirements", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/requirements/" + falseUpdateReqId )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Requerimiento no registrado" );
	});

	afterAll( async () => { await app.close(); });
});
