import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { Product, ProductFormData } from '../../../features/products/models/product.model';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ProductFormData) => void;
    editingProduct: Product | null;
    saving?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Label + màu cho tình trạng kho
const STOCK_LABELS: Record<string, { label: string; color: string }> = {
    in_stock: { label: 'Còn hàng', color: 'text-green-600 bg-green-50 border-green-200' },
    low_stock: { label: 'Sắp hết', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    out_of_stock: { label: 'Hết hàng', color: 'text-red-600 bg-red-50 border-red-200' },
};

// Format tiền VND
const formatVND = (value: number) => Number(value || 0).toLocaleString('vi-VN');

export const ProductFormModal = ({
    isOpen, onClose, onSave, editingProduct, saving = false
}: ProductFormModalProps) => {

    const {
        register, handleSubmit, reset, watch, getValues,
        formState: { errors }
    } = useForm<ProductFormData>();

    // === State quản lý file ảnh ===
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [detailFiles, setDetailFiles] = useState<File[]>([]);
    const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [avatarError, setAvatarError] = useState<string>('');
    const [materials, setMaterials] = useState<string[]>([]);
    const [materialInput, setMaterialInput] = useState<string>('');

    // Ref để reset input file sau khi chọn
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const detailInputRef = useRef<HTMLInputElement>(null);

    // Watch form values cho preview realtime
    const watchedName = watch('name', '');
    const watchedPrice = watch('price', 0);
    const watchedOriginalPrice = watch('originalPrice', 0);
    const watchedDiscount = watch('discountPercentage', 0);
    const watchedStock = watch('stockStatus', 'in_stock');
    const watchedDescription = watch('description', ''); 

    // === Reset form khi mở modal ===
    useEffect(() => {
        if (isOpen) {
            if (editingProduct) {
                reset({
                    name: editingProduct.name,
                    price: editingProduct.price,
                    originalPrice: editingProduct.originalPrice ?? editingProduct.price,
                    discountPercentage: editingProduct.discountPercentage,
                    stockStatus: editingProduct.stockStatus || 'in_stock',
                    description: editingProduct.description || '',   
                });
                setAvatarPreview(editingProduct.imageUrl || '');
                setExistingImages(editingProduct.images || []);
                setMaterials(editingProduct.materials || []);         
            }  else {
                reset({
                    name: '',
                    price: 0,
                    originalPrice: 0,
                    discountPercentage: 0,
                    stockStatus: 'in_stock',
                });
                setAvatarPreview('');
                setExistingImages([]);
            }
            setAvatarFile(null);
            setDetailFiles([]);
            setDetailPreviews([]);
            setAvatarError('');
            setMaterialInput('');
        }
    }, [isOpen, editingProduct, reset]);

    // === Cleanup blob URLs khi component unmount ===
    useEffect(() => {
        return () => {
            detailPreviews.forEach(url => {
                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
            });
            if (avatarPreview.startsWith('blob:')) URL.revokeObjectURL(avatarPreview);
        };
    }, []);

    if (!isOpen) return null;

    //   HANDLERS
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setAvatarError('Chỉ cho phép file ảnh');
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            setAvatarError('Ảnh đại diện tối đa 5MB');
            return;
        }

        setAvatarError('');
        setAvatarFile(file);

        if (avatarPreview.startsWith('blob:')) URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleDetailFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles: File[] = [];

        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            if (file.size > MAX_FILE_SIZE) {
                alert(`Ảnh "${file.name}" vượt quá 5MB, đã bỏ qua.`);
                continue;
            }
            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            const newPreviews = validFiles.map(f => URL.createObjectURL(f));
            setDetailFiles(prev => [...prev, ...validFiles]);
            setDetailPreviews(prev => [...prev, ...newPreviews]);
        }

        // Reset input để có thể chọn lại cùng file
        if (detailInputRef.current) detailInputRef.current.value = '';
    };

    const removeNewDetailFile = (index: number) => {
        const url = detailPreviews[index];
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
        setDetailFiles(prev => prev.filter((_, i) => i !== index));
        setDetailPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleMaterialKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const value = materialInput.trim();
            if (value && !materials.includes(value)) {
                setMaterials(prev => [...prev, value]);
            }
            setMaterialInput('');
        }
    };

    const removeMaterial = (index: number) => {
        setMaterials(prev => prev.filter((_, i) => i !== index));
    };


    //   SUBMIT
    const onSubmit = (data: ProductFormData) => {
        // Validate avatar khi thêm mới
        if (!editingProduct && !avatarFile) {
            setAvatarError('Vui lòng chọn ảnh đại diện sản phẩm');
            return;
        }

        onSave({
            name: data.name,
            price: Number(data.price),
            originalPrice: Number(data.originalPrice),
            discountPercentage: Number(data.discountPercentage),
            stockStatus: data.stockStatus,
            description: data.description,
            materials: materials, 
            avatarFile: avatarFile,
            detailImageFiles: detailFiles.length > 0 ? detailFiles : undefined,
            imageUrl: !avatarFile ? (editingProduct?.imageUrl || '') : undefined,
            images: existingImages,
        });
    };

    //   PREVIEW VALUES
    const previewPrice = Number(watchedPrice) || 0;
    const previewOriginal = Number(watchedOriginalPrice) || 0;
    const previewDiscount = Number(watchedDiscount) || 0;
    const stockInfo = STOCK_LABELS[watchedStock] || STOCK_LABELS.in_stock;

    const isSale = previewOriginal > previewPrice;
    const showBadge = isSale && previewDiscount > 0;

    //   INPUT STYLE CHUNG
    const inputClass = "w-full border border-border-medium rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary-container/50 focus:border-primary-container transition-colors bg-white";
    const labelClass = "block font-body text-sm font-semibold text-text-ink mb-1.5";
    const errorClass = "text-error text-xs mt-1 font-body";

    //   RENDER
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-surface-card w-full max-w-[1100px] max-h-[90vh] rounded-xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col">

                {/* ========== HEADER ========== */}
                <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center shrink-0">
                    <h2 className="font-headline text-xl font-bold text-text-ink">
                        {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="text-text-muted hover:text-error transition-colors disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* ========== BODY: 2 CỘT ========== */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* ===== CỘT TRÁI: FORM ===== */}
                        <form
                            id="product-form"
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-border-subtle"
                        >
                            <h3 className="font-body text-sm font-semibold text-text-muted uppercase tracking-widest">
                                Thông tin sản phẩm
                            </h3>

                            {/* Tên sản phẩm */}
                            <div>
                                <label className={labelClass}>Tên sản phẩm *</label>
                                <input
                                    {...register('name', { required: 'Vui lòng nhập tên sản phẩm' })}
                                    className={inputClass}
                                />
                                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                            </div>

                            {/* Giá hiện tại + Giá gốc */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Giá hiện tại (VNĐ) *</label>
                                    <input
                                        type="number"
                                        {...register('price', {
                                            required: 'Vui lòng nhập giá',
                                            min: { value: 0, message: 'Giá phải >= 0' },
                                        })}
                                        className={inputClass}
                                        placeholder="0"
                                    />
                                    {errors.price && <p className={errorClass}>{errors.price.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Giá gốc (VNĐ) *</label>
                                    <input
                                        type="number"
                                        {...register('originalPrice', {
                                            required: 'Vui lòng nhập giá gốc',
                                            min: { value: 0, message: 'Giá gốc phải >= 0' },
                                            validate: (value) => {
                                                const price = getValues('price');
                                                if (Number(value) < Number(price)) {
                                                    return 'Giá gốc phải >= giá hiện tại';
                                                }
                                                return true;
                                            },
                                        })}
                                        className={inputClass}
                                        placeholder="0"
                                    />
                                    {errors.originalPrice && <p className={errorClass}>{errors.originalPrice.message}</p>}
                                </div>
                            </div>

                            {/* Giảm giá + Tình trạng kho */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Giảm giá (%)</label>
                                    <input
                                        type="number"
                                        {...register('discountPercentage', {
                                            min: { value: 0, message: 'Tối thiểu 0%' },
                                            max: { value: 100, message: 'Tối đa 100%' },
                                        })}
                                        className={inputClass}
                                        placeholder="0"
                                    />
                                    {errors.discountPercentage && <p className={errorClass}>{errors.discountPercentage.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Tình trạng kho</label>
                                    <select {...register('stockStatus')} className={inputClass}>
                                        <option value="in_stock">Còn hàng</option>
                                        <option value="low_stock">Sắp hết</option>
                                        <option value="out_of_stock">Hết hàng</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Mô tả sản phẩm*/}
                            <div>
                                <label className={labelClass}>Mô tả sản phẩm</label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className={`${inputClass} resize-y`}
                                    placeholder="Nhập mô tả chi tiết sản phẩm..."
                                />
                            </div>

                            {/* Chất liệu / Vật liệu*/}
                            <div>
                                <label className={labelClass}>Chất liệu / Vật liệu</label>
                                <input
                                    type="text"
                                    value={materialInput}
                                    onChange={(e) => setMaterialInput(e.target.value)}
                                    onKeyDown={handleMaterialKeyDown}
                                    className={inputClass}
                                    placeholder="Nhập chất liệu rồi nhấn Enter ↵"
                                />
                                {materials.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {materials.map((mat, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1 bg-primary-container/10 text-text-ink text-xs font-semibold px-2.5 py-1 rounded-full border border-border-subtle"
                                            >
                                                {mat}
                                                <button
                                                    type="button"
                                                    onClick={() => removeMaterial(i)}
                                                    className="hover:text-error transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <p className="text-xs text-text-muted mt-1">Nhấn Enter để thêm chất liệu mới</p>
                            </div>

                            {/* Ảnh đại diện */}
                            <div>
                                <label className={labelClass}>
                                    Ảnh đại diện sản phẩm {!editingProduct && '*'}
                                </label>
                                <div
                                    onClick={() => avatarInputRef.current?.click()}
                                    className="border-2 border-dashed border-border-medium rounded-lg p-4 text-center cursor-pointer hover:border-primary-container hover:bg-primary-container/5 transition-colors"
                                >
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar preview"
                                            className="w-24 h-24 object-cover rounded-lg mx-auto border border-border-subtle"
                                        />
                                    ) : (
                                        <div className="text-text-muted">
                                            <span className="material-symbols-outlined text-[32px] block mb-1">add_photo_alternate</span>
                                            <p className="text-xs">Nhấn để chọn ảnh đại diện</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                {avatarPreview && (
                                    <p className="text-xs text-text-muted mt-1">Nhấn vào ảnh để đổi ảnh khác</p>
                                )}
                                {avatarError && <p className={errorClass}>{avatarError}</p>}
                            </div>

                            {/* Ảnh chi tiết */}
                            <div>
                                <label className={labelClass}>Ảnh chi tiết sản phẩm</label>
                                <div
                                    onClick={() => detailInputRef.current?.click()}
                                    className="border-2 border-dashed border-border-medium rounded-lg p-4 text-center cursor-pointer hover:border-primary-container hover:bg-primary-container/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[28px] text-text-muted block mb-1">photo_library</span>
                                    <p className="text-xs text-text-muted">Nhấn để chọn nhiều ảnh chi tiết</p>
                                </div>
                                <input
                                    ref={detailInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleDetailFilesChange}
                                    className="hidden"
                                />

                                {/* Thumbnails ảnh cũ*/}
                                {existingImages.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-text-muted mb-2">Ảnh hiện tại:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {existingImages.map((url, i) => (
                                                <div key={`existing-${i}`} className="relative group">
                                                    <img src={url} alt="" className="w-16 h-16 object-cover rounded-md border border-border-subtle" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingImage(i)}
                                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[12px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Thumbnails ảnh mới chọn */}
                                {detailPreviews.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-text-muted mb-2">Ảnh mới thêm:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {detailPreviews.map((url, i) => (
                                                <div key={`new-${i}`} className="relative group">
                                                    <img src={url} alt="" className="w-16 h-16 object-cover rounded-md border border-border-subtle" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewDetailFile(i)}
                                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[12px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* ===== CỘT PHẢI: PREVIEW ===== */}
                        <div className="p-6 bg-surface-container/30">
                            <h3 className="font-body text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">
                                Xem trước sản phẩm
                            </h3>

                            {/* Card preview */}
                            <div className="bg-surface-card rounded-xl border border-border-subtle shadow-sm overflow-hidden max-w-[320px] mx-auto">
                                {/* Ảnh đại diện */}
                                <div className="aspect-square bg-surface-container relative">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-text-muted">
                                            <span className="material-symbols-outlined text-[48px]">image</span>
                                        </div>
                                    )}

                                    {/* Badge giảm giá */}
                                    {showBadge && (
                                        <span className="absolute top-3 left-3 bg-error text-white text-xs font-bold px-2 py-1 rounded-md">
                                            -{previewDiscount}%
                                        </span>
                                    )}
                                </div>

                                {/* Thông tin sản phẩm */}
                                <div className="p-4 space-y-2">
                                    {/* Tên */}
                                    <h4 className="font-headline text-base font-semibold text-text-ink line-clamp-2">
                                        {watchedName || 'Tên sản phẩm...'}
                                    </h4>

                                    {/* Giá */}
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="font-headline text-lg font-bold text-error">
                                            {formatVND(previewPrice)} đ
                                        </span>
                                        {isSale && (
                                            <span className="text-sm text-text-muted line-through">
                                                {formatVND(previewOriginal)} đ
                                            </span>
                                        )}
                                    </div>

                                    {/* Tình trạng kho */}
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${stockInfo.color}`}>
                                        {stockInfo.label}
                                    </span>

                                    {/* Mô tả*/}
                                    {watchedDescription && (
                                        <div className="pt-2">
                                            <p className="text-xs text-text-muted mb-1">Mô tả:</p>
                                            <p className="text-sm text-text-ink line-clamp-3">{watchedDescription}</p>
                                        </div>
                                    )}
                                    {/* Chất liệu*/}
                                    {materials.length > 0 && (
                                        <div className="pt-2">
                                            <p className="text-xs text-text-muted mb-1">Chất liệu:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {materials.map((mat, i) => (
                                                    <span key={i} className="text-xs bg-surface-container px-2 py-0.5 rounded-full">
                                                        {mat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Thumbnail ảnh chi tiết */}
                                    {(existingImages.length > 0 || detailPreviews.length > 0) && (
                                        <div className="pt-2 border-t border-border-subtle">
                                            <p className="text-xs text-text-muted mb-1.5">Ảnh chi tiết</p>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {existingImages.map((url, i) => (
                                                    <img key={`pe-${i}`} src={url} alt="" className="w-10 h-10 object-cover rounded border border-border-subtle" />
                                                ))}
                                                {detailPreviews.map((url, i) => (
                                                    <img key={`pn-${i}`} src={url} alt="" className="w-10 h-10 object-cover rounded border border-border-subtle" />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Giải thích logic giá */}
                            <div className="mt-6 p-3 bg-surface-card rounded-lg border border-border-subtle">
                                <p className="text-xs font-semibold text-text-ink mb-2">Trạng thái hiển thị giá:</p>
                                {!isSale ? (
                                    <p className="text-xs text-text-muted">
                                        ✅ Giá gốc = Giá hiện tại → <strong>Không giảm giá</strong>
                                    </p>
                                ) : !showBadge ? (
                                    <p className="text-xs text-text-muted">
                                        📉 Giá gốc &gt; Giá hiện tại, Giảm giá = 0% → <strong>Đang sale (không badge)</strong>
                                    </p>
                                ) : (
                                    <p className="text-xs text-text-muted">
                                        🏷️ Giá gốc &gt; Giá hiện tại, Giảm giá = {previewDiscount}% → <strong>Đang sale có badge</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== FOOTER ========== */}
                <div className="px-6 py-4 border-t border-border-subtle flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="px-5 py-2 font-body text-sm font-semibold text-text-muted hover:bg-surface-container rounded-lg transition-colors disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        disabled={saving}
                        className="btn-primary px-5 py-2 font-body text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {saving ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                </div>
            </div>
        </div>
    );
};
