import type { ApiResponse } from '../../../../core/api/apiResponse';
import type {
    Voucher,
    VoucherStats,
    VoucherStatItem,
    GetVouchersQuery,
    CreateVoucherRequest,
    UpdateVoucherStatusRequest,
    RevokeVoucherRequest,
    CreateVoucherResponse,
} from '../models/voucher.model';
import { DistributionType, VoucherType, VoucherStatus } from '../models/voucher.model';
import type { IVoucherRepository } from './voucher.repository';

const MOCK_VOUCHERS: Voucher[] = [
    {
        id: 1,
        title: 'Khuyến mãi giảm 10%',
        code: 'KM10',
        distribution_type: DistributionType.PUBLIC,
        voucher_type: VoucherType.PERCENT,
        category_id: 1,
        category_name: 'Sự kiện Tháng 6',
        discount_value: 10,
        max_discount_amount: 50000,
        min_order_value: 200000,
        total_limit: 500,
        used_count: 123,
        limit_per_user: 1,
        start_date: '2026-06-01T00:00:00Z',
        end_date: '2026-06-30T23:59:59Z',
        status: VoucherStatus.ACTIVE,
        created_at: '2026-05-28T09:00:00Z',
    },
    {
        id: 2,
        title: 'Freeship đơn từ 150k',
        code: 'FREESHIP150',
        distribution_type: DistributionType.LIMITED,
        voucher_type: VoucherType.FREESHIP,
        category_id: null,
        category_name: null,
        discount_value: 0,
        max_discount_amount: null,
        min_order_value: 150000,
        total_limit: 100,
        used_count: 100,
        limit_per_user: 1,
        start_date: '2026-06-01T00:00:00Z',
        end_date: '2026-06-15T23:59:59Z',
        status: VoucherStatus.EXPIRED,
        created_at: '2026-05-30T09:00:00Z',
    },
    {
        id: 3,
        title: 'Giảm 50k đơn từ 500k',
        code: 'GIAM50K',
        distribution_type: DistributionType.UNLIMITED,
        voucher_type: VoucherType.CASH,
        category_id: 2,
        category_name: 'Flash Sale',
        discount_value: 50000,
        max_discount_amount: null,
        min_order_value: 500000,
        total_limit: 1000,
        used_count: 350,
        limit_per_user: 2,
        start_date: '2026-06-01T00:00:00Z',
        end_date: '2026-07-01T23:59:59Z',
        status: VoucherStatus.ACTIVE,
        created_at: '2026-05-31T09:00:00Z',
    },
    {
        id: 5,
        title: 'Giảm 15% mua sắm mùa hè',
        code: 'SUMMER15',
        distribution_type: DistributionType.PUBLIC,
        voucher_type: VoucherType.PERCENT,
        category_id: 4,
        category_name: 'Mùa hè',
        discount_value: 15,
        max_discount_amount: 80000,
        min_order_value: 300000,
        total_limit: 2000,
        used_count: 876,
        limit_per_user: 1,
        start_date: '2026-06-01T00:00:00Z',
        end_date: '2026-08-31T23:59:59Z',
        status: VoucherStatus.ACTIVE,
        created_at: '2026-05-25T09:00:00Z',
    },
];

const MOCK_STATS: VoucherStats = {
    total_vouchers: 5,
    total_used_count: 1461,
    total_discount_given: 72340000,
    most_popular_type: VoucherType.PERCENT,
    most_popular_category: 'Mùa hè',
    active_vouchers_count: 3,
    top_vouchers: [
        {
            id: 5,
            title: 'Giảm 15% mùa hè',
            code: 'SUMMER15',
            used_count: 876,
            total_discount_given: 42300000,
            voucher_type: VoucherType.PERCENT,
        },
        {
            id: 3,
            title: 'Giảm 50k đơn từ 500k',
            code: 'GIAM50K',
            used_count: 350,
            total_discount_given: 17500000,
            voucher_type: VoucherType.CASH,
        },
        {
            id: 1,
            title: 'Khuyến mãi giảm 10%',
            code: 'KM10',
            used_count: 123,
            total_discount_given: 9850000,
            voucher_type: VoucherType.PERCENT,
        },
    ] as VoucherStatItem[],
};

let mockVouchers = [...MOCK_VOUCHERS];
let nextId = 6;

export class VoucherMockRepository implements IVoucherRepository {
    async getVouchers(query: GetVouchersQuery): Promise<ApiResponse<Voucher[]>> {
        const page = query.page || 1;
        const pageSize = query.pageSize || 10;
        let filtered = [...mockVouchers];

        if (query.status) {
            filtered = filtered.filter(v => v.status === query.status);
        }
        if (query.distribution_type) {
            filtered = filtered.filter(v => v.distribution_type === query.distribution_type);
        }

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const start = (page - 1) * pageSize;
        const data = filtered.slice(start, start + pageSize);

        return {
            success: true,
            message: 'Lấy danh sách voucher thành công',
            data,
            pagination: { page, pageSize, totalItems, totalPages },
        };
    }

    async getVoucherById(id: number): Promise<ApiResponse<Voucher>> {
        const voucher = mockVouchers.find(v => v.id === id);
        if (!voucher) {
            return { success: false, message: 'Không tìm thấy voucher', data: null as any };
        }
        return { success: true, message: 'OK', data: voucher };
    }

    async createVoucher(data: CreateVoucherRequest): Promise<ApiResponse<CreateVoucherResponse>> {
        const newVoucher: Voucher = {
            id: nextId++,
            title: data.title,
            code: data.code,
            distribution_type: data.distribution_type,
            voucher_type: data.voucher_type,
            category_id: data.category_id,
            category_name: data.new_category_name,
            discount_value: data.discount_value,
            max_discount_amount: data.max_discount_amount,
            min_order_value: data.min_order_value,
            total_limit: data.total_limit,
            used_count: 0,
            limit_per_user: data.limit_per_user,
            start_date: data.start_date,
            end_date: data.end_date,
            status: VoucherStatus.ACTIVE,
            created_at: new Date().toISOString(),
        };
        mockVouchers.unshift(newVoucher);
        return {
            success: true,
            message: 'Tạo voucher thành công',
            data: { id: newVoucher.id, status: VoucherStatus.ACTIVE },
        };
    }

    async updateVoucherStatus(id: number, data: UpdateVoucherStatusRequest): Promise<ApiResponse<null>> {
        const idx = mockVouchers.findIndex(v => v.id === id);
        if (idx === -1) {
            return { success: false, message: 'Không tìm thấy voucher', data: null };
        }
        mockVouchers[idx] = { ...mockVouchers[idx], status: data.status };
        return { success: true, message: 'Cập nhật trạng thái thành công', data: null };
    }

    async revokeVoucher(_id: number, _data: RevokeVoucherRequest): Promise<ApiResponse<null>> {
        return { success: true, message: 'Thu hồi voucher thành công', data: null };
    }

    async getVoucherStats(): Promise<ApiResponse<VoucherStats>> {
        const activeCount = mockVouchers.filter(v => v.status === VoucherStatus.ACTIVE).length;
        const totalVouchers = mockVouchers.length;
        return {
            success: true,
            message: 'OK',
            data: {
                ...MOCK_STATS,
                total_vouchers: totalVouchers,
                active_vouchers_count: activeCount,
            },
        };
    }
}
