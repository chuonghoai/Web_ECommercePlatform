import { useState, useEffect } from 'react';
import { Marker, Tooltip } from 'react-leaflet'; 
// Đã xóa useMapEvents vì không cần bắt sự kiện click nữa

export const useShippingController = (initialLat: number, initialLng: number) => {
    const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

    useEffect(() => {
        setPosition([initialLat, initialLng]);
    }, [initialLat, initialLng]);

    return {
        position,
        setPosition
    };
};

// Đã gỡ hàm setPosition khỏi props vì không còn cho phép đổi vị trí
export const LocationSelector = ({
    position,
}: {
    position: [number, number];
}) => {
    return (
        <Marker position={position}>
            <Tooltip permanent direction="top" offset={[0, -40]}>
                Vị trí giao hàng
            </Tooltip>
        </Marker>
    );
};