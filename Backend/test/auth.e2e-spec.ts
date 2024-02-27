import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe( "Auth Endpoints", () => {
	
	let app: INestApplication;

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	test( "Should return a register User", async() => {

		const registerUser = {
			nombres: "Josehf Miguel Angel",
			apellidos: "Torres Carrillo",
			boleta: "2020630497",
			email_academico: "jtorresc1600@alumno.ipn.mx",
			email_recuperacion: "jomiantoca2011@gmail.com",
			programa_academico: "ISC09"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register" )
			.send( registerUser )

		expect( status ).toBe( 201 );

		expect( body.message ).toBe( "Usuario registrado con exito!" );
		
		expect( body.user ).toBeDefined();
		
		expect( typeof body.user.id ).toBe( "string" );
		expect( body.user.nombres ).toBe( registerUser.nombres );
		expect( body.user.apellidos).toBe( registerUser.apellidos );
		expect( body.user.email_academico ).toBe( registerUser.email_academico );
		expect( body.user.email_recuperacion ).toBe( registerUser.email_recuperacion );
		expect( body.user.programa_academico ).toBe( registerUser.programa_academico );
		expect( body.user.foto_perfil ).toBe( "" );
	});

	test( "Should return a login User", async() => {

		const loginUser = {
			email_academico: "jtorresc1600@alumno.ipn.mx",
			boleta: "2020630497"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login" )
			.send( loginUser )
		
		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Inicio de sesión exitoso!" );
		
		expect( body.user ).toBeDefined();
		
		expect( typeof body.user.id ).toBe( "string" );
		expect( typeof body.user.nombres ).toBe( "string" )
		expect( typeof body.user.apellidos).toBe( "string" )
		expect( body.user.email_academico ).toContain( "@alumno.ipn.mx" )
		expect( typeof body.user.email_recuperacion ).toBe( "string" )
		expect( typeof body.user.programa_academico ).toBe( "string" )
		expect( body.user.foto_perfil ).toBe( "" );

		expect( body.token ).toBeDefined();

		expect( body.token ).toContain( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" );
	});

	afterAll( async () => { await app.close(); });
});
