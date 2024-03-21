import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
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

			const registerNotification = this.notificationRepository.create({
				userID,
				procedureID,
				endpoint,
				expirationTime,
				...keys,
			});

			await this.notificationRepository.save( registerNotification );

			return { message: "Notificaciones activadas correctamente" };

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

			if ( endpointExists.length > 0 ) return { message: "El dispositivo ya esta registrado" };
			
			const notificationsFound = await this.notificationRepository.find({
				where: { userID }
			});

			if ( notificationsFound.length === 0 ) return { message: "No se encontraron notificaciones registradas" };

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

			return { message: "Comprobacion exitosa" }

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

	async sendNotification( id: string, message: string ) {

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
					title: "Nueva Notificacion",
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

	async remove( userID: string, procedureID: string ) {

		try {
			
			const notification = await this.notificationRepository.findOne({
				where: { userID, procedureID }
			});

			if ( !notification ) 
				return { message: "No se encontro ninguna subscripcion" };

			await this.notificationRepository.remove( notification );

			return { message: "Subscripcion eliminada correctamente" };
			
		} catch ( error ) { HandleErrors( error ); }
	}

	async removeAll( endpoint: string ) {

		try {
			
			const notification = await this.notificationRepository.find({
				where: { endpoint }
			});

			if ( notification.length === 0 ) 
				return { message: "No se encontraron subscripciones" };

			const deleteNotifications = notification.map( async ( notify ) => {
				return await this.notificationRepository.remove( notify );
			});

			await Promise.all( deleteNotifications );

			return { message: "Subscripciones eliminadas correctamente" };
			
		} catch ( error ) { HandleErrors( error ); }
	}
}
