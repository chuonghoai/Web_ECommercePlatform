import { apiClient } from '../../../../core/api/apiClient';
import type { ApiResponse } from '../../../../core/api/apiResponse';
import type {
    Voucher,
    VoucherStats,
    GetVouchersQuery,
    CreateVoucherRequest,
    UpdateVoucherStatusRequest,
    RevokeVoucherRequest,
    CreateVoucherResponse,
} from '../models/voucher.model';
import type { IVoucherRepository } from './voucher.repository';

export class VoucherApiRepository implements IVoucherRepository {
    /**
     * GET /api/v1/admin/vouchers
     * @query GetVouchersQuery
     * @returns ApiResponse<Voucher[]>
     */
    async getVouchers(query: GetVouchersQuery): Promise<ApiResponse<Voucher[]>> {
        return apiClient.get<ApiResponse<Voucher[]>>('/api/v1/admin/vouchers', { params: query });
    }

    /**
     * GET /api/v1/admin/vouchers/:id
     * @params id: number
     * @returns ApiResponse<Voucher>
     */
    async getVoucherById(id: number): Promise<ApiResponse<Voucher>> {
        return apiClient.get<ApiResponse<Voucher>>(`/api/v1/admin/vouchers/${id}`);
    }

    /**
     * POST /api/v1/admin/vouchers
     * @body CreateVoucherRequest
     * @returns ApiResponse<CreateVoucherResponse>
     */
    async createVoucher(data: CreateVoucherRequest): Promise<ApiResponse<CreateVoucherResponse>> {
        return apiClient.post<ApiResponse<CreateVoucherResponse>>('/api/v1/admin/vouchers', data);
    }

    /**
     * PATCH /api/v1/admin/vouchers/:id/status
     * @params id: number
     * @body UpdateVoucherStatusRequest
     * @returns ApiResponse<null>
     */
    async updateVoucherStatus(id: number, data: UpdateVoucherStatusRequest): Promise<ApiResponse<null>> {
        return apiClient.patch<ApiResponse<null>>(`/api/v1/admin/vouchers/${id}/status`, data);
    }

    /**
     * POST /api/v1/admin/vouchers/:id/revoke
     * @params id: number
     * @body RevokeVoucherRequest
     * @returns ApiResponse<null>
     */
    async revokeVoucher(id: number, data: RevokeVoucherRequest): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>(`/api/v1/admin/vouchers/${id}/revoke`, data);
    }

    /**
     * GET /api/v1/admin/vouchers/stats
     * @returns ApiResponse<VoucherStats>
     */
    async getVoucherStats(): Promise<ApiResponse<VoucherStats>> {
        return apiClient.get<ApiResponse<VoucherStats>>('/api/v1/admin/vouchers/stats');
    }
}
