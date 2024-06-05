import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

export class CreateTeacherDto {

	@IsString()
	@MinLength( 3 )
	nombre: string;

	@IsString()
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
		"Departamento de Innovación Educativa",
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
		"Departamento de Capital Humano",
		"Departamento de Recursos  Financieros",
		"Departamento de Recursos Materiales y Servicios"
	])
	area: string;

	@IsString()
	@IsIn([	
		"Doctor",
		"Maestro",
		"Ingeniero",
		"Licenciado",
		"Investigador"
	])
	grado_academico: string;
	
	@IsString()
	@IsEmail()
	email: string;
	
	@IsString()
	@MinLength( 10 )
	contacto: string;
}
