import { useState, useCallback, useEffect } from 'react';
import { userService } from '../../../../../features/user/services/user.service';
import type { ProvinceModel, DistrictModel, WardModel } from '../../../../../features/user/models/address.model';

export const useAddNewAddressController = (isOpen: boolean) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        provinceCode: 0,
        provinceName: '',
        districtCode: 0,
        districtName: '',
        wardCode: 0,
        wardName: '',
        street: ''
    });

    const [location, setLocation] = useState<[number, number] | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
    const [districts, setDistricts] = useState<DistrictModel[]>([]);
    const [wards, setWards] = useState<WardModel[]>([]);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                fullName: '',
                phoneNumber: '',
                provinceCode: 0,
                provinceName: '',
                districtCode: 0,
                districtName: '',
                wardCode: 0,
                wardName: '',
                street: ''
            });
            setLocation(null);
            setIsVerified(false);
            setIsVerifying(false);

            userService.getProvinces()
                .then(data => setProvinces(data))
                .catch(err => console.error("Lỗi khi tải tỉnh thành:", err));
        } else {
            setProvinces([]);
            setDistricts([]);
            setWards([]);
        }
    }, [isOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (['street'].includes(field)) {
            setIsVerified(false);
        }
    };

    const handleSelectAddressField = (fieldCode: string, fieldName: string, id: number, name: string) => {
        setFormData(prev => ({ ...prev, [fieldCode]: id, [fieldName]: name }));
        setIsVerified(false);

        if (fieldCode === 'provinceCode') {
            setFormData(prev => ({ ...prev, districtCode: 0, districtName: '', wardCode: 0, wardName: '' }));
            setDistricts([]);
            setWards([]);
            userService.getDistricts(id)
                .then(data => setDistricts(data))
                .catch(err => console.error(err));
        }
        else if (fieldCode === 'districtCode') {
            setFormData(prev => ({ ...prev, wardCode: 0, wardName: '' }));
            setWards([]);
            userService.getWards(id)
                .then(data => setWards(data))
                .catch(err => console.error(err));
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
            const mockGeocodedLat = 10.7769;
            const mockGeocodedLng = 106.7009;

            setLocation([mockGeocodedLat, mockGeocodedLng]);
            setIsVerified(true);
            setIsVerifying(false);
        }, 1200);
    };

    const handleMarkerDragEnd = useCallback((e: any) => {
        const marker = e.target;
        const position = marker.getLatLng();
        setLocation([position.lat, position.lng]);
    }, []);

    const handleSaveAddress = () => {
        if (!isVerified || !location) return null;

        const fullAddress = `${formData.street}, ${formData.wardName}, ${formData.districtName}, ${formData.provinceName}`;

        return {
            ...formData,
            fullAddress,
            latitude: location[0],
            longitude: location[1]
        };
    };

    return {
        formData,
        location,
        isVerifying,
        isVerified,
        provinces,
        districts,
        wards,
        handleInputChange,
        handleSelectAddressField,
        handleVerifyMap,
        handleMarkerDragEnd,
        handleSaveAddress
    };
};