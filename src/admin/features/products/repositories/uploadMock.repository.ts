import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { UploadFileResponse } from "../models/product.model";
import type { IUploadRepository } from "./upload.repository";

export class UploadMockRepository implements IUploadRepository {
    async uploadFiles(files: File[], _folder?: string): Promise<ApiResponse<UploadFileResponse[]>> {
        // Giả lập upload, trả về fake URL cho mỗi file
        const data: UploadFileResponse[] = files.map((file, index) => ({
            url: `https://via.placeholder.com/300?text=mock-${index}`,
            publicId: `mock-folder/mock-${Date.now()}-${index}`,
            format: file.name.split('.').pop() || 'jpg',
            bytes: file.size,
        }));

        return {
            success: true,
            message: 'Files uploaded successfully',
            data,
        };
    }
}