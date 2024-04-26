"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = void 0;
const common_1 = require("@nestjs/common");
const HandleErrors = (error) => {
    if (error instanceof common_1.BadRequestException)
        throw error;
    if (error instanceof common_1.UnauthorizedException)
        throw error;
    if (error instanceof common_1.ForbiddenException)
        throw error;
    if (error instanceof common_1.NotFoundException)
        throw error;
    console.log({ message: error.message });
    throw new common_1.InternalServerErrorException({ message: "Internal Server Error" });
};
exports.HandleErrors = HandleErrors;
//# sourceMappingURL=handle-errors.js.map