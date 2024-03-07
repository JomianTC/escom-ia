import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coment } from "../../coment/entities/coment.entity";

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

	@Column()
	contrasena: string;
	
	@Column({ unique: true })
	email_academico: string; 
	
	@Column({ unique: true })
	email_recuperacion: string;
	
	@Column()
	programa_academico: string;
	
	@Column({ default: "" })
	foto_perfil: string;

	@OneToMany(
		() => Coment,
		coment => coment.id_usuario,
	)
	coments: Coment[];

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
