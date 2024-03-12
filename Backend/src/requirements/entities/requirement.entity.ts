import { RequirementProcedure } from "../../requirement_procedure/entities/requirement_procedure.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity( "Requirement" )
export class Requirement {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;
	
	@Column()
	descripcion: string;

	@OneToMany(
		() => RequirementProcedure,
		requirement_procedure => requirement_procedure.id,
	)
	requirement_procedure: RequirementProcedure[];

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
