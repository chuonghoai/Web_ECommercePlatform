import { apiClient } from "../../../../core/api/apiClient";
import type { UploadImageResponse } from "../models/product.model";

// ============================================================
// GHI CHÚ CHO BACKEND:
// API upload ảnh lên Cloudinary.
// Endpoint hiện tại là tạm, cần BE xác nhận.
// Request: POST, multipart/form-data, field "file"
// Response mong muốn: { url: "https://res.cloudinary.com/..." }
// ============================================================
const UPLOAD_ENDPOINT = '/uploads/image';

export const uploadRepository = {
    /**
     * Upload 1 file ảnh lên server (BE forward lên Cloudinary).
     * @param file - File ảnh từ input type="file"
     * @returns Response chứa URL ảnh đã upload
     */
    async uploadImage(file: File): Promise<UploadImageResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return apiClient.post<UploadImageResponse>(UPLOAD_ENDPOINT, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
