const express = require("express");
const routes = require("./routes");
const { connectDB } = require("./db");
const cors = require("cors");

const app = express();

app.use(cors()); // Cho phép tất cả origin
app.use(express.json());
app.use("/api", routes);

const port = 3000;

(async () => {
  console.log("🔍 Bắt đầu kiểm tra kết nối SQL Server...");
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server chạy tại http://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      "❌ Không thể khởi động server do lỗi kết nối SQL Server:",
      err.message
    );
    process.exit(1); // Dừng quá trình nếu không thể kết nối DB
  }
})();
