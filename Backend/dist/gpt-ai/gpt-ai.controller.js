"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptAiController = void 0;
const common_1 = require("@nestjs/common");
const requirement_procedure_service_1 = require("../requirement_procedure/requirement_procedure.service");
const get_token_payload_decorator_1 = require("../user/decorators/get-token-payload.decorator");
const procedure_service_1 = require("../procedure/procedure.service");
const create_gpt_ai_dto_1 = require("./dto/create-gpt-ai.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_service_1 = require("../user/user.service");
const gpt_ai_service_1 = require("./gpt-ai.service");
let GptAiController = class GptAiController {
    constructor(gptAiService, userService, procedureService, reqProService) {
        this.gptAiService = gptAiService;
        this.userService = userService;
        this.procedureService = procedureService;
        this.reqProService = reqProService;
    }
    async createComent(email, createGptAiDto) {
        await this.userService.findByEmail(email);
        return this.gptAiService.createComent(createGptAiDto);
    }
    async askSomething(email, createGptAiDto) {
        await this.userService.findByEmail(email);
        const { procedures } = await this.procedureService.findAll({ page: 1, limit: 100 });
        const fullProcedures = await Promise.all(procedures.map(async (procedure) => {
            const requirements = await this.reqProService.findStack(procedure);
            return { tramite: procedure, requerimientos: requirements };
        }));
        return this.gptAiService.askSomething(createGptAiDto, fullProcedures);
    }
    async validateComent(email, createGptAiDto) {
        await this.userService.findByEmail(email);
        return this.gptAiService.validateComent(createGptAiDto);
    }
};
exports.GptAiController = GptAiController;
__decorate([
    (0, common_1.Post)("coment"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_gpt_ai_dto_1.CreateGptAiDto]),
    __metadata("design:returntype", Promise)
], GptAiController.prototype, "createComent", null);
__decorate([
    (0, common_1.Post)("askSomething"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_gpt_ai_dto_1.CreateGptAiDto]),
    __metadata("design:returntype", Promise)
], GptAiController.prototype, "askSomething", null);
__decorate([
    (0, common_1.Post)("coment/validate"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_token_payload_decorator_1.GetTokenPayload)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_gpt_ai_dto_1.CreateGptAiDto]),
    __metadata("design:returntype", Promise)
], GptAiController.prototype, "validateComent", null);
exports.GptAiController = GptAiController = __decorate([
    (0, common_1.Controller)("gptai"),
    __metadata("design:paramtypes", [gpt_ai_service_1.GptAiService,
        user_service_1.UserService,
        procedure_service_1.ProcedureService,
        requirement_procedure_service_1.RequirementProcedureService])
], GptAiController);
//# sourceMappingURL=gpt-ai.controller.js.map