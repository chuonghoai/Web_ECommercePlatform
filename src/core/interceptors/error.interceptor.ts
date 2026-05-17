import axios from "axios";

import { axiosInstance } from "../api/axios";

import { tokenService } from "../auth/token.service";

axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (axios.isAxiosError(error)) {
            const status =
                error.response?.status;
            const requestUrl = error.config?.url || "";

            if (status === 401 && !requestUrl.includes("/auth/login")) {
                tokenService.clear();

                window.location.href =
                    "/login";
            }

            if (status === 403) {
                alert("Forbidden");
            }

            if (status === 500) {
                alert("Server error");
            }
        }

        return Promise.reject(error);
    }
);