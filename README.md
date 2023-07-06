1. Hệ thống chính

- Là ứng dụng dạng quản lý có chức năng giỏ hàng, thanh toán, thống kê, CRUD,…
- Có xác thực, phân quyền với ít nhất 2 loại người dùng.
- Có 2 loại giao diện cho phần Client (người dùng) và Admin (quản trị hệ thống).
- Có sử dụng database với dữ liệu tương đối đầy đủ và có nghĩa:
  - Movie gồm các thông tin: title, genres, year, rating, ranking, poster, casts, director, pilot, review,…
  - Diễn viên và đạo diễn gồm các thông tin: name, nickname, realname, birth, gender, movies,…
  - Dữ liệu cần tối thiểu 50 phim chia phủ các thể loại cùng diễn viên và đạo diễn tương ứng.
- Chức năng
  - Hiển thị thông tin phim theo danh sách, cho phép xem chi tiết cùng các thông tin liên
    qua có liên kết (xem thông tin chi tiết diễn viên, đạo diễn,…), có áp dụng AJAX
  - Cho phép tìm kiếm, lọc phim
  - Quản lý tài khoản, phân quyền phù hợp chức năng lựa chọn
  - Có quản lý thống kê, vẽ biểu đồ.
  - Chủ đề chính là web cung cấp dịch vụ xem phim trực tuyến như netflix
  - Giao diện duyệt phim như netflix (có highlight, play trailer,…)
  - Có quản lý voucher, khách hàng thân thiết,…
  - Có lưu lịch sử, có chức năng xem tiếp

2. Hệ thống quản lý thanh toán

- Hệ thống khởi tạo với 1 tài khoản chính để nhận thanh toán đơn hàng từ
  người dùng (mỗi người dùng có 1 tài khoản thanh toán trên hệ thống phụ).
- Tài khoản chỉ gồm ID và số dư hiện tại.
- Chức năng
  - Thiết kế database để hệ thống thực hiện được chức năng thanh toán
    (chuyển khoản) từ các tài khoản người dùng sang tài khoản chính.
  - Cần có chức năng thêm tài khoản cho người dùng mới (tương ứng khi
    được tạo tài khoản ở hệ thống chính).
  - Cần có giải pháp để có thể đối soát giao dịch thanh toán.

3. Liên kết hệ thống Quản lý và Thanh toán

- Sử dụng WebAPI
- Cần đề xuất quy trình hợp lý (có xác thực bảo mật).

4. Submission

- Follow to the project deadlines specified on the Moodle pages.
- Convert Word documents to PDF before submitting.
- In addition to the main reports, include a file containing screenshots of Jira tasks or Git commits in the submission.
- The compressed submission should be named group09.zip.

5. References

- https://www.youtube.com/watch?v=lATafp15HWA
- https://www.youtube.com/watch?v=Een66E0X_os&t=127s
- https://www.youtube.com/watch?v=b6qHfPdv4Y8
- https://axios-http.com/docs/intro
- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://en.wikipedia.org/wiki/List_of_Ajax_frameworks
- https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
- https://blog.testdouble.com/posts/2019-11-04-react-mvc/#code-example
