import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "User Endpoints", () => {
	
	let app: INestApplication;
	let token: string;
	let correctImage: Buffer;
	let wrongImage: Buffer;

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const data = fs.readFileSync( "./test/data/sample-jwt.json", "utf-8" );
		token = await JSON.parse( data ).token;

		correctImage = fs.readFileSync( "./test/data/profile-picture.jpg" );
		wrongImage = fs.readFileSync( "./test/data/profile-picture-big.png" );
	});

	// * Success File Update & Delete

	test( "Should return a successfull response - Update profile-picture", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.put( "/user/update/profile-picture" )
			.auth( token, { type: "bearer" } )
			.attach( "file", correctImage, {
				filename: "profile-picture.jpg",
				contentType: "image/jpg",
			});

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Foto recibida correctamente" );
		expect( body.foto_perfil ).toContain( "https://res.cloudinary.com/" );
	});

	test( "Should return a successfull response - Delete profile-picture", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/user/delete/profile-picture" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Foto eliminada correctamente" );
	});

	// ! Fail File Update & Delete

	test( "Should return invalid token error - Update profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/user/update/profile-picture" )
		.auth( "Token", { type: "bearer" } )
		.attach( "file", correctImage, {
			filename: "profile-picture.jpg",
			contentType: "image/jpg",
		});

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return invalid token error - Delete profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.delete( "/user/delete/profile-picture" )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return missing file error", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/user/update/profile-picture" )
		.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se subio ningun archivo" );
	});

	test( "Should return wrong file format error", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/user/update/profile-picture" )
		.auth( token, { type: "bearer" } )
		.attach( "file", correctImage, {
			filename: "profile-picture.txt",
			contentType: "text/plain",
		});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Tipo de archivo no permitido" );
	});

	test( "Should return file size error", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/user/update/profile-picture" )
		.auth( token, { type: "bearer" } )
		.attach( "file", wrongImage, {
			filename: "profile-picture-big.jpg",
			contentType: "image/jpg",
		});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El archivo es mayor a 2MB" );
	});

	afterAll( async () => { await app.close(); });
});
