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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagComentDto = void 0;
const class_validator_1 = require("class-validator");
const coment_entity_1 = require("../../coment/entities/coment.entity");
class CreateTagComentDto {
}
exports.CreateTagComentDto = CreateTagComentDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateTagComentDto.prototype, "tags_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", coment_entity_1.Coment)
], CreateTagComentDto.prototype, "coment", void 0);
//# sourceMappingURL=create-tag_coment.dto.js.map