import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Notification_Keys" )
export class NotificationKeys {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	procedureID: string;
	
	@Column()
	privateKey: string;
	
	@Column()
	publicKey: string;	
}
