import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Requirement } from "../../requirements/entities/requirement.entity";
import { Procedure } from "../../procedure/entities/procedure.entity";

@Entity( "requirement_procedure" )
export class RequirementProcedure {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@ManyToOne( 
		() => Requirement, 
		requirement => requirement.id,
		{ eager: true }
	)
	requerimiento: Requirement;

	@ManyToOne( 
		() => Procedure, 
		procedure => procedure.id,
		{ onDelete: "CASCADE" }
	)
	tramite: Procedure;
}
