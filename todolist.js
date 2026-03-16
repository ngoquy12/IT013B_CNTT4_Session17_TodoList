// Khởi tạo dữ liệu ban đầu cho danh sách công việc
const listJob = [
  {
    id: 1,
    name: "Thiết kế giao diện Dashboard cho khách hàng",
    status: true,
  },
  {
    id: 2,
    name: "Gửi báo cáo tuần cho quản lý dự án",
    status: true,
  },
  {
    id: 3,
    name: "Họp team brainstorm tính năng mới",
    status: true,
  },
];

// Đẩy dữ liệu mẫu lên local
// localStorage.setItem("jobs", JSON.stringify(listJob));

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Lấy ra các phần tử trong HTML
const taskListElement = document.querySelector("#task-list");
const footerElement = document.querySelector("#footer");
const completedOfTotalElement = document.querySelector("#completedOfTotal");
const completedAllElement = document.querySelector("#completed-all");
const inputElement = document.querySelector("#input");
const buttonElement = document.querySelector("#button");
const buttonClearElement = document.querySelector("#button-clear");

// Hàm tính số lượng công việc đã hoàn thành
const caculatorJobCompleted = (jobs) => {
  // Lọc ra các công việc có trạng thái là true
  const jobCompleted = jobs.filter((job) => job.status);

  // Trả về số lượng công việc đã hoàn thành
  return jobCompleted.length;
};

// Hàm render footer
const renderFooter = (jobs) => {
  if (Array.isArray(jobs)) {
    // Nếu chưa có công việc nào
    if (jobs.length === 0) {
      footerElement.style.display = "none";
    } else if (
      caculatorJobCompleted(jobs) > 0 &&
      caculatorJobCompleted(jobs) < jobs.length
    ) {
      // Nếu có từ 1 đến nhiều công việc hoàn thành
      completedOfTotalElement.textContent = `Đã hoàn thành: ${caculatorJobCompleted(jobs)} trên ${jobs.length} công việc`;
    } else if (caculatorJobCompleted(jobs) === jobs.length) {
      // Tất cả công việc đã hoàn thành
      completedAllElement.style.display = "flex";

      // Ẩn số lượng công việc đã hoàn thành nhưng chưa hết
      completedOfTotalElement.style.display = "none";
    }
  }
};

const renderData = (jobs) => {
  if (Array.isArray(jobs)) {
    const jobMaps = jobs.map((job) => {
      return `
        <div
          class="task-item group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-border-dark/30 rounded-lg transition-all border-b border-slate-50 dark:border-border-dark/20 last:border-0"
        >
          <div class="flex items-center gap-4 flex-1">
            <label class="relative flex items-center cursor-pointer">
              <input
              ${job.status ? "checked" : ""}
                class="peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-slate-300 dark:border-slate-600 checked:bg-primary checked:border-primary transition-all"
                type="checkbox"
              />
              <span
                class="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm pointer-events-none"
                >check</span
              >
            </label>
            ${
              job.status
                ? `<s class="text-slate-700 dark:text-slate-200 font-medium">${job.name}</s>`
                : `<span class="text-slate-700 dark:text-slate-200 font-medium">${job.name}</span>`
            }
            
          </div>
          <div
            class="action-buttons flex items-center gap-1 opacity-0 transition-opacity"
          >
            <button
              class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
            >
              <span class="material-symbols-outlined text-xl">edit</span>
            </button>
            <button
              class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
            >
              <span class="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>
        </div>
        `;
    });

    // Chuyển đổi từ 1 mảng thành 1 chuỗi
    const html = jobMaps.join("");

    // Gán chuỗi HTML vào giao diện
    taskListElement.innerHTML = html;
  }

  //   Hiển thị footer
  renderFooter(jobs);
};

renderData(jobs);

// Lắng nghe sự kiện thêm
buttonElement.addEventListener("click", () => {
  // Lấy dữ liệu từ input
  // Validate dữ liệu: kiểm tra rỗng, trùng
  if (!inputElement.value) {
    alert("Tên công việc không được để trống");
  } else {
    // Tạo đối tượng công việc mới
    const newJob = {
      id: jobs.length + 1,
      name: inputElement.value,
      status: false,
    };

    // Thêm công việc vào mảng
    jobs.unshift(newJob);

    // Đẩy dữ liệu mới lên local
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Render lại dữ liệu mới nhất
    renderData(jobs);

    // Xóa giá trị trong input
    inputElement.value = "";
  }
});

const handleClearAllData = () => {
  const isConfirm = confirm("Bạn có xác nhận xóa tất cả dữ liệu không?");

  if (isConfirm) {
    const emptyJobs = [];

    // Làm rỗng dữ liệu trên local
    localStorage.setItem("jobs", JSON.stringify(emptyJobs));

    // Render lại giao diện
    renderData(emptyJobs);
  }
};

// Lắng nghe sự kiện xóa tất cả công việc
buttonClearElement.addEventListener("click", handleClearAllData);
