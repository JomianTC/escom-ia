import { Requirement } from "../../requirements/entities/requirement.entity";
import { Procedure } from "../../procedure/entities/procedure.entity";
export declare class RequirementProcedure {
    id: string;
    requerimiento: Requirement;
    tramite: Procedure;
}
