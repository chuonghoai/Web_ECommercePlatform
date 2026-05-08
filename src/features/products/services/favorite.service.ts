import type { ApiResponse } from "../../../core/api/apiResponse";

export class FavoriteService {
    
    /**
     * Toggle favorite product
     * Request: productId
     * Response: isFavorite
     * Note: Delete mockDatabase after connect to real API.
    */
    private mockDatabase: Map<string, boolean> = new Map();
    async toggleFavorite(productId: string): Promise<ApiResponse<{ isFavorite: boolean }>> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const currentStatus = this.mockDatabase.get(productId) || false;
        const newStatus = !currentStatus;
        this.mockDatabase.set(productId, newStatus);

        return {
            success: true,
            message: newStatus ? "Đã thêm vào bộ sưu tập yêu thích" : "Đã xóa khỏi bộ sưu tập yêu thích",
            data: {
                isFavorite: newStatus
            }
        };
    }
}

export const favoriteService = new FavoriteService();