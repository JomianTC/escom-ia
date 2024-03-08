import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagComent } from "../../tag_coment/entities/tag_coment.entity";

@Entity( "tag" )
export class Tag {

	@PrimaryGeneratedColumn( "uuid" )
	id: string

	@Column()
	nombre: string

	@OneToMany(
		() => TagComent,
		tagComent => tagComent.id,
	)
	tagComent: TagComent[]

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
