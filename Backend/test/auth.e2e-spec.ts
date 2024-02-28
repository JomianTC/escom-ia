import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe( "Auth User Endpoints", () => {
	
	let app: INestApplication;

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// * Success Register User

	test( "Should return a register User", async() => {

		const registerUser = {
			nombres: "Josehf Miguel Angel",
			apellidos: "Torres Carrillo",
			boleta: "2020630497",
			contrasena: "Abcd1234+",
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
		expect( body.user.boleta ).toBe( registerUser.boleta );
		expect( body.user.email_academico ).toBe( registerUser.email_academico );
		expect( body.user.email_recuperacion ).toBe( registerUser.email_recuperacion );
		expect( body.user.programa_academico ).toBe( registerUser.programa_academico );
		expect( body.user.foto_perfil ).toBe( "" );
	});

	// ! Error Register User

	test( "Should return user already exists error", async() => {

		const registerUser = {
			nombres: "Josehf Miguel Angel",
			apellidos: "Torres Carrillo",
			boleta: "2020630497",
			contrasena: "Abcd1234+",
			email_academico: "jtorresc1600@alumno.ipn.mx",
			email_recuperacion: "jomiantoca2011@gmail.com",
			programa_academico: "ISC09"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register" )
			.send( registerUser )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Usuario ya registrado" );
	});

	test( "Should return internal server error - Duplicate email_academico", async() => {

		const registerUser = {
			nombres: "Josehf Miguel Angel",
			apellidos: "Torres Carrillo",
			boleta: "AAAAAAAAAA",
			contrasena: "Abcd1234+",
			email_academico: "jtorresc1600@alumno.ipn.mx",
			email_recuperacion: "something@gmail.com",
			programa_academico: "ISC09"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register" )
			.send( registerUser )

		expect( status ).toBe( 500 );
		expect( body.message ).toBe( "Internal Server Error" );
	});

	test( "Should return internal server error - Duplicate email_recuperacion", async() => {

		const registerUser = {
			nombres: "Josehf Miguel Angel",
			apellidos: "Torres Carrillo",
			boleta: "AAAAAAAAAA",
			contrasena: "Abcd1234+",
			email_academico: "something@alumno.ipn.mx",
			email_recuperacion: "jomiantoca2011@gmail.com",
			programa_academico: "ISC09"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register" )
			.send( registerUser )

		expect( status ).toBe( 500 );
		expect( body.message ).toBe( "Internal Server Error" );
	});

	test( "Should return internal server error - Missing parameter User", async() => {

		const registerUser = {
			apellidos: "Torres Carrillo",
			boleta: "AAAAAAAAAA",
			contrasena: "Abcd1234+",
			email_academico: "something@alumno.ipn.mx",
			email_recuperacion: "blabla@gmail.com",
			programa_academico: "ISC09"
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register" )
			.send( registerUser )

		expect( status ).toBe( 500 );
		expect( body.message ).toBe( "Internal Server Error" );
	});

	// * Success Login User

	test( "Should return a login User", async() => {

		const loginUser = {
			boleta: "2020630497",
			contrasena: "Abcd1234+",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login" )
			.send( loginUser )
		
		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Inicio de sesión exitoso!" );
		
		expect( body.user ).toBeDefined();
		
		expect( typeof body.user.id ).toBe( "string" );
		expect( typeof body.user.nombres ).toBe( "string" )
		expect( typeof body.user.apellidos ).toBe( "string" )
		expect( typeof body.user.boleta ).toBe( "string" )
		expect( body.user.email_academico ).toContain( "@alumno.ipn.mx" )
		expect( typeof body.user.email_recuperacion ).toBe( "string" )
		expect( typeof body.user.programa_academico ).toBe( "string" )
		expect( body.user.foto_perfil ).toBe( "" );

		expect( body.token ).toBeDefined();

		expect( body.token ).toContain( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" );
	});

	// ! Error Login User

	test( "Should return user not found error", async() => {

		const loginUser = {
			boleta: "MissingUser",
			contrasena: "Abcd1234+",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login" )
			.send( loginUser )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Usuario no encontrado" );
	});

	test( "Should return wrong user password error", async() => {

		const loginUser = {
			boleta: "2020630497",
			contrasena: "AAAAAAAAAA",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login" )
			.send( loginUser )

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Contraseña incorrecta" );
	});

	afterAll( async () => { await app.close(); });
});

describe( "Auth Admin Endpoints", () => {
	
	let app: INestApplication;

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// * Success Register Admin

	test( "Should return a register Admin", async() => {

		const registerAdmin = {
			identificador: "2020630497",
			nombre: "Zarate",
			email: "jtorresc1600@ipn.mx",
			area: "Sistemas",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register/admin" )
			.send( registerAdmin )

		expect( status ).toBe( 201 );

		expect( body.message ).toBe( "Administrador registrado con exito!" );
		
		expect( body.admin ).toBeDefined();
		
		expect( typeof body.admin.id ).toBe( "string" );
		expect( body.admin.nombre ).toBe( registerAdmin.nombre );
		expect( body.admin.email ).toBe( registerAdmin.email );
		expect( body.admin.foto_perfil ).toBe( "" );
	});

	// ! Error Register Admin

	test( "Should return admin already exists error", async() => {

		const registerAdmin = {
			identificador: "2020630497",
			nombre: "Zarate",
			email: "jtorresc1600@ipn.mx",
			area: "Sistemas",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register/admin" )
			.send( registerAdmin )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador ya registrado" );
	});

	test( "Should return internal server error - Missing parameter Admin", async() => {

		const registerAdmin = {
			identificador: "2020630497",
			email: "something@ipn.mx",
			area: "Sistemas",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/register/admin" )
			.send( registerAdmin )

		expect( status ).toBe( 500 );
		expect( body.message ).toBe( "Internal Server Error" );
	});

	// * Success Login Admin

	test( "Should return a login Admin", async() => {

		const loginAdmin = {
			email: "jtorresc1600@ipn.mx",
			identificador: "2020630497",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login/admin" )
			.send( loginAdmin )
		
		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Inicio de sesión exitoso!" );
		
		expect( body.admin ).toBeDefined();
		
		expect( typeof body.admin.id ).toBe( "string" );
		expect( typeof body.admin.nombre ).toBe( "string" )
		expect( body.admin.email ).toContain( "@ipn.mx" )
		expect( body.admin.foto_perfil ).toBe( "" );

		expect( body.token ).toBeDefined();

		expect( body.token ).toContain( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" );
	});

	// ! Error Login Admin

	test( "Should return admin not found error", async() => {

		const loginAdmin = {
			email: "something@ipn.mx",
			identificador: "2020630497",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login/admin" )
			.send( loginAdmin )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return wrong admin password error", async() => {

		const loginAdmin = {
			email: "jtorresc1600@ipn.mx",
			identificador: "AAAAAAAAAA",
		};

		const { status, body } = await request( app.getHttpServer() )
			.post( "/auth/login/admin" )
			.send( loginAdmin )

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Identificador incorrecto" );
	});

	afterAll( async () => { await app.close(); });
});
