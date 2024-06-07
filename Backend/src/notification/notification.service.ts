import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import * as webpush from "web-push";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./entities/notification.entity";
import { HandleErrors } from "../common/handle-errors";

@Injectable()
export class NotificationService {

	constructor(
		@InjectRepository( Notification )
		private notificationRepository: Repository< Notification >,
	){}

	async create( userID: string, procedureID: string, createNotificationDto: CreateNotificationDto ) {

		const { endpoint, expirationTime, keys } = createNotificationDto;

		try {

			const notificationExists = await this.notificationRepository.findOne({
				where: { procedureID, endpoint: createNotificationDto.endpoint }
			});

			if ( notificationExists ) 
				throw new BadRequestException( { mensaje: "El dispositivo ya esta registrado" } );

			// const endpoints = await this.notificationRepository
			// 	.createQueryBuilder( "usuarioEndpoint" )
			// 	.select( "DISTINCT usuarioEndpoint.endpoint", "endpoint" )
			// 	.where( "usuarioEndpoint.userID = :userID ", { userID })
			// 	.getRawMany();

			// if ( endpoints.length < 2 ) {

				const registerNotification = this.notificationRepository.create({
					userID,
					procedureID,
					endpoint,
					expirationTime,
					...keys,
				});

				await this.notificationRepository.save( registerNotification );
				
				return { mensaje: "Notificaciones activadas correctamente" };
			// }

			// endpoints.forEach( async ( endpoint ) => {


			// 	const registerNotification = this.notificationRepository.create({
			// 		userID,
			// 		procedureID,
			// 		endpoint: endpoint.endpoint,
			// 		expirationTime,
			// 		...keys,
			// 	});

			// 	await this.notificationRepository.save( registerNotification );
			// });

		} catch ( error ) { HandleErrors( error ); }
	}

	async findNotification( procedureID: string ) {

		try {
		
			const notifications = await this.notificationRepository.find({
				where: { procedureID }
			});

			return notifications;

		} catch ( error ) { HandleErrors( error ); }
	}

	async checkNotifications( userID: string, createNotificationDto: CreateNotificationDto ) {
		
		const { endpoint } = createNotificationDto;

		try {

			const endpointExists = await this.notificationRepository.find({
				where: { endpoint }
			});

			if ( endpointExists.length > 0 ) return { mensaje: "El dispositivo ya esta registrado" };
			
			const notificationsFound = await this.notificationRepository.find({
				where: { userID }
			});

			if ( notificationsFound.length === 0 ) return { mensaje: "No se encontraron notificaciones registradas" };

			const notificationsAux = new Map();

			notificationsFound.forEach( notification => {

				const notifyKey = `${ notification.userID }-${ notification.procedureID }`;
			
				if ( !notificationsAux.has( notifyKey ) )
					notificationsAux.set( notifyKey, notification );
			});
				
			const notificationsData = Array.from( notificationsAux.values() );

			notificationsData.forEach( async ( notification ) => {
				await this.create( notification.userID, notification.procedureID, createNotificationDto );
			});

			return { mensaje: "Comprobacion exitosa" }

		} catch ( error ) {  HandleErrors( error ); }
	}

	async checkProcedureNotification( userID: string, procedureID: string ) {
		
		try {

			const notification = await this.notificationRepository.findOne({
				where: { userID, procedureID }
			});

			if ( notification ) return true;

			return false;

		} catch ( error ) { HandleErrors( error ); }
	}

	async sendNotification( id: string, title: string, message: string ) {

		try {

			const notifications = await this.findNotification( id );


			const notify = notifications.map( async ( notification ) => {

				const subscription: CreateNotificationDto = {
					endpoint: notification.endpoint,
					expirationTime: null,
					keys: {
						p256dh: notification.p256dh,
						auth: notification.auth
					}
				}
	
				const payload = JSON.stringify({
					title,
					message
				});
	
				webpush.setVapidDetails(
					"mailto:jomiantoca2011@gmail.com",
					process.env.VAPID_PUBLIC_KEY,
					process.env.VAPID_PRIVATE_KEY
				);
	
				return await webpush.sendNotification( subscription, payload )
				.catch( error => { 
					console.log({ message: error.body, fault: error.endpoint });
					this.removeAll( error.endpoint );
				});
			});

			await Promise.all( notify );
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async sendAllNotification( message: string ) {

		try {

			// const notificationsFound = await this.notificationRepository.createQueryBuilder()
			// 	.select( "notification.endpoint" )
			// 	.distinct( true )
			// 	.execute();

			const notificationsFound = await this.notificationRepository.createQueryBuilder("notification")
				.select("DISTINCT notification.endpoint")
				.execute();

			const notificationsAux = notificationsFound.map( async ( notification: any ) => {
				return await this.notificationRepository.findOneBy({ endpoint: notification.endpoint });
			});
			
			const notifications = await Promise.all( notificationsAux );

			const notify = notifications.map( async ( notification ) => {

				const subscription: CreateNotificationDto = {
					endpoint: notification.endpoint,
					expirationTime: null,
					keys: {
						p256dh: notification.p256dh,
						auth: notification.auth
					}
				}
	
				const payload = JSON.stringify({
					title: "Nueva Tramite Disponible",
					message
				});
	
				webpush.setVapidDetails(
					"mailto:jomiantoca2011@gmail.com",
					process.env.VAPID_PUBLIC_KEY,
					process.env.VAPID_PRIVATE_KEY
				);
	
				return await webpush.sendNotification( subscription, payload )
				.catch( error => { 
					console.log({ message: error.body, fault: error.endpoint });
					this.removeAll( error.endpoint );
				});
			});

			await Promise.all( notify );

			// const notify = notifications.map( async ( notification ) => {

			// 	const subscription: CreateNotificationDto = {
			// 		endpoint: notification.endpoint,
			// 		expirationTime: null,
			// 		keys: {
			// 			p256dh: notification.p256dh,
			// 			auth: notification.auth
			// 		}
			// 	}
	
			// 	const payload = JSON.stringify({
			// 		title: "Nueva Notificacion",
			// 		message
			// 	});
	
			// 	webpush.setVapidDetails(
			// 		"mailto:jomiantoca2011@gmail.com",
			// 		process.env.VAPID_PUBLIC_KEY,
			// 		process.env.VAPID_PRIVATE_KEY
			// 	);
	
			// 	return await webpush.sendNotification( subscription, payload )
			// 	.catch( error => { 
			// 		console.log({ message: error.body, fault: error.endpoint });
			// 		this.removeAll( error.endpoint );
			// 	});
			// });

			// await Promise.all( notify );
			
		} catch ( error ) { console.log(error);  }
	}

	async remove( userID: string, procedureID: string ) {

		try {
			
			const notification = await this.notificationRepository.findOne({
				where: { userID, procedureID }
			});

			if ( !notification ) 
				throw new BadRequestException({ mensaje: "No se encontro ninguna subscripcion" });

			await this.notificationRepository.remove( notification );

			return { mensaje: "Subscripcion eliminada correctamente" };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async removeAll( endpoint: string ) {

		try {
			
			const notification = await this.notificationRepository.find({
				where: { endpoint }
			});

			if ( notification.length === 0 ) 
				throw new BadRequestException({ mensaje: "No se encontraron subscripciones" });

			const deleteNotifications = notification.map( async ( notify ) => {
				return await this.notificationRepository.remove( notify );
			});

			await Promise.all( deleteNotifications );

			return { mensaje: "Subscripciones eliminadas correctamente" };
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
