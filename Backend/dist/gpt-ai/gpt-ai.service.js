"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptAiService = void 0;
const common_1 = require("@nestjs/common");
const g4f_1 = require("g4f");
const handle_errors_1 = require("../common/handle-errors");
const create_coment_query_1 = require("./queries/create-coment.query");
const validate_coment_query_1 = require("./queries/validate-coment.query");
const respond_questions_query_1 = require("./queries/respond-questions.query");
let GptAiService = class GptAiService {
    constructor() {
        this.g4f = new g4f_1.G4F();
    }
    async createComent(createGptAiDto) {
        const { tags } = createGptAiDto;
        let consultaGPT = create_coment_query_1.createComentQuery;
        try {
            if (tags.length === 0)
                throw new common_1.BadRequestException({ message: "Los tags son requeridos" });
            tags.forEach(tag => {
                consultaGPT += ` ${tag}\n`;
            });
            const responseGTP = await this.g4f.chatCompletion([
                {
                    role: "user",
                    content: consultaGPT
                }
            ]);
            return { mensaje: responseGTP };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async askSomething(createGptAiDto, procedures) {
        const { consultas } = createGptAiDto;
        const consultaGPT = respond_questions_query_1.respondQuestionsQuery;
        let informacion = "";
        try {
            if (!consultas)
                throw new common_1.BadRequestException({ message: "La consulta es requerida" });
            procedures.forEach(procedure => {
                informacion += `{\n`;
                informacion += `Tramite: ${procedure.tramite.nombre}\n`;
                informacion += `Descripcion: ${procedure.tramite.descripcion}\n`;
                informacion += `Fecha de inicio: ${procedure.tramite.fechaInicio.toDateString()}\n`;
                informacion += `Fecha de Termino: ${procedure.tramite.fechaTermino.toDateString()}\n`;
                informacion += `Requerimientos: \n`;
                procedure.requerimientos.forEach(requerimiento => {
                    informacion += `${requerimiento}\n`;
                });
                informacion += `Enlaces: \n`;
                const { links } = procedure.tramite;
                const enlaces = links.split("-----");
                enlaces.pop();
                enlaces.forEach(enlace => {
                    informacion += `${enlace}\n`;
                });
                informacion += `},\n`;
            });
            if (consultas.length < 2) {
                const responseGTP = await this.g4f.chatCompletion([
                    {
                        role: "assistant",
                        content: consultaGPT + informacion
                    },
                    {
                        role: "user",
                        content: `\nPregunta: ${consultas[0]}`
                    },
                ]);
                return { mensaje: responseGTP };
            }
            let mensajes = [{
                    role: "assistant",
                    content: consultaGPT + informacion
                }];
            for (let i = 0; i < consultas.length; i++) {
                if (i % 2 === 0)
                    mensajes.push({
                        role: "user",
                        content: `\nPregunta: ${consultas[i]}`
                    });
                else
                    mensajes.push({
                        role: "assistant",
                        content: `\n${consultas[i]}`
                    });
            }
            const responseGTP = await this.g4f.chatCompletion(mensajes);
            return { mensaje: responseGTP };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async validateComent(createGptAiDto) {
        const { comentario } = createGptAiDto;
        let consultaGPT = validate_coment_query_1.validateComentQuery;
        try {
            if (!comentario)
                throw new common_1.BadRequestException({ message: "El comentario es requerido" });
            const responseGTP = await this.g4f.chatCompletion([
                {
                    role: "user",
                    content: `${consultaGPT}\n${comentario}`
                }
            ]);
            return { mensaje: responseGTP };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.GptAiService = GptAiService;
exports.GptAiService = GptAiService = __decorate([
    (0, common_1.Injectable)()
], GptAiService);
//# sourceMappingURL=gpt-ai.service.js.map