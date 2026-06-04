import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { UploadFileResponse } from "../models/product.model";
import type { IUploadRepository } from "./upload.repository";

export class UploadApiRepository implements IUploadRepository {
    /**
     * POST /media/uploads?folder=<folder>
     * Content-Type: multipart/form-data
     * Field: files (multiple)
     */
    async uploadFiles(files: File[], folder: string = 'products'): Promise<ApiResponse<UploadFileResponse[]>> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        return apiClient.post<ApiResponse<UploadFileResponse[]>>(
            `/media/uploads?folder=${folder}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    }
}