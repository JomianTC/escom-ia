import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { Procedure } from "src/procedure/entities/procedure.entity";
type ProcedureReq = {
    tramite: Procedure;
    requerimientos: string[];
}[];
export declare class GptAiService {
    private readonly g4f;
    createComent(createGptAiDto: CreateGptAiDto): Promise<{
        mensaje: any;
    }>;
    askSomething(createGptAiDto: CreateGptAiDto, procedures: ProcedureReq): Promise<{
        mensaje: any;
    }>;
    validateComent(createGptAiDto: CreateGptAiDto): Promise<{
        mensaje: any;
    }>;
}
export {};
