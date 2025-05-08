// data/offers.js
// Dữ liệu tĩnh cho các ưu đãi (từ Home.js)
const offerDetails = [
  {
    id: 1,
    title: "Luôn Vui Tươi, Nhẹ Mới 30% + Freeship",
    subtitle: "Ưu đãi đặc biệt",
    date: "02/03",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/coffee_lover2.png"),
    description:
      "Ưu đãi giảm giá 30% cho tất cả các đơn hàng cùng với miễn phí vận chuyển. Đừng bỏ lỡ cơ hội này để thưởng thức cà phê yêu thích của bạn!",
    code: "FREESHIP30",
    validity: "Hết ngày 10/03",
  },
  {
    id: 2,
    title: "Deal Nhẹ Rộn Ràng, Chó Bạn Cờ",
    subtitle: "Ưu đãi đặc biệt",
    date: "01/03",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/coffee_lover3.png"),
    description:
      "Ưu đãi đặc biệt cho các tín đồ cà phê với deal siêu hời. Nhanh tay đặt hàng để nhận ngay quà tặng dễ thương nhé!",
    code: "DEALCHO2025",
    validity: "Hết ngày 05/03",
  },
  {
    id: 3,
    title: "Cập Nhật Từ Nhà Tét Này, Mình Phê Nhé!",
    subtitle: "Cập nhật từ Nhà",
    date: "24/01",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/coffee_lover4.png"),
    description:
      "Cập nhật mới từ Nhà với những hương vị cà phê độc đáo. Hãy thử ngay để cảm nhận sự khác biệt!",
    code: "NEWFLAVOR2025",
    validity: "Hết ngày 31/01",
  },
  {
    id: 4,
    title: "Tết Này, Mình Cà Phê Nhé!",
    subtitle: "Cập nhật từ Nhà",
    date: "24/01",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/f1.png"),
    description:
      "Chào đón năm mới với những ly cà phê đậm đà hương vị Tết. Uống cà phê, nhận lì xì may mắn!",
    code: "TET2025",
    validity: "Hết ngày 28/02",
  },
  {
    id: 5,
    title: "Mê A-Mê, Uống Là Mê!",
    subtitle: "Cập nhật từ Nhà",
    date: "14/01",
    hashtag: "#CoffeeLover",
    image: require("../assets/f2.png"),
    description:
      "Thức uống Americano từ 100% Arabica được Barista Nhà biến tấu cùng các hương vị trái cây mùa xuân, mang đến hơi sương tấp Mê A-Mê đầy tươi mới. Uống là mê!",
    code: "MEAME2025",
    validity:
      "Từ 15.01, bổ sung tập Mê A-Mê chính thức có mặt tại Hà Nội và TP.HCM (trừ SIGNATURE). Từ 16.01, Mê A-Mê có mặt tại các tỉnh thành khác.",
    drinks: [
      {
        category: "Đá tuyết mát lạnh",
        items: [
          "A-MÊ Tuyết Đào tươi mát",
          "A-MÊ Tuyết Mơ thanh mát",
          "A-MÊ Tuyết Quất thơm mát",
        ],
      },
      {
        category: "Đá viên sáng khoái",
        items: [
          "A-MÊ Classic: Mê hương vị nguyên bản",
          "A-MÊ Đào: Mê lý đào ngọt thanh",
          "A-MÊ Mơ: Mê say mơ chua ngọt",
          "A-MÊ Quất: Mê tít quất chua dịu",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Minigame Trà Xanh Tây Bắc: Đi...",
    subtitle: "Cập nhật từ Nhà",
    date: "29/08",
    hashtag: "#CoffeeLover",
    image: require("../assets/banner6.png"),
    description:
      "Tham gia minigame Trà Xanh Tây Bắc để có cơ hội nhận những phần quà hấp dẫn từ Nhà. Nhẹn tay tham gia ngay!",
    code: "TRAXANH2025",
    validity: "Hết ngày 15/09",
  },
];

// Dữ liệu cho "Phiếu ưu đãi của bạn" (từ Offers.js)
const vouchersData = [
  {
    id: 7,
    title: "Giảm 30K Đơn Từ 99K",
    subtitle: "Phiếu ưu đãi",
    date: "Hết hạn 30/04/2025",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/v1.png"),
    description:
      "Giảm ngay 30K cho đơn hàng từ 99K. Áp dụng cho tất cả các sản phẩm tại cửa hàng.",
    code: "GIAM30K",
    validity: "Hết hạn 30/04/2025",
  },
  {
    id: 8,
    title: "Giảm 30% + Freeship Đơn Từ 5 Ly",
    subtitle: "Phiếu ưu đãi",
    date: "Hết hạn 30/04/2025",
    hashtag: "Ưu đãi đặc biệt",
    image: require("../assets/v2.png"),
    description:
      "Giảm 30% và miễn phí vận chuyển cho đơn hàng từ 5 ly trở lên. Nhanh tay đặt ngay!",
    code: "GIAM30FREESHIP",
    validity: "Hết hạn 30/04/2025",
  },
];

// Dữ liệu cho "Đổi Bean" (từ Offers.js)
const exchangeData = [
  {
    id: 9,
    title: "[BTASKEE] Giảm 20K tất cả các dịch vụ",
    subtitle: "Đổi Bean",
    date: null,
    hashtag: "Đổi Bean",
    image: require("../assets/b1.png"),
    description:
      "Đổi 99 BEAN để nhận ưu đãi giảm 20K cho tất cả các dịch vụ của bTaskee.",
    code: "BTASKEE20K",
    validity: "Không giới hạn thời gian",
    beanCost: 99,
  },
  {
    id: 10,
    title: "[BTASKEE] Giảm 30% dịch vụ Tổng vệ sinh",
    subtitle: "Đổi Bean",
    date: null,
    hashtag: "Đổi Bean",
    image: require("../assets/b2.png"),
    description:
      "Đổi 99 BEAN để nhận ưu đãi giảm 30% cho dịch vụ Tổng vệ sinh của bTaskee.",
    code: "BTASKEE30PERCENT",
    validity: "Không giới hạn thời gian",
    beanCost: 99,
  },
  {
    id: 11,
    title: "[BTASKEE] Giảm 85K cho khách hàng mới của bTaskee",
    subtitle: "Đổi Bean",
    date: null,
    hashtag: "Đổi Bean",
    image: require("../assets/b3.png"),
    description:
      "Đổi 99 BEAN để nhận ưu đãi giảm 85K dành cho khách hàng mới của bTaskee.",
    code: "BTASKEE85K",
    validity: "Không giới hạn thời gian",
    beanCost: 99,
  },
  {
    id: 12,
    title: "Cơm Nhà, Pizza, Pasta giảm 10K",
    subtitle: "Đổi Bean",
    date: null,
    hashtag: "Đổi Bean",
    image: require("../assets/b4.png"),
    description:
      "Đổi 400 BEAN để nhận ưu đãi giảm 10K cho các món Cơm Nhà, Pizza, Pasta.",
    code: "FOOD10K",
    validity: "Không giới hạn thời gian",
    beanCost: 400,
  },
  {
    id: 13,
    title: "Bánh Mochi Kem chỉ 10K",
    subtitle: "Đổi Bean",
    date: null,
    hashtag: "Đổi Bean",
    image: require("../assets/db2.png"),
    description: "Đổi 400 BEAN để nhận ưu đãi Bánh Mochi Kem chỉ với giá 10K.",
    code: "MOCHI10K",
    validity: "Không giới hạn thời gian",
    beanCost: 400,
  },
];

// Dữ liệu cho tab "#CoffeeLover" (từ DiscoverMore.js)
const coffeeLoverData = [
  {
    id: 14,
    title: "Nghệ thuật pha chế - V60",
    subtitle: "#CoffeeLover",
    date: "29/08",
    hashtag: "#CoffeeLover",
    image: require("../assets/banner6.png"),
    description:
      "Tìm hiểu nghệ thuật pha chế cà phê bằng phương pháp V60, mang đến hương vị tinh tế và đậm đà.",
    code: null,
    validity: null,
  },
  {
    id: 15,
    title: "Nghệ thuật pha chế - Kalita Wave",
    subtitle: "#CoffeeLover",
    date: "28/08",
    hashtag: "#CoffeeLover",
    image: require("../assets/banner2.png"),
    description:
      "Khám phá cách pha chế cà phê với Kalita Wave, giữ trọn hương vị nguyên bản của hạt cà phê.",
    code: null,
    validity: null,
  },
  {
    id: 16,
    title: "Nghệ thuật pha chế - Cold Brew",
    subtitle: "#CoffeeLover",
    date: "27/08",
    hashtag: "#CoffeeLover",
    image: require("../assets/banner3.png"),
    description:
      "Thưởng thức cà phê Cold Brew mát lạnh, pha chế cầu kỳ để giữ được độ ngọt tự nhiên.",
    code: null,
    validity: null,
  },
  {
    id: 17,
    title: "Nghệ thuật pha chế - Espresso",
    subtitle: "#CoffeeLover",
    date: "26/08",
    hashtag: "#CoffeeLover",
    image: require("../assets/banner4.png"),
    description:
      "Espresso đậm đà, được pha chế từ những hạt cà phê chất lượng nhất.",
    code: null,
    validity: null,
  },
];

// Lọc dữ liệu theo từng loại
const specialOffersData = offerDetails.filter(
  (item) => item.subtitle === "Ưu đãi đặc biệt"
);
const updatesData = offerDetails.filter(
  (item) => item.subtitle === "Cập nhật từ Nhà"
);

export {
  offerDetails,
  specialOffersData,
  updatesData,
  coffeeLoverData,
  vouchersData,
  exchangeData,
};