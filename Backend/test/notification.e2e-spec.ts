import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as fs from "fs";

import { AppModule } from "../src/app.module";

describe( "Notifications Endpoints", () => {
	
	let app: INestApplication;
	let token: string;

	const subscriptionData = {
		endpoint: "https://fcm.googleapis.com/fcm/send/f_i877dHmsw:APA91bGBpRQenw13Ts_2_65S8EUn66CJajr0bNbUBBUG5tXD608u6xUZq54Qae0JNdiRUI7u2CCBh6ccg7rqt8GvUu3cI88hliaWjoSUhNWmf0f4sEcNcXXVxJBAcbiAACZjBTH0GbiA",
		expirationTime: null,
		keys: {
			p256dh: "BD_58mwcRy6fvXFRt_zVYG6SYd24cWtYGIyEdmlofQU7zP2jwOJUjbqLR_XUamvb1itHFlfXGoZRgCgEBIy4ftk",
			auth: "T0BvcgrrEA5OvAi9--TSTw"
		}
	};

	const subscriptionDataAlt = {
		endpoint: "qweqwe",
		expirationTime: null,
		keys: {
			p256dh: "qweqwe",
			auth: "qweqwe"
		}
	};
	
	const subscribedProcedureId = "813df822-7c90-4bcd-a31b-170d86e33f8a";
	const noSubscribedProcedureId = "04400c82-d698-47ef-8aec-4128c5f01333";
	const noRegisteredProcedure = "04400c82-d698-47ef-8aec-4128c5f01331";

	beforeAll( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ AppModule ],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const data = fs.readFileSync( "./test/data/sample-jwt.json", "utf-8" );
		token = await JSON.parse( data ).token;
	});

	// * Success Get Vapid Key

	test( "Should return the Vapid Key for Notification", async() => {

		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/key" )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "Llave enviada correctamente" );
		expect( typeof body.publicKey ).toBe( "string" );

		expect( status ).toBe( 200 );
	});

	// ! Error Get Vapid Key

	test( "Should return invalid token error - Get Vapid Key", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/key" )
			.auth( "Token", { type: "bearer" } );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	// * Success create Subscription

	test( "Should create a subscription for a procedure", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/subscription/" + subscribedProcedureId )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "Suscripcion creada correctamente" );
		expect( status ).toBe( 201 );
	});	
	
	// ! Error create Subscription

	test( "Should return invalid token error - Create Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/subscription/" + subscribedProcedureId )
			.auth( "token", { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	test( "Should return a not valid ID error - Create Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/subscription/123" )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
		expect( status ).toBe( 400 );
	});
	
	test( "Should return a not register procedure error - Create Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/subscription/" + noRegisteredProcedure )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "No se encontró el trámite" );
		expect( status ).toBe( 400 );
	});

	test( "Should return subscription already exist", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/subscription/" + subscribedProcedureId )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "El dispositivo ya esta registrado" );
		expect( status ).toBe( 400 );
	});	

	// * Success Check Subscription

	test( "Should check a subscription existance - Subscription Exits", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/subscription/" + subscribedProcedureId )
			.auth( token, { type: "bearer" } );

		expect( body.isActivated ).toBe( true );
		expect( status ).toBe( 200 );
	});	

	test( "Should check a subscription existance - Subscription No Exits", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/subscription/" + noSubscribedProcedureId )
			.auth( token, { type: "bearer" } );

		expect( body.isActivated ).toBe( false );
		expect( status ).toBe( 200 );
	});
	
	// ! Error Check Subscription

	test( "Should return invalid token error - Subscription existance", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/subscription/" + noSubscribedProcedureId )
			.auth( "token", { type: "bearer" } );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	test( "Should return a not valid ID error - Subscription existance", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/subscription/123" )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
		expect( status ).toBe( 400 );
	});
	
	test( "Should return a not register procedure error - Subscription existance", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.get( "/notification/subscription/" + noRegisteredProcedure )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "No se encontró el trámite" );
		expect( status ).toBe( 400 );
	});

	// * Success Check Device Subscription

	test( "Should check if the device is not registered - Is registered", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/checkDevice" )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "El dispositivo ya esta registrado" );
		expect( status ).toBe( 201 );
	});

	test( "Should check if the device is not registered - Is not registered with no notifications", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/checkDevice" )
			.auth( token, { type: "bearer" } )
			.send( subscriptionDataAlt );

		expect( body.message ).toBe( "No se encontraron notificaciones registradas" );
		expect( status ).toBe( 200 );
	});

	test( "Should check if the device is not registered - Is not registered with notifications", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/checkDevice" )
			.auth( token, { type: "bearer" } )
			.send( subscriptionDataAlt );

		expect( body.message ).toBe( "Comprobacion exitosa" );
		expect( status ).toBe( 200 );
	});
	
	// ! Error Check Device Subscription

	test( "Should return invalid token error - Subscription existance", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.post( "/notification/checkDevice" )
			.auth( "token", { type: "bearer" } )
			.send( subscriptionData );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	// * Success Delete Subscription

	test( "Should delete a Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/" + subscribedProcedureId )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "Subscripcion eliminada correctamente" );
		expect( status ).toBe( 200 );
	});

	// ! Error Delete Subscription

	test( "Should return invalid token error - Delete Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/" + subscribedProcedureId )
			.auth( "token", { type: "bearer" } );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	test( "Should return a not valid ID error - Delete Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/123" )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "Validation failed (uuid is expected)" );
		expect( status ).toBe( 400 );
	});
	
	test( "Should return a not register procedure error - Delete Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/" + noRegisteredProcedure )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "No se encontró el trámite" );
		expect( status ).toBe( 400 );
	});

	test( "Should return no subscription found - Delete Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/" + noSubscribedProcedureId )
			.auth( token, { type: "bearer" } );

		expect( body.message ).toBe( "No se encontro ninguna subscripcion" );
		expect( status ).toBe( 400 );
	});

	// * Success Delete All Subscriptions

	test( "Should delete all Subscriptions", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
			.delete( "/notification/subscription/delete/all" )
			.auth( token, { type: "bearer" } )
			.send( subscriptionData );

			expect( body.message ).toBe( "Subscripciones eliminadas correctamente" );
			expect( status ).toBe( 200 );
	});

	// ! Error Delete Subscription

	test( "Should return invalid token error - Delete All Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.delete( "/notification/subscription/delete/all" )
		.auth( "token", { type: "bearer" } )
		.send( subscriptionData );

		expect( body.message ).toBe( "Token no valido" );
		expect( status ).toBe( 401 );
	});

	test( "Should return no subscriptions found - Delete All Subscription", async() => {
	
		const { status, body } = await request( app.getHttpServer() )
		.delete( "/notification/subscription/delete/all" )
		.auth( token, { type: "bearer" } )
		.send( subscriptionData );

		expect( body.message ).toBe( "No se encontraron subscripciones" );
		expect( status ).toBe( 400 );
	});

	afterAll( async () => { await app.close(); });
});
