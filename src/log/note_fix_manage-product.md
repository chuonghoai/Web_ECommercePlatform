# HƯỚNG DẪN REFACTOR MODULE ADMIN - MANAGE PRODUCT

(Tài liệu này ghi chú các bước cần sửa, không sửa trực tiếp vào code theo yêu cầu)

---
## 1. Refactor Repository Layer (`src/admin/features/products/repositories`)

Áp dụng mô hình Repository Pattern với Interface, Api Implementation và Mock Implementation để đồng bộ với cấu trúc của project (như module `auth`).

### 1.1. Product Repository
- **Tạo Interface `IProductRepository`** (có thể sửa lại tên từ file `product.repository.ts` hiện tại):
  - Định nghĩa các hàm: `getProducts`, `deleteProduct`, `createProduct`, `updateProduct`.
  - Thay đổi payload của create/update sang dạng Model có chứa `imageId` và `imageIds` thay vì URL trực tiếp.

- **Tạo `ProductApiRepository`** (`productApi.repository.ts`):
  - Implements `IProductRepository`.
  - Bọc logic gọi `apiClient` từ `product.repository.ts` cũ sang đây.

- **Tạo `ProductMockRepository`** (`productMock.repository.ts`):
  - Implements `IProductRepository`.
  - Trả về danh sách fake data, dùng khi bật cờ mock trong hệ thống (`USE_MOCK=true`).

### 1.2. Upload Repository
- **Tạo Interface `IUploadRepository`** (có thể sửa tên từ `upload.repository.ts`):
  - Gồm các hàm:
    - `getUploadSignature(): Promise<ApiResponse<UploadSignatureResponse>>`
    - `uploadToCloudinary(file: File, signatureData: any): Promise<{ secure_url: string; public_id: string }>`
    - `saveImageMetadata(data: { url: string; publicId: string }): Promise<ApiResponse<{ imageId: string }>>`

- **Tạo `UploadApiRepository`** (`uploadApi.repository.ts`):
  - Implements `IUploadRepository`.
  - `uploadToCloudinary` gọi HTTP Post trực tiếp lên `https://api.cloudinary.com/v1_1/<cloud_name>/image/upload` bằng `fetch` hoặc `axios`.

- **Tạo `UploadMockRepository`** (`uploadMock.repository.ts`):
  - Implements `IUploadRepository`.
  - Trả về fake url và fake `imageId`.

---
## 2. Refactor Models (`src/admin/features/products/models/product.model.ts`)

- Định nghĩa interface `UploadSignatureResponse` để nhận kết quả từ backend (chứa `timestamp`, `signature`, `apiKey`, `cloudName`, `folder`).
- Sửa/thêm type request cho `CreateProductRequest` và `UpdateProductRequest`:
  - `imageId?: string` thay cho `imageUrl?: string`.
  - `imageIds?: string[]` thay cho `images?: string[]`.
- Cập nhật `ProductFormData` có thêm trường `imageId` và `imageIds` tương ứng.

---
## 3. Refactor Services (`src/admin/features/products/services/product.service.ts`)

- Cập nhật class `ProductService` inject các repository qua constructor:
  ```ts
  constructor(
      private readonly productRepository: IProductRepository,
      private readonly uploadRepository: IUploadRepository
  ) {}
  ```
- Khởi tạo instance ở cuối file:
  ```ts
  export const productService = new ProductService(
      USE_MOCK ? new ProductMockRepository() : new ProductApiRepository(),
      USE_MOCK ? new UploadMockRepository() : new UploadApiRepository()
  );
  ```
- Sửa hàm `uploadImage`:
  1. `const signature = await uploadRepository.getUploadSignature()`
  2. `const cloudinaryRes = await uploadRepository.uploadToCloudinary(file, signature)`
  3. `const metadata = await uploadRepository.saveImageMetadata(...)`
  4. Trả về `metadata.imageId`.
- Sửa hàm `uploadMultipleImages`:
  - Lặp qua các file gọi `uploadImage` bằng `Promise.all` hoặc dùng tuần tự để lấy về danh sách các `imageId` (chứ không phải URL ảnh).
- Sửa hàm `saveProduct`:
  - Payload gửi lên `productRepository` sử dụng `imageId` và `imageIds` thay thế cho url.

---
## 4. Refactor Toàn Bộ TSX Theo Đúng Kiến Trúc Dự Án

### 4.1 Tách View - Controller - Store
- **Store (`products.store.ts`)**: Chỉ chứa state (zustand/redux hoặc context state), filter, pagination, search keyword, và form state nếu cần thiết.
- **Controller (`products.controller.ts`)**: Chứa logic xử lý (Submit form, API call create/update/delete, điều hướng route, điều phối dữ liệu từ Service đổ vào Store).
- **View (`ProductsPage.tsx`, form tạo, form sửa)**: Tuyệt đối không chứa logic xử lý phức tạp hay gọi API trực tiếp. Chỉ render UI, bind sự kiện qua Controller và hiển thị state từ Store.

### 4.2 Loại Bỏ `ProductFormModal` & Chuyển Thành Route Riêng
- Xóa bỏ hoàn toàn cách quản lý form dưới dạng Modal (xóa `ProductFormModal.tsx`).
- Tạo các route page mới tương ứng:
  - **Trang tạo sản phẩm mới**: `/admin/products/create` (Ví dụ: `CreateProductPage.tsx`).
  - **Trang chỉnh sửa sản phẩm**: `/admin/products/:id/edit` (Ví dụ: `EditProductPage.tsx`).
- Form ở trang tạo/sửa phải được render dưới dạng Full Page, điều phối trạng thái submit thông qua Controller.

### 4.3 Bổ Sung Trang Chi Tiết Sản Phẩm
- **Route**: `/admin/products/:id` (Ví dụ: `ProductDetailPage.tsx`).
- **Chức năng**: Hiển thị chi tiết tất cả các trường (Thông tin cơ bản, hình ảnh, danh mục, thương hiệu, trạng thái, biến thể, tồn kho, ...).
- **Điều hướng**: 
  - Tại bảng sản phẩm (Danh sách), nút "Xem chi tiết" redirect sang `/admin/products/:id`.
  - Nút "Chỉnh sửa" redirect sang `/admin/products/:id/edit`.

### 4.4 Tách Nhỏ Component Giao Diện
- Không để dồn giao diện vào một file TSX quá lớn. Phải chia nhỏ code ra folder `components/` tương tự các tính năng khác trong `src/features/` và `src/pages/`.
- Phân chia các component thành phần ví dụ:
  - `ProductTable.tsx`: Quản lý render bảng.
  - `ProductTableRow.tsx`: Hiển thị 1 row, format giá/status.
  - `ProductSearchBar.tsx`: Thanh search.
  - `ProductFilterTabs.tsx`: Tab filter danh mục/trạng thái.
  - `ProductStatusBadge.tsx`: Badge hiển thị trạng thái kho (ví dụ: Còn hàng/Hết hàng).
  - `ProductImageUploader.tsx`: Component chuyên tách riêng logic preview và UI cho file input upload ảnh.

### 4.5 Đối Chiếu Convention Chung
- Tất cả kiến trúc mới kể trên phải đảm bảo tuân theo đúng pattern và convention đang có sẵn ở các module đã xây dựng từ trước của project (ví dụ module user, auth, order...).
- Không sáng tạo kiến trúc lạ, nếu cấu trúc thư mục, cách chia hook, hoặc controller đang được viết theo kiểu nào ở các chức năng cũ thì làm y chang cho module Product Admin.

---
## 5. Refactor UI Controller (`src/admin/pages/products/products.controller.ts`)

- Cập nhật lại `handleSaveProduct`:
  - Sau khi gọi `productService.uploadImage` hoặc `productService.uploadMultipleImages`, giá trị trả về sẽ là `imageId` / `imageIds`.
  - Bọc dữ liệu `productData` gửi qua `saveProduct` với các ID vừa lấy được để backend map với DB. 
  - (Cần cân nhắc trường hợp edit giữ nguyên ảnh cũ thì lấy ID của ảnh cũ như thế nào nếu `Product` model hiện tại chỉ có URL - có thể cần BE trả kèm `imageId` 