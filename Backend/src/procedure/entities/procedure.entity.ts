import { AdminProcedure } from "../../admin_procedure/entities/admin_procedure.entity";
import { RequirementProcedure } from "../../requirement_procedure/entities/requirement_procedure.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
	
	@Column({ default: false })
	estado: boolean;
	
	@Column({ default: true })
	esInformativo: boolean;

	@Column({ default: "" })
	links: string;

	@OneToMany(
		() => RequirementProcedure,
		requirement_procedure => requirement_procedure.id,
		{ onDelete: "CASCADE" }
	)
	requirement_procedure: RequirementProcedure[];
	
	@OneToMany(
		() => AdminProcedure,
		admin_procedure => admin_procedure.id,
		{ onDelete: "CASCADE" }
	)
	admin_procedure: AdminProcedure[];

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.nombre = this.nombre.toLowerCase();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
