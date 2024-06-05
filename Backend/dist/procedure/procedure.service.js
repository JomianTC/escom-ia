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
exports.ProcedureService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const procedure_entity_1 = require("./entities/procedure.entity");
const handle_errors_1 = require("../common/handle-errors");
let ProcedureService = class ProcedureService {
    constructor(procedureRepository) {
        this.procedureRepository = procedureRepository;
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const procedures = await this.procedureRepository.find({
                where: { estado: true },
                order: { nombre: "ASC" },
                take: limit,
                skip: (page - 1) * limit
            });
            if (!procedures.length)
                throw new common_1.BadRequestException({ mensaje: "No se encontraron trámites" });
            const total = await this.procedureRepository.createQueryBuilder("procedure")
                .where("procedure.estado = :estado", { estado: true })
                .getCount();
            return { procedures, total };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findEverything(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        try {
            const procedures = await this.procedureRepository.find({
                order: { nombre: "ASC" },
                take: limit,
                skip: (page - 1) * limit
            });
            if (!procedures.length)
                throw new common_1.BadRequestException({ mensaje: "No se encontraron trámites" });
            return { procedures, total: 10 };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findOne(id) {
        try {
            const procedure = await this.procedureRepository.findOneBy({ id });
            if (!procedure)
                throw new common_1.BadRequestException({ mensaje: "No se encontró el trámite" });
            return procedure;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async findStack(adminProccedures) {
        try {
            const proceduresPromise = adminProccedures.map((adminProcedure) => {
                return this.procedureRepository.findOneBy({ id: adminProcedure });
            });
            const procedures = await Promise.all(proceduresPromise);
            return procedures;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async create(createProcedureDto) {
        const { nombre, fechaInicio, fechaTermino, links = [], ...procedureData } = createProcedureDto;
        try {
            const procedureFound = await this.procedureRepository.findOneBy({
                nombre: nombre.toLowerCase()
            });
            if (procedureFound)
                throw new common_1.BadRequestException({ mensaje: "Ya existe un trámite con ese nombre" });
            let enlaces = "";
            if (links.length > 0) {
                links.forEach((link) => {
                    enlaces += `${link}-----`;
                });
            }
            if (fechaInicio === "" && fechaTermino === "") {
                const newProcedure = this.procedureRepository.create({
                    nombre,
                    ...procedureData,
                    links: enlaces,
                });
                const procedure = await this.procedureRepository.save(newProcedure);
                return procedure;
            }
            const newFechaInicio = new Date(fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
            const newFechaTermino = new Date(fechaTermino).toISOString().slice(0, 19).replace('T', ' ');
            const newProcedure = this.procedureRepository.create({
                nombre,
                ...procedureData,
                links: enlaces,
                fechaInicio: new Date(newFechaInicio),
                fechaTermino: new Date(newFechaTermino),
            });
            const procedure = await this.procedureRepository.save(newProcedure);
            return procedure;
        }
        catch (error) {
            console.log(error);
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async update(id, updateProcedureDto) {
        const { requerimentos, links, ...procedureData } = updateProcedureDto;
        try {
            const procedure = await this.procedureRepository.findOneBy({ id });
            if (!procedure)
                throw new common_1.BadRequestException({ mensaje: "No se encontró el trámite" });
            if (procedureData.nombre) {
                const procedureFound = await this.procedureRepository.findOneBy({
                    nombre: procedureData.nombre.toLowerCase()
                });
                if (procedureFound && procedureFound.id !== id)
                    throw new common_1.BadRequestException({ mensaje: "Ya existe un trámite con ese nombre" });
            }
            if (links) {
                let enlaces = "";
                links.forEach((link) => {
                    enlaces += `${link}-----`;
                });
                await this.procedureRepository.update(id, { ...procedureData, links: enlaces });
                const { estado } = await this.procedureRepository.findOneBy({ id });
                return estado;
            }
            await this.procedureRepository.update(id, { ...procedureData });
            const { estado } = await this.procedureRepository.findOneBy({ id });
            return estado;
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async updateDate(id, updateProcedureDto) {
        const { fechaInicio = null, fechaTermino = null } = updateProcedureDto;
        try {
            const procedure = await this.procedureRepository.findOneBy({ id });
            const newFechaInicio = new Date(fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
            const newFechaTermino = new Date(fechaTermino).toISOString().slice(0, 19).replace('T', ' ');
            if (fechaInicio === null && fechaTermino === null)
                return { mensaje: "X" };
            if (fechaInicio && fechaTermino) {
                await this.procedureRepository.update(id, {
                    fechaInicio: new Date(newFechaInicio),
                    fechaTermino: new Date(newFechaTermino),
                });
                return { mensaje: `Se han modificado las fechas para el tramite: ${procedure.nombre}` };
            }
            if (fechaInicio)
                await this.procedureRepository.update(id, {
                    fechaInicio: new Date(newFechaInicio),
                });
            if (fechaTermino)
                await this.procedureRepository.update(id, {
                    fechaTermino: new Date(newFechaTermino),
                });
            return { mensaje: `Se ha modificado la fecha para el tramite: ${procedure.nombre}` };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
    async remove(id, estado) {
        try {
            const procedure = await this.procedureRepository.findOneBy({ id });
            if (!procedure)
                throw new common_1.BadRequestException({ mensaje: "No se encontró el trámite" });
            if (procedure.estado === estado)
                throw new common_1.BadRequestException({ mensaje: "El trámite no puede cambiar de estado" });
            await this.procedureRepository.update(id, { estado });
            if (estado)
                return { mensaje: "El Trámite ahora esta activo" };
            else
                return { mensaje: "El Trámite ahora esta inactivo" };
        }
        catch (error) {
            (0, handle_errors_1.HandleErrors)(error);
        }
    }
};
exports.ProcedureService = ProcedureService;
exports.ProcedureService = ProcedureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(procedure_entity_1.Procedure)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProcedureService);
//# sourceMappingURL=procedure.service.js.map