import React, { useState, useEffect } from 'react';
import { Marker, useMapEvents, Tooltip } from 'react-leaflet';

// Hook quản lý State của Form
export const useShippingDetailController = (initialLat: number, initialLng: number) => {
    const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

    useEffect(() => {
        setPosition([initialLat, initialLng]);
    }, [initialLat, initialLng]);

    return {
        position,
        setPosition
    };
};

// Component xử lý sự kiện click trên bản đồ
export const LocationSelector = ({
    position,
    setPosition
}: {
    position: [number, number];
    setPosition: (pos: [number, number]) => void
}) => {
    useMapEvents({
        click(e) {
            // Khi click, set lại state tọa độ mới
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return (
        <Marker position={position}>
            <Tooltip permanent direction="top" offset={[0, -40]}>
                Vị trí giao hàng
            </Tooltip>
        </Marker>
    );
};