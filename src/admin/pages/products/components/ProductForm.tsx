import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Product, ProductFormData } from '../../../features/products/models/product.model';
import { ProductImageUploader } from './ProductImageUploader';
import { MaterialTagInput } from './MaterialTagInput';
import { ProductStatusBadge } from './ProductStatusBadge';

interface Props {
    onSave: (data: ProductFormData) => void;
    editingProduct?: Product | null;
    saving: boolean;
    onCancel: () => void;
}

const formatVND = (value: number) => Number(value || 0).toLocaleString('vi-VN');

export const ProductForm = ({ onSave, editingProduct, saving, onCancel }: Props) => {
    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm<ProductFormData>();

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [detailFiles, setDetailFiles] = useState<File[]>([]);
    const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [avatarError, setAvatarError] = useState('');
    const [materials, setMaterials] = useState<string[]>([]);

    const watchedName = watch('name', '');
    const watchedPrice = watch('price', 0);
    const watchedOriginalPrice = watch('originalPrice', 0);
    const watchedDiscount = watch('discountPercentage', 0);
    const watchedStock = watch('stockStatus', 'in_stock');
    const watchedDescription = watch('description', '');

    useEffect(() => {
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
        } else {
            reset({ name: '', price: 0, originalPrice: 0, discountPercentage: 0, stockStatus: 'in_stock', description: '' });
            setAvatarPreview('');
            setExistingImages([]);
            setMaterials([]);
        }
        setAvatarFile(null);
        setDetailFiles([]);
        setDetailPreviews([]);
        setAvatarError('');
    }, [editingProduct, reset]);

    useEffect(() => {
        return () => {
            detailPreviews.forEach(u => { if (u.startsWith('blob:')) URL.revokeObjectURL(u); });
            if (avatarPreview.startsWith('blob:')) URL.revokeObjectURL(avatarPreview);
        };
    }, []);

    const onSubmit = (data: ProductFormData) => {
        if (!editingProduct && !avatarFile) {
            setAvatarError('Vui lòng chọn ảnh đại diện sản phẩm');
            return;
        }
        onSave({
            name: data.name, price: Number(data.price), originalPrice: Number(data.originalPrice),
            discountPercentage: Number(data.discountPercentage), stockStatus: data.stockStatus,
            description: data.description, materials,
            avatarFile, detailImageFiles: detailFiles.length > 0 ? detailFiles : undefined,
            imageUrl: !avatarFile ? (editingProduct?.imageUrl || '') : undefined,
            images: existingImages,
        });
    };

    const previewPrice = Number(watchedPrice) || 0;
    const previewOriginal = Number(watchedOriginalPrice) || 0;
    const previewDiscount = Number(watchedDiscount) || 0;
    const isSale = previewOriginal > previewPrice;
    const showBadge = isSale && previewDiscount > 0;

    const inputClass = "w-full border border-border-medium rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary-container/50 focus:border-primary-container transition-colors bg-white";
    const labelClass = "block font-body text-sm font-semibold text-text-ink mb-1.5";
    const errorClass = "text-error text-xs mt-1 font-body";

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* CỘT TRÁI: FORM */}
                <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-border-subtle">
                    <h3 className="font-body text-sm font-semibold text-text-muted uppercase tracking-widest">Thông tin sản phẩm</h3>

                    <div>
                        <label className={labelClass}>Tên sản phẩm *</label>
                        <input {...register('name', { required: 'Vui lòng nhập tên' })} className={inputClass} />
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Giá hiện tại (VNĐ) *</label>
                            <input type="number" {...register('price', { required: 'Nhập giá', min: { value: 0, message: 'Giá >= 0' } })} className={inputClass} />
                            {errors.price && <p className={errorClass}>{errors.price.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Giá gốc (VNĐ) *</label>
                            <input type="number" {...register('originalPrice', {
                                required: 'Nhập giá gốc', min: { value: 0, message: '>= 0' },
                                validate: v => Number(v) >= Number(getValues('price')) || 'Giá gốc >= giá hiện tại',
                            })} className={inputClass} />
                            {errors.originalPrice && <p className={errorClass}>{errors.originalPrice.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Giảm giá (%)</label>
                            <input type="number" {...register('discountPercentage', { min: { value: 0, message: '0%' }, max: { value: 100, message: '100%' } })} className={inputClass} />
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

                    <div>
                        <label className={labelClass}>Mô tả sản phẩm</label>
                        <textarea {...register('description')} rows={3} className={`${inputClass} resize-y`} placeholder="Nhập mô tả..." />
                    </div>

                    <div>
                        <label className={labelClass}>Chất liệu / Vật liệu</label>
                        <MaterialTagInput materials={materials} onChange={setMaterials} />
                    </div>

                    <ProductImageUploader
                        avatarPreview={avatarPreview}
                        onAvatarChange={(file, preview) => { setAvatarFile(file); if (avatarPreview.startsWith('blob:')) URL.revokeObjectURL(avatarPreview); setAvatarPreview(preview); setAvatarError(''); }}
                        avatarError={avatarError}
                        avatarRequired={!editingProduct}
                        existingImages={existingImages}
                        onRemoveExisting={(i) => setExistingImages(prev => prev.filter((_, idx) => idx !== i))}
                        detailPreviews={detailPreviews}
                        onAddDetailFiles={(files, previews) => { setDetailFiles(p => [...p, ...files]); setDetailPreviews(p => [...p, ...previews]); }}
                        onRemoveNewDetail={(i) => { const u = detailPreviews[i]; if (u?.startsWith('blob:')) URL.revokeObjectURL(u); setDetailFiles(p => p.filter((_, idx) => idx !== i)); setDetailPreviews(p => p.filter((_, idx) => idx !== i)); }}
                    />
                </form>

                {/* CỘT PHẢI: PREVIEW */}
                <div className="p-6 bg-surface-container/30">
                    <h3 className="font-body text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Xem trước sản phẩm</h3>
                    <div className="bg-surface-card rounded-xl border border-border-subtle shadow-sm overflow-hidden max-w-[320px] mx-auto">
                        <div className="aspect-square bg-surface-container relative">
                            {avatarPreview ? <img src={avatarPreview} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-text-muted"><span className="material-symbols-outlined text-[48px]">image</span></div>}
                            {showBadge && <span className="absolute top-3 left-3 bg-error text-white text-xs font-bold px-2 py-1 rounded-md">-{previewDiscount}%</span>}
                        </div>
                        <div className="p-4 space-y-2">
                            <h4 className="font-headline text-base font-semibold text-text-ink line-clamp-2">{watchedName || 'Tên sản phẩm...'}</h4>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="font-headline text-lg font-bold text-error">{formatVND(previewPrice)} đ</span>
                                {isSale && <span className="text-sm text-text-muted line-through">{formatVND(previewOriginal)} đ</span>}
                            </div>
                            <ProductStatusBadge status={watchedStock} />
                            {watchedDescription && <div className="pt-2"><p className="text-xs text-text-muted mb-1">Mô tả:</p><p className="text-sm text-text-ink line-clamp-3">{watchedDescription}</p></div>}
                            {materials.length > 0 && <div className="pt-2"><p className="text-xs text-text-muted mb-1">Chất liệu:</p><div className="flex flex-wrap gap-1">{materials.map((m, i) => <span key={i} className="text-xs bg-surface-container px-2 py-0.5 rounded-full">{m}</span>)}</div></div>}
                            {(existingImages.length > 0 || detailPreviews.length > 0) && (
                                <div className="pt-2 border-t border-border-subtle">
                                    <p className="text-xs text-text-muted mb-1.5">Ảnh chi tiết</p>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {existingImages.map((u, i) => <img key={`e-${i}`} src={u} alt="" className="w-10 h-10 object-cover rounded border border-border-subtle" />)}
                                        {detailPreviews.map((u, i) => <img key={`n-${i}`} src={u} alt="" className="w-10 h-10 object-cover rounded border border-border-subtle" />)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-border-subtle flex justify-end gap-3">
                <button type="button" onClick={onCancel} disabled={saving} className="px-5 py-2 font-body text-sm font-semibold text-text-muted hover:bg-surface-container rounded-lg transition-colors disabled:opacity-50">Hủy</button>
                <button type="submit" form="product-form" disabled={saving} className="btn-primary px-5 py-2 font-body text-sm font-semibold flex items-center gap-2 disabled:opacity-50">
                    {saving && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                    {saving ? 'Đang lưu...' : 'Lưu lại'}
                </button>
            </div>
        </div>
    );
};