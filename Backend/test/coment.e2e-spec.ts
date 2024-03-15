import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Coments Endpoints", () => {
	
	let app: INestApplication;
	let token: string;
	let badToken: string;

	const teacherID = "2b87286c-03f8-482f-a5ed-433d6977a16b";
	const noRegisterTeacherID = "8b034d9b-15b9-4450-ae97-60b5aee7e2d1";

	const comentID = "aa21da2b-4f08-4f9c-bba8-0e8a12468911";
	const noRegisteredComentID = "0c844674-e766-407e-b317-aaf2d7d6c1ca";

	const comentWithTags = "b0d1e548-ce8f-4cc9-8cbd-58d95bbe88e8";
	const comentWithoutTags = "34b2caf3-26bc-428d-9af4-1807ff17c913";

	let comentDeleteID = "2a292240-aed7-4572-bd59-d2cde978c1a4";
	let noPermisionComentDelete = "401bec16-bef2-42a7-a1e8-7da21aca3a44";

	const coment ={
		id_profesor: teacherID,
		puntuacion: 3,
		comentario: "Comentario para el profesor SuperSu",
		tags: [
			"012dc328-86bc-400c-9435-5418edbfe439",
			"236f7314-cb0b-428f-8311-b6aa940394b0",
			"e238ca79-39ab-4891-a07d-7b0f0c5ac6e5",
			"e0f43e5c-8270-49cf-ba75-b5c385e82a9a"
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

		const badData = fs.readFileSync( "./test/data/bad-sample-jwt.json", "utf-8" );
		badToken = await JSON.parse( badData ).badToken;
	});

	// * Success Create Coment

	test( "Should create a new coment with tags", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/coment" )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Comentario creado con éxito" );
	});

	test( "Should create a new coment without tags", async() => {

		coment.tags = [];

		const { status, body } = await request( app.getHttpServer() )
			.post( "/coment" )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Comentario creado con éxito" );
	});

	// ! Error Create Coment

	test( "Should return invalid token error - Create Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/coment" )
		.auth( "Token", { type: "bearer" } )
		.send( coment );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return user not found - Create Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/coment" )
		.auth( badToken, { type: "bearer" } )
		.send( coment );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Usuario no encontrado" );
	});

	test( "Should return teacher not register - Create Coment", async() => {

		const coment ={
			id_profesor: noRegisterTeacherID,
			puntuacion: 3,
			comentario: "Comentario para el profesor SuperSu"
		}
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/coment" )
		.auth( token, { type: "bearer" } )
		.send( coment );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});

	// * Success Get Coment By ID
	test( "Should return a Coment with tags", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/coment/" + comentWithTags );

		expect( status ).toBe( 200 );

		expect( body.comentario ).toBeDefined();
		expect( body.usuario ).toBeDefined();
		expect( body.tags ).toBeDefined();

		expect( body.comentario.puntuacion ).toBeDefined();
		expect( body.comentario.comentario ).toBeDefined();
		expect( body.comentario.fecha ).toBeDefined();
		
		expect( body.usuario.nombres ).toBeDefined();
		expect( body.usuario.apellidos ).toBeDefined();
		expect( body.usuario.foto_perfil ).toBeDefined();

		expect( body.tags.length ).toBeGreaterThanOrEqual( 1 );
	});

	test( "Should return a Coment without tags", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/coment/" + comentWithoutTags );

		expect( status ).toBe( 200 );

		expect( body.comentario ).toBeDefined();
		expect( body.usuario ).toBeDefined();
		expect( body.tags ).toBeDefined();

		expect( body.comentario.puntuacion ).toBeDefined();
		expect( body.comentario.comentario ).toBeDefined();
		expect( body.comentario.fecha ).toBeDefined();
		
		expect( body.usuario.nombres ).toBeDefined();
		expect( body.usuario.apellidos ).toBeDefined();
		expect( body.usuario.foto_perfil ).toBeDefined();

		expect( body.tags[0] ).toBe( "Sin tags" );
	});

	// ! Error Get Coment By ID

	test( "Should return a not valid ID error - Get Coment By Id", async() => {
	
		delete coment.id_profesor;

		const { status, body } = await request( app.getHttpServer() )
			.get( "/coment/123" )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	// * Success Get Coments By Teacher

	test( "Should return an array of Coments with no pagination", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/coment/teacher/" + teacherID );

		expect( status ).toBe( 200 );

		expect( body.comentarios.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of Coments with pagination 15", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/coment/teacher/" + teacherID + "?page=1&limit=15" );

		expect( status ).toBe( 200 );

		expect( body.comentarios.length ).toBe( 15 );
		expect( typeof body.total ).toBe( "number" );
	});

	// ! Error Get Coments
	// ? No existen errores para esta ruta incluso si no hay comentarios registrados

	// * Success Get Coments By User

	test( "Should return an array of Coments with no pagination - By User", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/coment/user/" )
			.auth( token, { type: "bearer" });

		expect( status ).toBe( 200 );

		expect( body.comentarios.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of Coments with pagination 15 - By User", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/coment/user?page=1&limit=15" )
			.auth( token, { type: "bearer" });

		expect( status ).toBe( 200 );

		expect( body.comentarios.length ).toBe( 15 );
		expect( typeof body.total ).toBe( "number" );
	});

	// ! Error Get Coments
	// ? No existen errores para esta ruta incluso si no hay comentarios registrados
	
	// * Success Update Coment

	test( "Should return a updated Coment", async() => {
	
		delete coment.id_profesor;

		const { status, body } = await request( app.getHttpServer() )
			.put( "/coment/" + comentID )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Comentario actualizado con éxito" );

		expect( body.comentario ).toBeDefined();
		expect( body.usuario ).toBeDefined();
		expect( body.tags ).toBeDefined();

		expect( typeof body.comentario.puntuacion ).toBe( "number" );
		expect( typeof body.comentario.comentario ).toBe( "string" );
		expect( typeof body.comentario.fecha ).toBe( "string" );
		
		expect( typeof body.usuario.nombres ).toBe( "string" );
		expect( typeof body.usuario.apellidos ).toBe( "string" );
		expect( typeof body.usuario.foto_perfil ).toBe( "string" );

		expect( body.tags.length ).toBeGreaterThanOrEqual( 1 );
	});

	// ! Error Update Coment

	test( "Should return a not valid ID error - Update Coment", async() => {
	
		delete coment.id_profesor;

		const { status, body } = await request( app.getHttpServer() )
			.put( "/coment/123" )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Update Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/coment/" + comentID )
		.auth( "Token", { type: "bearer" } )
		.send( coment );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});
	
	test( "Should return user not found - Update Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/coment/" + comentID )
		.auth( badToken, { type: "bearer" } )
		.send( coment );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Usuario no encontrado" );
	});

	test( "Should return a not register coment error - Update Coment", async() => {
	
		delete coment.id_profesor;

		const { status, body } = await request( app.getHttpServer() )
			.put( "/coment/" + noRegisteredComentID )
			.auth( token, { type: "bearer" } )
			.send( coment );

		expect( status ).toBe( 404 );
		expect( body.message ).toBe( "El comentario no existe" );
	});

	// * Success Delete Coment

	// test( "Should delete a Coment", async() => {

	// 	const { status, body } = await request( app.getHttpServer() )
	// 		.delete( "/coment/" + comentDeleteID )
	// 		.auth( token, { type: "bearer" } );

	// 	console.log( body );

	// 	expect( status ).toBe( 200 );
	// 	expect( body.message ).toBe( "Comentario eliminado con éxito" );
	// });

	// ! Error Delete Teacher

	test( "Should return a not valid ID error - Delete Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/coment/123" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Delete Coment", async() => {

		const { status, body } = await request( app.getHttpServer() )
		.delete( "/coment/" + comentID )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return not permision to delete a Coment error", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/coment/" + noPermisionComentDelete )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No tienes permiso para eliminar este comentario" );
	});

	test( "Should return a not register coment error - Delete Coment", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/coment/" + noRegisteredComentID )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 404 );
		expect( body.message ).toBe( "El comentario no existe" );
	});

	afterAll( async () => { await app.close(); });
});
