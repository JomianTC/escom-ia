import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Teacher" )
export class Teacher {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;
	
	@Column()
	area: string;
	
	@Column()
	grado_academico: string;
	
	@Column({ unique: true })
	email: string;
	
	@Column({ unique: true })
	contacto: string;
	
	@Column({ default: "" })
	foto_perfil: string;

	@Column(
		"decimal", 
		{ 
			precision: 5, 
			scale: 2, 
			default: 0
		}
	)
	calificacion: number;

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email = this.email.toLowerCase().trim();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
