import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Coment } from "../../coment/entities/coment.entity";
import { Tag } from "../../tag/entities/tag.entity";

@Entity( "tag_coment" )
export class TagComent {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@ManyToOne(
		() => Tag,
		tag => tag.id,
		{ eager: true }
	)
	tag: Tag;

	@ManyToOne( 
		() => Coment,
		coment => coment.id,
		{ onDelete: "CASCADE" }
	)
	coment: Coment;
}
