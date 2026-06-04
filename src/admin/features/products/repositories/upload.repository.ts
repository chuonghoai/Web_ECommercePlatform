import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { UploadFileResponse } from "../models/product.model";

/**
 * Interface cho Upload Repository.
 * API: POST /media/uploads (multipart/form-data)
 * Field: files (Array<File>)
 * Query: ?folder=<string> (optional)
 */
export interface IUploadRepository {
    /**
     * Upload nhiều file cùng lúc lên Cloudinary qua BE.
     * @param files - Danh sách file ảnh
     * @param folder - Tên thư mục trên Cloudinary (mặc định: 'products')
     * @returns Mảng thông tin file đã upload
     */
    uploadFiles(files: File[], folder?: string): Promise<ApiResponse<UploadFileResponse[]>>;
}