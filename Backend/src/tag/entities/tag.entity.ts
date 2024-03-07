import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( "tag" )
export class Tag {

	@PrimaryGeneratedColumn( "uuid" )
	id: string

	@Column()
	nombre: string

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
