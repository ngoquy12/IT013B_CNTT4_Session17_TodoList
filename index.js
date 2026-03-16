// 1. Thao tác thêm dữ liệu lên localStorage
localStorage.setItem("userName", "Nguyễn Văn B");
localStorage.setItem("age", 20);
localStorage.setItem("isMarried", true);

const users = [
  {
    id: 1,
    name: "Lê Văn A",
    isMarried: true,
  },
  {
    id: 2,
    name: "Lê Văn B",
    isMarried: false,
  },
];

// Note: Dữ liệu có kiểu object, array, khi lưu lên localStorage sẽ
// không được hiểu bởi vì dữ liệu trên local phải có định dạng là JSON

// Cách chuyển đổi dữ liệu từ dạng JS sang JSON
console.log(JSON.stringify(users));

localStorage.setItem("users", JSON.stringify(users));

// 2. Thao tác đọc dữ liệu
console.log("userName: ", localStorage.getItem("userName"));
console.log("age: ", localStorage.getItem("age"));
console.log("age: ", localStorage.getItem("ages"));

// Cách chuyển đổi từ kiểu JSON sang kiểu của JS
console.log("user đã chuyển đổi: ", JSON.parse(localStorage.getItem("users")));

// 3. Thao tác xóa 1 key khỏi localStorage
localStorage.removeItem("age");
localStorage.removeItem("isMarried");

// 4. Thao tác xóa tất cả dữ liệu khỏi local
localStorage.clear();
