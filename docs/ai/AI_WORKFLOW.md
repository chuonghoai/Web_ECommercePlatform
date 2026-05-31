# AI Agent Workflow

Tài liệu này định nghĩa quy trình làm việc (workflow) BẮT BUỘC dành cho AI Agent trước khi thực hiện bất kỳ thay đổi nào trong source code của dự án E-Commerce Platform.

## 1. Startup Workflow

Ngay khi bắt đầu một task mới, AI phải thực hiện các bước sau:
1. **Đọc tài liệu kiến trúc**: Đọc các file trong `docs/architecture/` (đặc biệt là `ARCHITECTURE_OVERVIEW.md` và `ARCHITECTURE_RULES.md`) để hiểu quy tắc của dự án.
2. **Xác định Feature**: Phân tích yêu cầu để xác định xem thay đổi sẽ diễn ra ở Feature nào (trong `src/features/`) hay Page nào (trong `src/pages/`), hay cần tạo mới.
3. **Tìm module tương đương**: Tìm kiếm và đọc code của một module đã hoàn thiện trong codebase (ví dụ: `features/products` hoặc `pages/cart`) để lấy đó làm mốc tham chiếu cho phong cách code.

## 2. Architecture Validation Workflow

Trước khi tiến hành viết code, AI cần chuẩn bị:
- **Đọc `ARCHITECTURE_RULES.md`**: Để biết cách chia tầng Controller - Store - Service - Repository.
- **Đọc `ENGINEERING_SKILLS.md`**: Để biết "Good Example" và "Bad Example" cho task sắp làm.
- **Đọc `ANTI_PATTERN_CATALOG.md`**: Để biết những lỗi cấm kỵ (như The God Page, import ngược tầng).

Sau khi định hình được giải pháp trong đầu, AI phải **tự kiểm tra (Self-Check)**:
- Giải pháp đề xuất có vi phạm Layer Architecture không?
- Có vô tình tạo ra một Design Pattern mới chưa từng có trong project không?
- Giải pháp có đi ngược lại với convention hiện tại không? (Ví dụ: Tự ý bỏ qua `.controller.ts` mà nhét hết code vào `.tsx`).

## 3. Coding Workflow

Quy trình thực hiện code phải tuân theo thứ tự:
1. **Understand**: Hiểu rõ yêu cầu nghiệp vụ của user.
2. **Analyze**: Phân tích xem cần sửa/tạo những file nào dựa trên kiến trúc hiện tại (Model, Repo, Service, Store, Controller, Page).
3. **Find Existing Pattern**: Tìm code tương tự đang có trong project.
4. **Implement**: Viết code, tái sử dụng tối đa code cũ.
5. **Self Review**: Tự rà soát lại code vừa viết.
6. **Architecture Validation**: Đối chiếu code với `CODE_REVIEW_CHECKLIST.md` để đảm bảo không vi phạm kiến trúc.

## 4. Mandatory Rules (Quy tắc cấm kỵ)

AI **KHÔNG ĐƯỢC**:
- Tạo ra kiến trúc mới (Ví dụ: Tự ý mang Clean Architecture strict, CQRS, Redux saga vào nếu project đang dùng Controller/Store pattern hiện tại).
- Tạo ra Design Pattern mới thay cho pattern đang tồn tại.
- Bỏ qua convention đặt tên và tổ chức thư mục hiện có.
- Duplicate code (copy-paste logic) nếu trong project đã có implementation tương tự (ví dụ utils, hooks chung).

## 5. Final Validation Checklist

Trước khi thông báo hoàn thành task, AI phải tự đánh giá:
- [ ] Mình có bỏ qua file `.controller.ts` và nhét logic vào `.tsx` không?
- [ ] Mình có import từ `pages/` vào `features/` (vi phạm dependency) không?
- [ ] Mình có để logic tính toán nghiệp vụ (filter, map phức tạp) lọt vào `*.repository.ts` không?
- [ ] File UI `.tsx` có vượt quá 250-300 dòng không? Đã tách component chưa?
- [ ] Có nhớ tạo đủ Interface và `MockRepository` kèm theo `ApiRepository` khi thêm endpoint mới không?
