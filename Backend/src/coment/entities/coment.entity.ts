import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Entity( "Coment" )
export class Coment {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	id_profesor: string;

	@Column()
	puntuacion: number;

	@Column( "varchar", { length: 255 } )
	comentario: string;

	@Column( "date" )
	fecha: Date;
	
	@ManyToOne( 
		() => User,
		user => user.id,
		{ eager: true }
	)
	id_usuario: User;
}
