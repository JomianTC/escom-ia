import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Procedure Endpoints", () => {
	
	let app: INestApplication;
	let token: string;
	let adminToken: string;
	const adminTokenNoProcedure = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdGF0YUBpcG4ubXgiLCJpYXQiOjE3MTAzODE0MzQsImV4cCI6MjA3MDM3NzgzNH0.Mt34BEWgS-MFFpJFwJIIKXABj2JZetiaCZgUfiFb0jo";
	const adminTokenNoExists = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExMUBpcG4ubXgiLCJpYXQiOjE3MTAzODE0OTQsImV4cCI6MjA3MDM3Nzg5NH0.rOjarQptcV7cHHlvZG7eQ3Az83BzonJli9FakIqxcJ8";

	const procedureWithReqId = "344a07fe-db26-48a3-92e4-88300a805ff7";
	const procedureWithoutReqId = "a0ebd616-c323-42ec-8e31-5f3cab44b8ba";

	const updateProcedureId = "87ded2a6-7a59-4b05-9dcb-4b5dbbb78790";
	const falseUpdateProcedureId = "87ded2a6-7a59-4b05-9dcb-4b5dbbb78791";
	const deleteProcedureId = "cf03d445-d33d-4b2c-8dd9-1b697c333c9a";

	const newProcedure = {
		nombre: "LasPatatas2",
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
		nombre: "VOIDDRIFTER299",
		descripcion: "Este tramite no hace nada",
		fechaInicio: "2024-6-11",
		fechaTermino: "2024-6-12",
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

		const dataAdmin = fs.readFileSync( "./test/data/sample-jwt-admin.json", "utf-8" );
		adminToken = await JSON.parse( dataAdmin ).token;
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
	
	test( "Should return an array of procedures with pagination 5", async() => {

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
		expect( body.requirements.length ).toBeGreaterThanOrEqual( 1 );
	});
	
	test( "Should return a procedure without requirements", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/" + procedureWithoutReqId );

		expect( status ).toBe( 200 );
		
		expect( body.procedure ).toBeDefined();
		expect( body.requirements ).toBeDefined();
		expect( body.requirements.length ).toBe( 1 );
		expect( body.requirements[0] ).toBe( "Sin requerimientos" );
	});

	// ! Error Get Procedure By ID
	test( "Should return a not valid ID error - Get Procedure By ID", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/123" )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});
	
	test( "Should return a not register procedure error - Get Procedure By ID", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/" + falseUpdateProcedureId )

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	// ? Admin endpoints -------------------------------------------------------------------

	// * Success Create Procedure

	test( "Should create a new Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure" )
			.auth( adminToken, { type: "bearer" } )
			.send( newProcedure );

			expect( body.message ).toBe( "Trámite creado correctamente" );
			expect( status ).toBe( 201 );
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

			expect( body.message ).toBe( "Trámite actualizado correctamente" );
			expect( status ).toBe( 200 );
	});

	test( "Should return a updated Procedure with no date", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/" + updateProcedureId )
			.auth( token, { type: "bearer" } )
			.send({
				nombre: "VOIDDRIFTER2X",
				descripcion: "Este tramite no hace nada",
				esInformativo: true,
				requerimentos: [
					"f2e146d3-a444-4313-a635-e71f4302d752",
					"339e7d04-d86d-4e64-90eb-6c03163b643c",
					"295bffde-7374-4332-b460-1d314df18d99"
				]
			} );

			expect( body.message ).toBe( "Trámite actualizado correctamente" );
			expect( status ).toBe( 200 );
	});

	test( "Should return a updated Procedure only dates", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/" + updateProcedureId )
			.auth( token, { type: "bearer" } )
			.send({
				fechaInicio: "2024-6-11",
				fechaTermino: "2024-6-12",
				requerimentos: [
					"f2e146d3-a444-4313-a635-e71f4302d752",
					"339e7d04-d86d-4e64-90eb-6c03163b643c",
					"295bffde-7374-4332-b460-1d314df18d99"
				]
			} );

			expect( body.message ).toBe( "Trámite actualizado correctamente" );
			expect( status ).toBe( 200 );
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
	
	test( "Should return a not register procedure error - Update Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.put( "/procedure/" + falseUpdateProcedureId )
			.auth( token, { type: "bearer" } )
			.send( updatedProcedure );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	// * Success Delete Procedure

	test( "Should activate a Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.send({ estado: true })
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "El Trámite ahora esta activo" );
	});

	test( "Should delete a Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.send({ estado: false })
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "El Trámite ahora esta inactivo" );
	});

	// ! Error Delete Procedure

	test( "Should return a not valid ID error - Delete Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/123" )
			.send({ estado: true })
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});

	test( "Should return invalid token error - Delete Procedure", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.send({ estado: true })
			.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not register procedure error - Delete Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + falseUpdateProcedureId )
			.send({ estado: true })
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	test( "Should return procedure cant change status - Delete Procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/" + deleteProcedureId )
			.send({ estado: false })
			.auth( token, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El trámite no puede cambiar de estado" );
	});

	// * Success Find All With Permissions
	test( "Should return an array of procedures with no pagination - Permission", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/findAll" )
			.auth( adminToken, { type: "bearer" } );

		expect( status ).toBe( 200 );

		expect( body.tramites.length ).toBe( 10 );
		expect( typeof body.total ).toBe( "number" );
	});
	
	test( "Should return an array of procedures with pagination 5 - Permission", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/findAll?page=1&limit=5" )
			.auth( adminToken, { type: "bearer" } );

		expect( status ).toBe( 200 );

		expect( body.tramites.length ).toBe( 5 );
		expect( typeof body.total ).toBe( "number" );
	});

	// ! Fail Find All With Permissions
	test( "Should return invalid token error - Find All Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.get( "/procedure/admin/findAll" )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return admins doesnt exists - Find All Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.get( "/procedure/admin/findAll" )
		.auth( adminTokenNoExists, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return no procedures - Find All Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.get( "/procedure/admin/findAll" )
		.auth( adminTokenNoProcedure, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontraron trámites" );
	});

	// * Success Find One With Permissions
	test( "Should return a procedure - Find One Permission", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } );

		expect( status ).toBe( 200 );
		
		expect( body.tramite ).toBeDefined();
		expect( body.requerimientos ).toBeDefined();
	});

	// ! Fail Find One With Permissions
	test( "Should return invalid token error - Find One Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.get( "/procedure/admin/" + procedureWithReqId )
		.auth( "Token", { type: "bearer" } );

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not valid ID error - Find One Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/123" )
			.auth( adminToken, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});
	
	test( "Should return a not register procedure error - Find One Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/" + falseUpdateProcedureId )
			.auth( adminToken, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	test( "Should return admin doesnt exists - Find One Permission", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.get( "/procedure/admin/" + procedureWithReqId )
		.auth( adminTokenNoExists, { type: "bearer" } );

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return admin doesnt have permission - Find One Permission", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/procedure/admin/" + procedureWithReqId )
			.auth( adminTokenNoProcedure, { type: "bearer" } );

		expect( status ).toBe( 400 );
		
		expect( body.message ).toBe( "No se encontró el permiso" );
	});

	// * Success Grant Admin Permissions
	test( "Should grant admin permissions - Grant Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });
		
		expect( status ).toBe( 201 );
		expect( body.message ).toBe( "Permisos otorgados correctamente" );
	});

	// ! Fail Grant Admin Permissions
	test( "Should return invalid token error - Grant Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/procedure/admin/" + procedureWithReqId )
		.auth( "Token", { type: "bearer" } )
		.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not valid ID error - Grant Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/123" )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@alumno.ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});
	
	test( "Should return a not register procedure error - Grant Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/" + falseUpdateProcedureId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	test( "Should return admin doesnt exists - Grant Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.post( "/procedure/admin/" + procedureWithReqId )
		.auth( adminTokenNoExists, { type: "bearer" } )
		.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return admin doesnt have permission - Grant Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/" + procedureWithReqId )
			.auth( adminTokenNoProcedure, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el permiso" );
	});

	test( "Should return admin who request permission doesnt exits - Grant Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return admin already has permission - Grant Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.post( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El administrador ya tiene permisos" );
	});
	
	// * Success Revoke Admin Permissions
	test( "Should revoke admin permissions - Revoke Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });
		
		expect( status ).toBe( 200 );
		expect( body.message ).toBe( "Permisos revocados correctamente" );
	});

	// ! Fail Revoke Admin Permissions
	test( "Should return invalid token error - Revoke Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.delete( "/procedure/admin/" + procedureWithReqId )
		.auth( "Token", { type: "bearer" } )
		.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 401 );
		expect( body.message ).toBe( "Token no valido" );
	});

	test( "Should return a not valid ID error - Revoke Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/123" )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@alumno.ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
	});
	
	test( "Should return a not register procedure error - Revoke Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/" + falseUpdateProcedureId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el trámite" );
	});

	test( "Should return admin doesnt exists - Revoke Admin Permissions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.delete( "/procedure/admin/" + procedureWithReqId )
		.auth( adminTokenNoExists, { type: "bearer" } )
		.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return admin doesnt have permission - Revoke Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/" + procedureWithReqId )
			.auth( adminTokenNoProcedure, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "No se encontró el permiso" );
	});

	test( "Should return admin who request permission dosnt exits - Revoke Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "Administrador no encontrado" );
	});

	test( "Should return admin never has permission - Revoke Admin Permissions", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.delete( "/procedure/admin/" + procedureWithReqId )
			.auth( adminToken, { type: "bearer" } )
			.send({ email: "jtorresc1600@ipn.mx" });

		expect( status ).toBe( 400 );
		expect( body.message ).toBe( "El administrador nunca tuvo permisos" );
	});

	afterAll( async () => { await app.close(); });
});
