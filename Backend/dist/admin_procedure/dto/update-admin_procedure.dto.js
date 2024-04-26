"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminProcedureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_admin_procedure_dto_1 = require("./create-admin_procedure.dto");
class UpdateAdminProcedureDto extends (0, mapped_types_1.PartialType)(create_admin_procedure_dto_1.CreateAdminProcedureDto) {
}
exports.UpdateAdminProcedureDto = UpdateAdminProcedureDto;
//# sourceMappingURL=update-admin_procedure.dto.js.map