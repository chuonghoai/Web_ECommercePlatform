import { apiClient } from "../../../core/api/apiClient";
import type { ApiResponse } from "../../../core/api/apiResponse";
import type { UpdateProfileRequest } from "../dto/updateProfile.type";
import type { WishlistResponse } from "../models/wishlist.model";
import type { UserProfileResponse } from "../dto/getProfile.type";
import type { UserRepository } from "./user.repository";
import type { Address } from "../../order/checkout/models/checkout.model";
import type { DistrictModel, ProvinceModel, WardModel } from "../models/address.model";

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
     * Get open API province, district and ward
     */
    async getDistricts(): Promise<DistrictModel[]> {
        const res: any = apiClient.get<DistrictModel[]>("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/province");
        return res.data;
    }

    async getProvinces(): Promise<ProvinceModel[]> {
        const res: any = apiClient.get<ProvinceModel[]>("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/district");
        return res.data;
    }

    async getWards(): Promise<WardModel[]> {
        const res: any = apiClient.get<WardModel[]>("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/district");
        return res.data;
    }
}
