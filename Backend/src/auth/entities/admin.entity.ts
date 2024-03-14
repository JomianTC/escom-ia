import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminProcedure } from "../../admin_procedure/entities/admin_procedure.entity";

@Entity( "Administrator" )
export class Administrator {

	@PrimaryGeneratedColumn( "uuid" )
	id: string;

	@Column()
	nombre: string;

	@Column({ unique: true })
	email: string; 

	@Column({ unique: true })
	identificador: string;
	
	@Column()
	area: string;
	
	@Column({ default: "" })
	foto_perfil: string;

	@OneToMany(
		() => AdminProcedure,
		admin_procedure => admin_procedure.id
	)
	admin_procedure: AdminProcedure[];

	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email = this.email.toLowerCase().trim();
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
