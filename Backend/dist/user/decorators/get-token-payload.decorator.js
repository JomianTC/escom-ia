"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTokenPayload = void 0;
const common_1 = require("@nestjs/common");
exports.GetTokenPayload = (0, common_1.createParamDecorator)((_data, context) => {
    const request = context.switchToHttp().getRequest();
    const email = request.email;
    if (!email) {
        console.log("Error obteniendo el email - Decorador GetTokenPayload");
        throw new common_1.InternalServerErrorException("Internal Server Error");
    }
    return email;
});
//# sourceMappingURL=get-token-payload.decorator.js.map