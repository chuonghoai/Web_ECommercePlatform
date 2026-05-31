import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { HeaderOptions } from '../../layout/AdminLayout';
import { useProductController } from './products.controller';
import { ProductFormModal } from './components/ProductFormModal';

export const ProductsPage = () => {
    const { setHeaderOptions } = useOutletContext<{ setHeaderOptions: (options: HeaderOptions) => void }>();
    const {
        products, loading, error, page, totalPages, isModalOpen, editingProduct, saving,
        fetchProducts, handlePageChange, handleDeleteProduct, openModal, closeModal, handleSaveProduct 
    } = useProductController();

    // Cấu hình header giống với trang Dashboard
    useEffect(() => {
        setHeaderOptions({
            links: [
                { label: 'Tất cả sản phẩm', href: '/admin/products', active: true },
                { label: 'Danh mục', href: '/admin/categories' },
            ],
            showSearch: true,
            rightActions: (
                <button 
                    onClick={() => openModal()}
                    className="btn-primary font-body text-sm font-semibold px-4 py-2 hover:-translate-y-[2px] flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Thêm sản phẩm
                </button>
            ),
        });
    }, [setHeaderOptions, openModal]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 w-full pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-headline text-4xl font-semibold text-text-ink">Quản lý Sản phẩm</h2>
                    <p className="font-body text-lg text-text-muted mt-2">Danh sách tất cả các sản phẩm trên hệ thống.</p>
                </div>
            </div>

            {error && (
                <div className="bg-[#fee2e2] text-error rounded-xl px-6 py-4 font-body text-sm">{error}</div>
            )}

            <div className="bg-surface-card border border-border-subtle rounded-xl shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="font-body text-xs font-semibold text-text-muted uppercase pb-3 pt-4 px-6 border-b-[1.5px] border-border-medium">Sản phẩm</th>
                                <th className="font-body text-xs font-semibold text-text-muted uppercase pb-3 pt-4 px-6 border-b-[1.5px] border-border-medium">Giá</th>
                                <th className="font-body text-xs font-semibold text-text-muted uppercase pb-3 pt-4 px-6 border-b-[1.5px] border-border-medium">Đánh giá</th>
                                <th className="font-body text-xs font-semibold text-text-muted uppercase pb-3 pt-4 px-6 border-b-[1.5px] border-border-medium text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="font-body text-base text-text-ink">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-text-muted">Đang tải dữ liệu...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-text-muted">Không có sản phẩm nào.</td>
                                </tr>
                            ) : (
                                products.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-container transition-colors border-b border-border-subtle">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <img src={item.imageUrl || 'https://via.placeholder.com/48'} alt={item.name} className="w-12 h-12 rounded object-cover border border-border-subtle" />
                                                <div>
                                                    <p className="font-headline text-base font-semibold text-text-ink">{item.name}</p>
                                                    <p className="text-xs text-text-muted">{item.categoryName || 'Chưa phân loại'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-semibold">
                                            {item.price.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center text-[#eab308]">
                                                <span className="material-symbols-outlined text-[16px]">star</span>
                                                <span className="ml-1 text-sm text-text-ink">{item.rating?.toFixed(1) || '0.0'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => openModal(item)} className="text-text-muted hover:text-primary-container p-2">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button onClick={() => handleDeleteProduct(item.id)} className="text-text-muted hover:text-error p-2">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang đơn giản */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-border-subtle flex justify-between items-center">
                        <button 
                            disabled={page <= 1} 
                            onClick={() => handlePageChange(page - 1)}
                            className="px-3 py-1 bg-surface-container rounded-md disabled:opacity-50 text-sm font-semibold"
                        >
                            Trang trước
                        </button>
                        <span className="text-sm font-semibold text-text-muted">
                            Trang {page} / {totalPages}
                        </span>
                        <button 
                            disabled={page >= totalPages} 
                            onClick={() => handlePageChange(page + 1)}
                            className="px-3 py-1 bg-surface-container rounded-md disabled:opacity-50 text-sm font-semibold"
                        >
                            Trang sau
                        </button>
                    </div>
                )}
            </div>

            <ProductFormModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSave={handleSaveProduct} 
                editingProduct={editingProduct} 
                saving={saving}
            />
        </div>
    );
};
