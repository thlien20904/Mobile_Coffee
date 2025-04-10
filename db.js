const sql = require("mssql");

// Cấu hình kết nối với SQL Server
const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "suli_coffee",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  requestTimeout: 5000, // Timeout 5 giây
  connectionTimeout: 5000, // Timeout kết nối 5 giây
};

// Hàm kết nối đến cơ sở dữ liệu SQL Server
async function connectDB(retries = 3, delay = 2000) {
  console.log("🔧 Đang thử kết nối đến SQL Server..."); // Thêm log
  for (let i = 0; i < retries; i++) {
    try {
      const pool = await sql.connect(config);
      console.log("✅ Kết nối SQL Server thành công!");
      return pool;
    } catch (err) {
      console.error(
        `❌ Lỗi kết nối (thử lần ${i + 1}/${retries}):`,
        err.message,
        err.stack
      );
      if (i === retries - 1) throw err;
      console.log(`⏳ Chờ ${delay}ms trước khi thử lại...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

module.exports = {
  connectDB,
  sql,
};
