const sql = require("mssql"); // Import thư viện mssql để tương tác với SQL Server

// Cấu hình kết nối với SQL Server
const config = {
  user: "sa", // Tên người dùng SQL Server
  password: "123456", // Mật khẩu của người dùng SQL Server
  server: "localhost", // Địa chỉ của SQL Server (localhost trong trường hợp này)
  database: "suli_coffee", // Tên cơ sở dữ liệu cần kết nối
  options: {
    encrypt: false, // Tắt mã hóa kết nối (thường dùng cho môi trường local)
    trustServerCertificate: true, // Tin tưởng chứng chỉ của máy chủ (thường dùng cho localhost)
  },
  requestTimeout: 5000, // Thời gian chờ yêu cầu (5 giây)
  connectionTimeout: 5000, // Thời gian chờ kết nối (5 giây)
};

// Hàm kết nối đến cơ sở dữ liệu SQL Server
async function connectDB(retries = 3, delay = 2000) {
  console.log("🔧 Đang thử kết nối đến SQL Server..."); // Log thông báo đang thử kết nối
  for (let i = 0; i < retries; i++) {
    // Thử kết nối lại nhiều lần nếu có lỗi
    try {
      // Tạo một pool kết nối đến SQL Server
      const pool = await sql.connect(config);
      console.log("✅ Kết nối SQL Server thành công!"); // Nếu kết nối thành công
      return pool; // Trả về pool kết nối
    } catch (err) {
      // Nếu có lỗi trong quá trình kết nối
      console.error(
        `❌ Lỗi kết nối (thử lần ${i + 1}/${retries}):`, // In ra thông báo lỗi
        err.message, // Lỗi chi tiết
        err.stack // Stack trace để kiểm tra nguyên nhân lỗi
      );
      if (i === retries - 1) throw err; // Nếu đã thử hết số lần tối đa thì ném lỗi
      console.log(`⏳ Chờ ${delay}ms trước khi thử lại...`); // Log thông báo sẽ thử lại sau một khoảng thời gian
      await new Promise((resolve) => setTimeout(resolve, delay)); // Chờ 2 giây trước khi thử lại
    }
  }
}

// Xuất hàm connectDB và đối tượng sql để sử dụng ở nơi khác trong dự án
module.exports = {
  connectDB, // Cung cấp hàm kết nối
  sql, // Cung cấp đối tượng sql để thực hiện các truy vấn khác
};
