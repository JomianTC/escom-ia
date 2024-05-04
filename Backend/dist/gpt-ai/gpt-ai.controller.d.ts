import { RequirementProcedureService } from "../requirement_procedure/requirement_procedure.service";
import { ProcedureService } from '../procedure/procedure.service';
import { CreateGptAiDto } from "./dto/create-gpt-ai.dto";
import { UserService } from "../user/user.service";
import { GptAiService } from "./gpt-ai.service";
export declare class GptAiController {
    private readonly gptAiService;
    private readonly userService;
    private readonly procedureService;
    private readonly reqProService;
    constructor(gptAiService: GptAiService, userService: UserService, procedureService: ProcedureService, reqProService: RequirementProcedureService);
    createComent(email: string, createGptAiDto: CreateGptAiDto): Promise<{
        mensaje: any;
    }>;
    askSomething(email: string, createGptAiDto: CreateGptAiDto): Promise<{
        mensaje: any;
    }>;
    validateComent(email: string, createGptAiDto: CreateGptAiDto): Promise<{
        valid: boolean;
    }>;
}
