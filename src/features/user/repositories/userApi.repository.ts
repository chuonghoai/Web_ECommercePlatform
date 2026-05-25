import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../models/wishlist.model";
import type { UserProfileResponse } from "../dto/getProfile.type";
import type { UserRepository } from "./user.repository";
import type { Address } from "../../order/checkout/models/checkout.model";
import type { DistrictModel, ProvinceModel, WardModel } from "../models/address.model";
import axios from "axios";

export class UserApiRepository implements UserRepository {
    /**
     * GET /users/me
     * @returns ApiResponse<UserProfileResponse>
     */
    async getProfile(): Promise<ApiResponse<UserProfileResponse>> {
        return apiClient.get<ApiResponse<UserProfileResponse>>("/users/me");
    }

    /**
     * PUT /users/me
     * @body UpdateProfileRequest
     * @returns ApiResponse<null>
     */
    async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<null>> {
        return apiClient.put<ApiResponse<null>>("/users/me", data);
    }


    /**
     * GET /users/me/wishlist
     * @query page: number, pageSize: number
     * @returns ApiResponse<WishlistResponse>
     */
    async getWishlist(page: number, pageSize: number): Promise<ApiResponse<WishlistResponse>> {
        return apiClient.get<ApiResponse<WishlistResponse>>("/users/me/wishlist", {
            params: { page, pageSize },
        });
    }

    /**
     * GET /users/me/address
     * @returns Address
     */
    async getAddress(): Promise<ApiResponse<Address[]>> {
        return apiClient.get<ApiResponse<Address[]>>("/users/me/address");
    }

    /**
     * POST /users/me/address
     * @body Address: Frontend không gửi field "id", backend tự sinh.
     *       Omit là toán từ loại bỏ "id" khỏi Address    
     * @returns Address: Có field "id" do backend vừa sinh
     */
    async addAddress(data: Omit<Address, "id">): Promise<ApiResponse<Address>> {
        return apiClient.post<ApiResponse<Address>>("/users/me/address", data);
    }

    /**
     * Get open API province, district and ward
     */
    async getProvinces(): Promise<ProvinceModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/province");
        const data = res.data?.data || res.data;
        return data.map((item: any) => ({
            id: item.province_id || item.id,
            name: item.province_name || item.name
        }));
    }

    async getDistricts(provinceId: number): Promise<DistrictModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/district", {
            params: { province_id: provinceId }
        });
        const data = res.data?.data || res.data;
        return data.map((item: any) => ({
            id: item.district_id || item.id,
            name: item.district_name || item.name
        }));
    }

    async getWards(districtId: number): Promise<WardModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/ward", {
            params: { district_id: districtId }
        });
        const data = res.data?.data || res.data;
        return data.map((item: any) => ({
            id: item.ward_code || item.id,
            name: item.ward_name || item.name
        }));
    }
}
