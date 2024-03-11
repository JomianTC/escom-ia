import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Tramite" )
export class Procedure {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;

	@Column()
	descripcion: string;

	@Column()
	fechaInicio: Date;
	
	@Column()
	fechaTermino: Date;
	
	@Column()
	estado: boolean;
	
	@Column()
	esInformativo: boolean;

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
