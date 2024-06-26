/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteImage(file: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
