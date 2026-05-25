import { useState, useCallback, useEffect } from 'react';
import { userService } from '../../../../../features/user/services/user.service';
import type { ProvinceModel, DistrictModel, WardModel } from '../../../../../features/user/models/address.model';

export const useAddNewAddressController = (isOpen: boolean, onSuccess?: () => void) => {
    const [formData, setFormData] = useState({
        fullName: '', phoneNumber: '',
        provinceCode: 0, provinceName: '',
        districtCode: 0, districtName: '',
        wardCode: 0, wardName: '',
        street: ''
    });

    const [location, setLocation] = useState<[number, number] | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
    const [districts, setDistricts] = useState<DistrictModel[]>([]);
    const [wards, setWards] = useState<WardModel[]>([]);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                fullName: '', phoneNumber: '', provinceCode: 0, provinceName: '',
                districtCode: 0, districtName: '', wardCode: 0, wardName: '', street: ''
            });
            setLocation(null);
            setIsVerified(false);
            setIsVerifying(false);

            userService.getProvinces()
                .then(data => setProvinces(data))
                .catch(err => console.error("Lỗi khi tải tỉnh thành:", err));
        } else {
            setProvinces([]); setDistricts([]); setWards([]);
        }
    }, [isOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (['street'].includes(field)) setIsVerified(false);
    };

    const handleSelectAddressField = (fieldCode: string, fieldName: string, id: number, name: string) => {
        setFormData(prev => ({ ...prev, [fieldCode]: id, [fieldName]: name }));
        setIsVerified(false);

        if (fieldCode === 'provinceCode') {
            setFormData(prev => ({ ...prev, districtCode: 0, districtName: '', wardCode: 0, wardName: '' }));
            setDistricts([]); setWards([]);
            userService.getDistricts(id).then(data => setDistricts(data));
        }
        else if (fieldCode === 'districtCode') {
            setFormData(prev => ({ ...prev, wardCode: 0, wardName: '' }));
            setWards([]);
            userService.getWards(id).then(data => setWards(data));
        }
    };

    const handleVerifyMap = () => {
        const { provinceName, districtName, wardName, street } = formData;
        if (!provinceName || !districtName || !wardName || !street) {
            alert("Vui lòng điền đầy đủ thông tin địa chỉ trước khi xác minh!");
            return;
        }

        setIsVerifying(true);
        setTimeout(() => {
            setLocation([10.7769, 106.7009]);
            setIsVerified(true);
            setIsVerifying(false);
        }, 1200);
    };

    const handleMarkerDragEnd = useCallback((e: any) => {
        setLocation([e.target.getLatLng().lat, e.target.getLatLng().lng]);
    }, []);

    const handleSaveAddress = async () => {
        if (!isVerified || !location) return;

        setIsSaving(true);
        try {
            const payload = {
                ...formData,
                fullAddress: `${formData.street}, ${formData.wardName}, ${formData.districtName}, ${formData.provinceName}`,
                latitude: location[0],
                longitude: location[1]
            };

            const res = await userService.addAddress(payload);
            if (res.success) {
                if (onSuccess) onSuccess();
            } else {
                alert(res.message || "Có lỗi xảy ra khi lưu địa chỉ");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi lưu địa chỉ");
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData, location,
        isVerifying, isVerified, isSaving,
        provinces, districts, wards,
        handleInputChange, handleSelectAddressField,
        handleVerifyMap, handleMarkerDragEnd, handleSaveAddress
    };
};