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
exports.TagComent = void 0;
const typeorm_1 = require("typeorm");
const coment_entity_1 = require("../../coment/entities/coment.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
let TagComent = class TagComent {
};
exports.TagComent = TagComent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TagComent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, tag => tag.id, { eager: true }),
    __metadata("design:type", tag_entity_1.Tag)
], TagComent.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coment_entity_1.Coment, coment => coment.id, { onDelete: "CASCADE" }),
    __metadata("design:type", coment_entity_1.Coment)
], TagComent.prototype, "coment", void 0);
exports.TagComent = TagComent = __decorate([
    (0, typeorm_1.Entity)("tag_coment")
], TagComent);
//# sourceMappingURL=tag_coment.entity.js.map