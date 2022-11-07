export const transValidation = {
    email_incorrect: "Email không hợp lệ",
    gender_incorrect: "Giới tính không hợp lệ",
    password_incorrect: "Mật khẩu phải có ít nhất 6 ký tự",
    password_confirmation_incorrect: "Mật khẩu xác nhận không đúng",
};

export const transMailBookingNew = {
    subject: "Email thông báo về tiến trình đặt lịch hẹn khám bệnh tại bệnh viện Quốc tế Huế",
    template: (data) => {
        return `<h3>Cảm ơn bạn đã đặt lịch khám tại hệ thống của bệnh viện Quốc tế Huế</h3>
        <h4>Thông tin về cuộc hẹn đã đặt:</h4>
        <div>Tên bác sĩ: ${data.doctor} </div>
        <div>Thời gian: ${data.time}</div>
        <div>Ngày: ${data.date}</div>
        <div>Trạng thái: <b> Đang chờ xử lý - Một cuộc hẹn mới đang chờ xác nhận</b></div>
        <h4>Bệnh viện Quốc tế Huế sẽ tự động gửi email thông báo khi cuộc hẹn được xác nhận hoàn tất. Xin cảm ơn!</h4>`;
    },
};

export const transMailBookingFailed = {
    subject: "Email thông báo về tiến trình đặt lịch hẹn khám bệnh tại bệnh viện Quốc tế Huế",
    template: (data) => {
        return `<h3>Cảm ơn bạn đã đặt lịch khám tại hệ thống của bệnh viện Quốc tế Huế </h3>
        <h4>Thông tin về cuộc hẹn đã đặt:</h4>
        <div>Tên bác sĩ: ${data.doctor} </div>
        <div>Thời gian: ${data.time}</div>
        <div>Ngày: ${data.date}</div>
        <div>Trạng thái: <b>Hủy - ${data.reason}</b></div>
        <h4>Nếu bạn nhận thấy lỗi từ email này, vui lòng liên hệ với nhà điều hành hỗ trợ: <b> 911 911 </b>. Xin cảm ơn!</h4>`;
    },
};

export const transMailBookingSuccess = {
    subject: "Email thông báo về tiến trình đặt lịch hẹn khám bệnh tại bệnh viện Quốc tế Huế",
    template: (data) => {
        return `<h3>Cảm ơn bạn đã đặt lịch khám tại hệ thống của bệnh viện Quốc tế Huế  </h3>
        <h4>Thông tin về cuộc hẹn đã đặt:</h4>
        <div>Tên bác sĩ: ${data.doctor} </div>
        <div>Thời gian: ${data.time}</div>
        <div>Ngày: ${data.date}</div>
        <div>Trạng thái: <b>Thành công</b></div>
        <h4>Xin chân thành cảm ơn!</h4>`;
    },
};

export const transMailRemedy= {
    subject: "Email về việc gửi hóa đơn y tế từ bác sĩ qua email",
    template: (data) => {
        return `<h3>Cảm ơn bạn đã tin tưởng đặt lịch khám tại hệ thống của bệnh viện Quốc tế Huế </h3>
        Sau khi bạn đã đến phòng khám của bác sĩ <b> ${data.doctor} </b>, bạn có thể xem lại chi tiết thanh toán từ tệp đính kèm email này. </h4>
        <div>Mật khẩu để trích xuất tệp đính kèm có dạng sau: <i>Họ và tên không dấu - 3 chữ số đầu số điện thoại - 2 chữ số cuối năm sinh của bạn</div>
        <br>
        <div>Ví dụ: Họ và tên: Quang Huy, có số điện thoại đăng ký: 0123456789 và sinh: 1910, mật khẩu trích xuất là: <b> quanghuy-012-10 </b> </div>
        <br>
        <div>Trong trường hợp không nhận được tệp đính kèm cũng như không giải nén được, vui lòng liên hệ với nhà điều hành hỗ trợ. <b>911 911</b></div>
        <h4>Xin cảm ơn!</h4>`;
    },
};
