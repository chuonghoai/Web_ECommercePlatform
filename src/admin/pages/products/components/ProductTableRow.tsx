import type { Product } from '../../../features/products/models/product.model';

interface Props {
    product: Product;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onViewDetail: (id: string) => void;
}

export const ProductTableRow = ({ product, onEdit, onDelete, onViewDetail }: Props) => {
    return (
        <tr className="hover:bg-surface-container transition-colors border-b border-border-subtle">
            <td className="py-4 px-6">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewDetail(product.id)}>
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/48'}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover border border-border-subtle"
                    />
                    <div>
                        <p className="font-headline text-base font-semibold text-text-ink hover:text-primary-container transition-colors">
                            {product.name}
                        </p>
                        <p className="text-xs text-text-muted">{product.categoryName || 'Chưa phân loại'}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6 font-semibold">
                {product.price.toLocaleString('vi-VN')} đ
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center text-[#eab308]">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="ml-1 text-sm text-text-ink">{product.rating?.toFixed(1) || '0.0'}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-right">
                <button onClick={() => onViewDetail(product.id)} className="text-text-muted hover:text-primary-container p-2" title="Xem chi tiết">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button onClick={() => onEdit(product.id)} className="text-text-muted hover:text-primary-container p-2" title="Chỉnh sửa">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button onClick={() => onDelete(product.id)} className="text-text-muted hover:text-error p-2" title="Xóa">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </td>
        </tr>
    );
};