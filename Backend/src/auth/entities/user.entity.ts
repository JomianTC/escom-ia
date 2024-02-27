import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "User" )
export class User {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombres: string;
	
	@Column()
	apellidos: string;
	
	@Column({ unique: true })
	boleta: string;
	
	@Column({ unique: true })
	email_academico: string; 
	
	@Column({ unique: true })
	email_recuperacion: string;
	
	@Column()
	programa_academico: string;
	
	@Column({ default: "" })
	foto_perfil: string;

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email_academico = this.email_academico.toLowerCase().trim();
		this.email_recuperacion = this.email_recuperacion.toLowerCase().trim();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
