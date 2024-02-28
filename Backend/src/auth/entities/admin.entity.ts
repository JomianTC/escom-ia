import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Administrator" )
export class Administrator {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;

	@Column({ unique: true })
	email: string; 

	@Column({ unique: true })
	identificador: string;
	
	@Column()
	area: string;
	
	@Column({ default: "" })
	foto_perfil: string;

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email = this.email.toLowerCase().trim();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
