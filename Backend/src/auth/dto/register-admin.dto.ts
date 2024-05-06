import { IsEmail, IsIn, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {

	@IsString()
	@MinLength( 1 )
	@MaxLength( 10 )
	identificador: string;

	@IsString()
	@MinLength( 1 )
	nombre: string;

	@IsString()
	@IsEmail()
	email: string; 
	
	@IsString()
	@MinLength( 1 )
	@IsIn([	
		"Dirección",
		"Consejo Técnico Consultivo Escolar",
		"Decanato",
		"Comité Interno de Proyectos",
		"Coordinación de Enlace y Gestión Técnica",
		"Unidad de Informática",
		"Subdirección Académica",
		"Departamento de Formación Básica",
		"Departamento de Ciencias e Ingeniería de la Computación",
		"Departamento de Ingeniería en Sistemas Computacionales",
		"Departamento de Fórmacion Integral e Institucional",
		"Departamento de Evaluación y Seguimiento Académico",
		"departamento de Innovación Educativa",
		"Unidad de Tecnología Educativa y Campus Virtual",
		"Sección de Estudios de Posgrado e Investigación",
		"Colegio de Profesores",
		"Departamento de Posgrado",
		"Departamento de Investigación",
		"Subdirección de Servicios Educativos e Integración Social",
		"Departamento de Gestión Escolar",
		"Departamento de Servicos Estudiantiles",
		"Departamento de Extensión y Apoyos Educativos",
		"Unidad Politécnica de Integración Social",
		"Subdirección Administrativa",
		"Departamento de Capital Huano",
		"Departamento de Recursos  Financieros",
		"Departamento de Recursos Materiales y Servicios"
	])
	area: string;
}
