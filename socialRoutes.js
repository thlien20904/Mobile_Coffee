// const express = require("express");
// const router = express.Router();
// const { OAuth2Client } = require("google-auth-library");
// const { connectDB, sql } = require("./db"); // Import connectDB để lưu user vào database nếu cần

// // Thay bằng Google Client ID của bạn (cùng Client ID bạn đã dùng trong Register.js/Login.js)
// const GOOGLE_CLIENT_ID = "196567997139-p044mv6762uo94cc5s8ruarv6n5hfe3v.apps.googleusercontent.com";
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// // Route xử lý redirect từ Google/Facebook
// // router.get("/auth/redirect", (req, res) => {
// //   // Redirect về testx://auth/redirect với các tham số từ Google/Facebook
// //   const redirectUrl = `testx://auth/redirect?${req.url.split('?')[1] || ''}`;
// //   res.redirect(redirectUrl);
// // });

// router.get("/auth/redirect", (req, res) => {
//     // Không cần redirect thủ công nếu redirect_uri đã đúng
//     res.status(200).send("Redirect successful");
//   });
// // Endpoint để xử lý đăng nhập Google
// router.post("/google-login", async (req, res) => {
//   const { token } = req.body; // Nhận id_token từ client
//   try {
//     // Xác minh id_token với Google
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     // Tạo thông tin người dùng từ payload của Google
//     const user = {
//       username: payload.email.split("@")[0], // Tạo username từ email
//       fullName: payload.name || "",
//       email: payload.email || "",
//       avatarUrl: payload.picture || "",
//       phone: "", // Google không cung cấp số điện thoại
//       address: "",
//     };

//     // Kết nối đến database để lưu hoặc kiểm tra user
//     const pool = await connectDB();

//     // Kiểm tra xem email đã tồn tại trong database chưa
//     const existingUser = await pool
//       .request()
//       .input("email", sql.NVarChar, user.email)
//       .query("SELECT * FROM Users WHERE Email = @email");

//     if (existingUser.recordset.length === 0) {
//       // Nếu user chưa tồn tại, tạo mới user trong database
//       await pool
//         .request()
//         .input("username", sql.NVarChar, user.username)
//         .input("email", sql.NVarChar, user.email)
//         .input("fullName", sql.NVarChar, user.fullName)
//         .input("avatarUrl", sql.NVarChar, user.avatarUrl)
//         .input("phone", sql.NVarChar, user.phone || null)
//         .input("address", sql.NVarChar, user.address || null)
//         .query(`
//           INSERT INTO Users (Username, Email, FullName, AvatarUrl, Phone, Address, Role)
//           VALUES (@username, @email, @fullName, @avatarUrl, @phone, @address, 'User')
//         `);
//     }

//     // Trả về thông tin người dùng cho client
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error("Error verifying Google token:", error);
//     res.status(401).json({ success: false, error: "Invalid Google token" });
//   }
// });

// // Endpoint để xử lý đăng nhập Facebook
// router.post("/facebook-login", async (req, res) => {
//   const { token } = req.body; // Nhận access_token từ client
//   try {
//     // Gọi API của Facebook để xác minh access_token
//     const response = await fetch(
//       `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
//     );
//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     // Tạo thông tin người dùng từ dữ liệu của Facebook
//     const user = {
//       username: data.id, // Sử dụng ID Facebook làm username
//       fullName: data.name || "",
//       email: data.email || `${data.id}@facebook.com`, // Nếu không có email, tạo email giả
//       avatarUrl: data.picture?.data?.url || "",
//       phone: "",
//       address: "",
//     };

//     // Kết nối đến database để lưu hoặc kiểm tra user
//     const pool = await connectDB();

//     // Kiểm tra xem email đã tồn tại trong database chưa
//     const existingUser = await pool
//       .request()
//       .input("email", sql.NVarChar, user.email)
//       .query("SELECT * FROM Users WHERE Email = @email");

//     if (existingUser.recordset.length === 0) {
//       // Nếu user chưa tồn tại, tạo mới user trong database
//       await pool
//         .request()
//         .input("username", sql.NVarChar, user.username)
//         .input("email", sql.NVarChar, user.email)
//         .input("fullName", sql.NVarChar, user.fullName)
//         .input("avatarUrl", sql.NVarChar, user.avatarUrl)
//         .input("phone", sql.NVarChar, user.phone || null)
//         .input("address", sql.NVarChar, user.address || null)
//         .query(`
//           INSERT INTO Users (Username, Email, FullName, AvatarUrl, Phone, Address, Role)
//           VALUES (@username, @email, @fullName, @avatarUrl, @phone, @address, 'User')
//         `);
//     }

//     // Trả về thông tin người dùng cho client
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error("Error verifying Facebook token:", error);
//     res.status(401).json({ success: false, error: "Invalid Facebook token" });
//   }
// });

// module.exports = router;