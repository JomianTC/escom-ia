import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Requirement" )
export class Requirement {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;
	
	@Column()
	descripcion: string;

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
