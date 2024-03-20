import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Notification" )
export class Notification {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	userID: string;

	@Column()
	procedureID: string;
	
	@Column()
	endpoint: string;
	
	@Column({ nullable: true, default: null })
	expirationTime: string;
	
	@Column()
	p256dh: string;
	
	@Column()
	auth:   string;
}
