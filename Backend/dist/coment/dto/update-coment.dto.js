"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_coment_dto_1 = require("./create-coment.dto");
class UpdateComentDto extends (0, mapped_types_1.PartialType)(create_coment_dto_1.CreateComentDto) {
}
exports.UpdateComentDto = UpdateComentDto;
//# sourceMappingURL=update-coment.dto.js.map