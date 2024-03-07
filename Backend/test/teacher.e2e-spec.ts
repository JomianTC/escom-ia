import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Teacher Endpoints", () => {
	
	let app: INestApplication;
	let token: string;
	let correctImage: Buffer;
	let wrongImage: Buffer;

	const teacherID = "8b034d9b-15b9-4450-ae97-60b5aee7e2d5";
	const noRegisterTeacherID = "8b034d9b-15b9-4450-ae97-60b5aee7e2d1";
	const superSuFake = "2b87286c-03f8-482f-a5ed-433d6977a16b";
	let teacherDeleteID: string;

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

	// * Success Create Teacher

	test( "Should create a new Teacher and return the info", async() => {

		const newTeacher = {
			nombre: "Jose Luis",
			area: "Matematicas",
			grado_academico: "Doctor",
			email: "lapatata1231233333@gmail.com",
			contacto: "551234567822221231232"
		}

		const { status, body } = await request( app.getHttpServer() )
			.post( "/teacher" )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Profesor registrado exitosamente" );

		expect( typeof body.teacher.id ).toBe( "string" );
		expect( body.teacher.nombre ).toBe( newTeacher.nombre );
		expect( body.teacher.area ).toBe( newTeacher.area );
		expect( body.teacher.grado_academico ).toBe( newTeacher.grado_academico );
		expect( body.teacher.email ).toBe( newTeacher.email );
		expect( body.teacher.contacto ).toBe( newTeacher.contacto );
		expect( body.teacher.foto_perfil ).toBe( "" );

		teacherDeleteID = body.teacher.id;
	});

	// ! Error Create Teacher

	test( "Should return invalid token error - Create Teacher", async() => {
	
		const newTeacher = {
			nombre: "Jose Luis",
			area: "Matematicas",
			grado_academico: "Doctor",
			email: "lapatata@gmail.com",
			contacto: "5512345678"
		}

		const { status, body } = await request( app.getHttpServer() )
		.post( "/teacher" )
		.auth( "Token", { type: "bearer" } )
		.send( newTeacher );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return email already register - Create Teacher", async() => {
	
		const newTeacher = {
			nombre: "Jose Luis",
			area: "Matematicas",
			grado_academico: "Doctor",
			email: "nosupersu@gmail.com",
			contacto: "5512345678123"
		}

		const { status, body } = await request( app.getHttpServer() )
		.post( "/teacher" )
		.auth( token, { type: "bearer" } )
		.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El email ya está registrado" );
	});

	test( "Should return contacto already register - Create Teacher", async() => {
	
		const newTeacher = {
			nombre: "Jose Luis",
			area: "Matematicas",
			grado_academico: "Doctor",
			email: "lapatata@gmail.com",
			contacto: "5512345777"
		}

		const { status, body } = await request( app.getHttpServer() )
		.post( "/teacher" )
		.auth( token, { type: "bearer" } )
		.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El contacto ya está registrado" );
	});

	// * Success Get Teachers

	test( "Should return an array of teachers with no pagination", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/teacher" );

		expect( status ).toBe( 200 );

		expect( body.teachers.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of teachers with pagination 5", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/teacher?page=1&limit=5" );

		expect( status ).toBe( 200 );

		expect( body.teachers.length ).toBe( 5 );
		expect( typeof body.total ).toBe( "number" );
			
	});

	// ! Error Get Teachers
	// ? No existen errores para esta ruta incluso si no hay profesores registrados

	// * Success Get Teacher by ID

	test( "Should return a professor information", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/teacher/" + teacherID );

		expect( status ).toBe( 200 );

		expect( typeof body.id ).toBe( "string" );
		expect( typeof body.nombre ).toBe( "string" );
		expect( typeof body.area ).toBe( "string" );
		expect( typeof body.grado_academico ).toBe( "string" );
		expect( typeof body.email ).toBe( "string" );
		expect( typeof body.contacto ).toBe( "string" );
		expect( typeof body.foto_perfil ).toBe( "string" );
	});

	// ! Error Get Teacher by ID

	test( "Should return a not valid ID error - Get Teacher", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/teacher/123" );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return a not register professor error - Get Teacher", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/teacher/" + noRegisterTeacherID );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});
	
	// * Success Update Teacher

	test( "Should return an updated teacher", async() => {
	
		const newTeacher = {
			nombre: "Adrian Edgardo Franco",
			area: "Sistemas computacionales",
			grado_academico: "Doctor",
			email: "eafranco777@gmail.com",
			contacto: "5512345777"
		}

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/" + teacherID )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 200 );

		expect( body.message ).toBe( "Profesor actualizado exitosamente" );

		expect( typeof body.teacher.id ).toBe( "string" );
		expect( body.teacher.nombre ).toBe( newTeacher.nombre );
		expect( body.teacher.area ).toBe( newTeacher.area );
		expect( body.teacher.grado_academico ).toBe( newTeacher.grado_academico );
		expect( body.teacher.email ).toBe( newTeacher.email );
		expect( body.teacher.contacto ).toBe( newTeacher.contacto );
		expect( typeof body.teacher.foto_perfil ).toBe( "string" );		
	});

	// ! Error Update Teacher

	test( "Should return email already register - Update Teacher", async() => {
	
		const newTeacher = {
			nombre: "Adrian Edgardo Franco",
			area: "Sistemas computacionales",
			grado_academico: "Doctor",
			email: "nosupersu@gmail.com",
			contacto: "55123457771"
		}

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/" + teacherID )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El email ya está registrado" );
	});

	test( "Should return contacto already register - Update Teacher", async() => {
	
		const newTeacher = {
			nombre: "Adrian Edgardo Franco",
			area: "Sistemas computacionales",
			grado_academico: "Doctor",
			email: "eafranco77769@gmail.com",
			contacto: "6666666666"
		}

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/" + teacherID )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El contacto ya está registrado" );
	});

	test( "Should return a not valid ID error - Update Teacher", async() => {
	
		const newTeacher = {
			nombre: "Adrian Edgardo Franco",
			area: "Sistemas computacionales",
			grado_academico: "Doctor",
			email: "eafranco777@gmail.com",
			contacto: "5512345777"
		}

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/123" )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return a not register professor error - Update Teacher", async() => {
	
		const newTeacher = {
			nombre: "Adrian Edgardo Franco",
			area: "Sistemas computacionales",
			grado_academico: "Doctor",
			email: "eafranco777@gmail.com",
			contacto: "5512345777"
		}

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/" + noRegisterTeacherID )
			.auth( token, { type: "bearer" } )
			.send( newTeacher );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});

	test( "Should return invalid token error - Update Teacher", async() => {
	
		const newTeacher = {
			nombre: "Jose Luis",
			area: "Matematicas",
			grado_academico: "Doctor",
			email: "lapatata@gmail.com",
			contacto: "5512345678"
		}

		const { status, body } = await request( app.getHttpServer() )
		.put( "/teacher/" + teacherID )
		.auth( "Token", { type: "bearer" } )
		.send( newTeacher );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	// * Success Delete Teacher

	test( "Should delete a teacher", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/" + teacherDeleteID )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Profesor eliminado exitosamente" );
	});

	// ! Error Delete Teacher

	test( "Should return a not valid ID error - Delete Teacher", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/123" )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return a not register professor error - Delete Teacher", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/" + noRegisterTeacherID )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});

	test( "Should return invalid token error - Delete Teacher", async() => {

		const { status, body } = await request( app.getHttpServer() )
		.delete( "/teacher/" + teacherID )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	// * Success File Update & Delete

	test( "Should return a successfull response - Update profile-picture", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/profile-picture/" + superSuFake )
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
			.delete( "/teacher/profile-picture/" + superSuFake )
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Foto eliminada correctamente" );
	});

	// ! Fail File Update & Delete

	test( "Should return a not valid ID error - Update profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/profile-picture/123" )
			.auth( token, { type: "bearer" } )
			.attach( "file", correctImage, {
				filename: "profile-picture.jpg",
				contentType: "image/jpg",
			});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return a not register professor error - Update profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/teacher/profile-picture/" + noRegisterTeacherID )
			.auth( token, { type: "bearer" } )
			.attach( "file", correctImage, {
				filename: "profile-picture.jpg",
				contentType: "image/jpg",
			});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});

	test( "Should return a not valid ID error - Delete profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/profile-picture/123" )
			.auth( token, { type: "bearer" } )
			.attach( "file", correctImage, {
				filename: "profile-picture.jpg",
				contentType: "image/jpg",
			});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return a not register professor error - Delete profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/teacher/profile-picture/" + noRegisterTeacherID )
			.auth( token, { type: "bearer" } )
			.attach( "file", correctImage, {
				filename: "profile-picture.jpg",
				contentType: "image/jpg",
			});

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Profesor no registrado" );
	});

	test( "Should return invalid token error - Update profile-picture", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/teacher/profile-picture/" + superSuFake )
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
		.delete( "/teacher/profile-picture/" + superSuFake )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return missing file error", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/teacher/profile-picture/" + superSuFake )
		.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se subio ningun archivo" );
	});

	test( "Should return wrong file format error", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.put( "/teacher/profile-picture/" + superSuFake )
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
		.put( "/teacher/profile-picture/" + superSuFake )
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
