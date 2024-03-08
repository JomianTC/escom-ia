import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Tag Endpoints", () => {
	
	let app: INestApplication;
	let token: string;

	const updateTagID = "991cc8d2-4ec6-47aa-90f1-a809293276eb";
	const falseTagID = "980dde95-ec68-41bb-a4d3-4ca59e6a0cd2";
	let deleteTagID: string = "";
	let totalTags: number = 0;

	const newTag = { nombre: "Tag de prueba" }
	const updateTag = { nombre: require( "node:crypto").randomBytes( 10 ).toString( "hex" ) }

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const data = fs.readFileSync( "./test/data/sample-jwt.json", "utf-8" );
		token = await JSON.parse( data ).token;
	});

	// * Success Create Tag

	test( "Should create a new Tag", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/tag" )
			.auth( token, { type: "bearer" } )
			.send( newTag );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Tag creado correctamente" );
	});

	// ! Error Create Coment

	test( "Should return invalid token error - Create Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/tag" )
		.auth( "Token", { type: "bearer" } )
		.send( newTag );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	// * Success Get Tags

	test( "Should return an array of Tags with no pagination", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/tag" );

		expect( status ).toBe( 200 );

		expect( body.tags.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );

		totalTags = body.total;
	});
	
	test( "Should return an array of Tags with pagination Total", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/tag?page=1&limit=" + totalTags );

		expect( status ).toBe( 200 );

		expect( body.tags.length ).toBe( totalTags );
		expect( typeof body.total ).toBe( "number" );

		body.tags.forEach( tag => {
			if ( newTag.nombre.toLowerCase() === tag.nombre ) {
				deleteTagID = tag.id;
			}
		});
	});

	// ! Error Get Coments
	// ? No existen errores para esta ruta incluso si no hay comentarios registrados
	
	// * Success Update Coment

	test( "Should return a updated Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/tag/" + updateTagID )
			.auth( token, { type: "bearer" } )
			.send( updateTag );

		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Tag actualizado correctamente" );

		expect( body.tag ).toBeDefined();

		expect( typeof body.tag.id ).toBe( "string" );
		expect( typeof body.tag.nombre ).toBe( "string" );
		expect( body.tag.nombre ).toBe( updateTag.nombre.toLowerCase() );
	});

	// ! Error Update Coment

	test( "Should return a not valid ID error - Update Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/tag/123" )
			.auth( token, { type: "bearer" } )
			.send( updateTag );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Update Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/tag/" + updateTagID )
		.auth( "Token", { type: "bearer" } )
		.send( updateTag );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});
	
	test( "Should return a not register tag error - Update Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/tag/" + falseTagID )
			.auth( token, { type: "bearer" } )
			.send( updateTag );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El Tag no existe" );
	});

	// * Success Delete Coment

	test( "Should delete a Tag", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/tag/" + deleteTagID )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Tag eliminado correctamente" );
	});

	// ! Error Delete Teacher

	test( "Should return a not valid ID error - Delete Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/tag/123" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Delete Tag", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/tag/" + deleteTagID )
			.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not register tag error - Delete Tag", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/tag/" + falseTagID )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El Tag no existe" );
	});

	afterAll( async () => { await app.close(); });
});
