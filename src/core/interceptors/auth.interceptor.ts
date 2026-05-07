import { axiosInstance } from "../api/axios";

import { tokenService } from "../auth/token.service";

axiosInstance.interceptors.request.use(
    (config) => {
        const token =
            tokenService.getAccessToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);