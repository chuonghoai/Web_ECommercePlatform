import { useState, useCallback, useEffect } from 'react';

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

    // Tọa độ hiện tại
    const [location, setLocation] = useState<[number, number] | null>(null);

    // Các trạng thái của quá trình xác minh bản đồ
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // Reset lại form mỗi khi mở lại Modal
    useEffect(() => {
        if (isOpen) {
            setFormData({ fullName: '', phoneNumber: '', provinceCode: 0, provinceName: '', districtCode: 0, districtName: '', wardCode: 0, wardName: '', street: '' });
            setLocation(null);
            setIsVerified(false);
            setIsVerifying(false);
        }
    }, [isOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Nếu thay đổi các trường địa chỉ (không phải tên/sdt) thì reset lại trạng thái xác minh
        if (['provinceName', 'districtName', 'wardName', 'street'].includes(field)) {
            setIsVerified(false);
        }
    };

    const handleVerifyMap = () => {
        const { provinceName, districtName, wardName, street } = formData;
        if (!provinceName || !districtName || !wardName || !street) {
            alert("Vui lòng điền đầy đủ thông tin địa chỉ trước khi xác minh!");
            return;
        }

        setIsVerifying(true);

        // MOCK API GEOCODING: Giả lập thời gian gọi API chuyển Text -> Tọa độ
        setTimeout(() => {
            // Trả về một tọa độ giả định (VD: Trung tâm HCM)
            const mockGeocodedLat = 10.7769;
            const mockGeocodedLng = 106.7009;

            setLocation([mockGeocodedLat, mockGeocodedLng]);
            setIsVerified(true);
            setIsVerifying(false);
        }, 1200);
    };

    // Hàm cập nhật tọa độ khi người dùng kéo thả (drag) marker
    const handleMarkerDragEnd = useCallback((e: any) => {
        const marker = e.target;
        const position = marker.getLatLng();
        setLocation([position.lat, position.lng]);
    }, []);

    const handleSaveAddress = () => {
        if (!isVerified || !location) return null;

        const fullAddress = `${formData.street}, ${formData.wardName}, ${formData.districtName}, ${formData.provinceName}`;

        // Return object địa chỉ để Modal cha xử lý
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
        handleInputChange,
        handleVerifyMap,
        handleMarkerDragEnd,
        handleSaveAddress
    };
};