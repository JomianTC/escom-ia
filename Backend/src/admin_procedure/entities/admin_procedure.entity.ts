import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Procedure } from "../../procedure/entities/procedure.entity";
import { Administrator } from "../../auth/entities/admin.entity";

@Entity( "admin_tramites" )
export class AdminProcedure {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@ManyToOne( 
		() => Administrator, 
		admin => admin.id,
		{ eager: true }
	)
	admin: Administrator;

	@ManyToOne( 
		() => Procedure, 
		procedure => procedure.id,
		{ eager: true }
	)
	procedure: Procedure;
}
