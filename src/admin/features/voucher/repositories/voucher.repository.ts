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

export interface IVoucherRepository {
    getVouchers(query: GetVouchersQuery): Promise<ApiResponse<Voucher[]>>;
    getVoucherById(id: number): Promise<ApiResponse<Voucher>>;
    createVoucher(data: CreateVoucherRequest): Promise<ApiResponse<CreateVoucherResponse>>;
    updateVoucherStatus(id: number, data: UpdateVoucherStatusRequest): Promise<ApiResponse<null>>;
    revokeVoucher(id: number, data: RevokeVoucherRequest): Promise<ApiResponse<null>>;
    getVoucherStats(): Promise<ApiResponse<VoucherStats>>;
}
