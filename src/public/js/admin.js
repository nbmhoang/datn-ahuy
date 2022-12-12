var loadFile = function(event) {
    var output = $("#image-preview");
    if ($('#image-clinic').val()) {
        output.removeClass('d-none');
        output.addClass('d-block');
        output.attr('src', URL.createObjectURL(event.target.files[0]));
    }
};

function loadImageUserSetting() {
    var output = $("#img-user-setting");
    if ($('#update-avatar').val()) {
        output.attr('src', URL.createObjectURL(event.target.files[0]));
    }
}

function createNewPost(markdown, converter) {
    $('#createNewPost').on('click', function(event) {
        let formData = new FormData($('form#formCreateNewPost')[0]);
        let contentMarkdown = markdown.value();
        let contentHTML = converter.makeHtml(contentMarkdown);
        formData.append('contentMarkdown', contentMarkdown);
        formData.append('contentHTML', contentHTML);
        formData.append('title', $('#title-post').val());

        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }
        $.ajax({
            method: "POST",
            url: `${window.location.origin}/supporter/manage/post/create`,
            data: data,
            success: function(data) {
                alert('A new post is created successfully!');
                window.location.href = `${window.location.origin}/supporter/manage/posts`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error)
            }
        });

    });
}

function deleteClinicById() {
    $('.delete-specific-clinic').bind('click', function(e) {
        e.preventDefault();
        if (!confirm('Delete this clinic?')) {
            return
        }

        let id = $(this).data('clinic-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/clinic`,
            data: { id: id },
            success: function(data) {
                node.closest("tr").remove();
                alertify.success('Delete succeed!');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err)
            }
        });
    });
}

function createNewClinic(markdownIntroClinic, converter) {
    $("#createNewClinic").on('click', function(e) {
        let formData = new FormData($('form#formCreateNewClinic')[0]);
        let contentMarkdown = markdownIntroClinic.value();
        let contentHTML = converter.makeHtml(contentMarkdown);

        //contain file upload
        if ($('#image-clinic').val()) {
            formData.append('introductionMarkdown', contentMarkdown);
            formData.append('introductionHTML', contentHTML);
            formData.append('image', document.getElementById('image-clinic').files[0]);
            handleCreateClinicNormal(formData);
        } else {
            // create without file upload
            let data = {
                introductionMarkdown: contentMarkdown,
                introductionHTML: contentHTML
            };
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1]
            }
            handleCreateClinicWithoutFile(data);
        }
    });
}

function handleCreateClinicWithoutFile(data) {
    $.ajax({
        method: "POST",
        url: `${window.location.origin}/admin/clinic/create-without-file`,
        data: data,
        success: function(data) {
            alert('A new clinic is created successfully');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error)
        }
    });
}

function handleCreateClinicNormal(formData) {
    $.ajax({
        method: "POST",
        url: `${window.location.origin}/admin/clinic/create`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('A new clinic is created successfully');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        }
    });
}

function updateClinic(markdownIntroClinic, converter) {
    $('#btnUpdateClinic').on('click', function(e) {
        let clinicId = $('#btnUpdateClinic').data('clinic-id');
        let formData = new FormData($('form#formUpdateClinic')[0]);
        let contentMarkdown = markdownIntroClinic.value();
        let contentHTML = converter.makeHtml(contentMarkdown);

        //contain file upload
        if ($('#image-clinic').val()) {
            formData.append('introductionMarkdown', contentMarkdown);
            formData.append('introductionHTML', contentHTML);
            formData.append('image', document.getElementById('image-clinic').files[0]);
            formData.append('id', clinicId);
            handleUpdateClinicNormal(formData);
        } else {
            // create without file upload
            let data = {
                id: clinicId,
                introductionMarkdown: contentMarkdown,
                introductionHTML: contentHTML
            };
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1]
            }
            handleUpdateClinicWithoutFile(data);
        }
    });
}

function handleUpdateClinicNormal(formData) {
    $.ajax({
        method: "PUT",
        url: `${window.location.origin}/admin/clinic/update`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Update succeeds');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        }
    });
}

function handleUpdateClinicWithoutFile(data) {
    $.ajax({
        method: "PUT",
        url: `${window.location.origin}/admin/clinic/update-without-file`,
        data: data,
        success: function(data) {
            alert('Update succeed');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        }
    });
}

function showModalInfoClinic() {
    $('.info-specific-clinic').on('click', function(e) {
        e.preventDefault();
        let id = $(this).data('clinic-id');

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-info-clinic-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageClinic').empty();
                $('#name').val(data.clinic.name);
                if (data.clinic.phone) {
                    $('#phone').val(data.clinic.phone);
                } else {
                    $('#phone').val('Has not been updated');
                }
                if (data.clinic.address) {
                    $('#address').val(data.clinic.address);
                } else {
                    $('#address').val('Has not been updated');
                }

                if (data.clinic.image) {
                    $('#imageClinic').prepend(`<img class="img-info-clinic" src="/images/clinics/${data.clinic.image}" />`)
                } else {
                    $('#imageClinic').text('Has not been updated')
                }

                $('#modalInfoClinic').modal('show');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            }
        });
    });
}

function showModalSettingUser() {
    $('.user-setting').on('click', function(e) {
        e.preventDefault();
        $('#modalSettingUser').modal('show');

    });
}

function createNewDoctor() {
    $('#createNewDoctor').on('click', function(e) {
        e.preventDefault();
        let formData = new FormData($('form#formCreateNewDoctor')[0]);
        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }
        $.ajax({
            method: "POST",
            url: `${window.location.origin}/admin/doctor/create`,
            data: data,
            success: function(data) {
                alert('Create a new doctor succeeds');
                window.location.href = `${window.location.origin}/users/manage/doctor`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            }
        });
    });
}

function deleteDoctorById() {
    $('.delete-doctor-info').on('click', function(e) {
        if (!confirm('Delete this doctor?')) {
            return
        }

        let id = $(this).data('doctor-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/doctor`,
            data: { id: id },
            success: function(data) {
                node.closest("tr").remove();
                alertify.success('Delete succeeds');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err)
            }
        });
    });
}

function showModalInfoDoctor() {
    $('.show-doctor-info').on('click', function(e) {
        e.preventDefault();
        let id = $(this).data('doctor-id');

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-info-doctor-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageDoctor').empty();

                $('#nameDoctor').val(data.doctor.name);
                if (data.doctor.phone) {
                    $('#phoneDoctor').val(data.doctor.phone);
                } else {
                    $('#phoneDoctor').val('Has not been updated');
                }
                if (data.doctor.address) {
                    $('#addressDoctor').val(data.doctor.address);
                } else {
                    $('#addressDoctor').val('Has not been updated');
                }
                $('#specializationDoctor').val(data.doctor.specializationName);
                $('#clinicDoctor').val(data.doctor.clinicName);
                if (data.doctor.avatar) {
                    $('#imageDoctor').prepend(`<img class="img-info-clinic" src="/images/users/${data.doctor.avatar}" />`)
                } else {
                    $('#imageDoctor').text('Has not been updated')
                }

                $('#modalInfoDoctor').modal('show');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            }
        });
    });

}

function updateDoctor() {
    $('#btnUpdateDoctor').on('click', function(e) {
        let doctorId = $('#btnUpdateDoctor').data('doctor-id');

        let formData = new FormData($('form#formUpdateDoctor')[0]);
        //contain file upload
        if ($('#image-clinic').val()) {
            formData.append('avatar', document.getElementById('image-clinic').files[0]);
            formData.append('id', doctorId);
            handleUpdateDoctorNormal(formData);
        } else {
            // create without file upload
            let data = {
                id: doctorId,
            };
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1]
            }
            handleUpdateDoctorWithoutFile(data);
        }
    });
}

function handleUpdateDoctorNormal(formData) {
    $.ajax({
        method: "PUT",
        url: `${window.location.origin}/admin/doctor/update`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Update succeeds');
            window.location.href = `${window.location.origin}/users/manage/doctor`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        }
    });
}

function handleUpdateDoctorWithoutFile(data) {
    $.ajax({
        method: "PUT",
        url: `${window.location.origin}/admin/doctor/update-without-file`,
        data: data,
        success: function(data) {
            alert('Update succeeds');
            window.location.href = `${window.location.origin}/users/manage/doctor`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        }
    });
}

function deleteSpecializationById() {
    $('.delete-specialization').on('click', function(e) {
        if (!confirm('Delete this specialist?')) {
            return
        }
        let id = $(this).data('specialization-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/specialization`,
            data: { id: id },
            success: function(data) {
                node.closest("tr").remove();
                alertify.success('Delete succeeds');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err)
            }
        });
    });
}

function showPostsForSupporter() {
    let currentPage = 1;
    let total = $('#paginationForPost').data('total');
    if (total === 1) {
        $(' .li-next').addClass('disabled');
    }
    $('.page-post-next').on('click', function(e) {
        e.preventDefault();
        currentPage++;
        $(' .li-pre').removeClass('disabled');

        if (currentPage === total) {
            $(' .li-next').addClass('disabled');
        }
        if (currentPage > total) return;
        generateTablePostPagination(currentPage);
    });

    $('.page-post-pre').on('click', function(e) {
        e.preventDefault();
        currentPage--;
        $(' .li-next').removeClass('disabled');
        if (currentPage === 1) {
            $(' .li-pre').addClass('disabled');
        }
        if (currentPage === 0) return;
        generateTablePostPagination(currentPage);
    });
}

function generateTablePostPagination(page) {
    $.ajax({
        url: `${window.location.origin}/supporter/pagination/posts?page=${page}`,
        method: 'GET',
        success: function(data) {
            $("#listPostsTable tbody").empty();
            let html = '';
            data.posts.rows.forEach((post) => {
                html += `
                 <tr>
                        <td> ${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.writerName}</td>
                        <td>${post.dateClient}</td>
                        <td class="">
                            <a class=" " href="/supporter/post/edit/${post.id}" title="Chỉnh sửa thông tin"><i class="fas fa-pen-square mx-3"></i></a>
                            <a class="delete-post" href="#" data-post-id="${post.id}" title="Xóa"><i class="fas fa-trash"></i></a>
                        </td>
                   </tr>
                `;
            });
            $("#listPostsTable tbody").append(html);
        },
        error: function(err) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(err)
        }
    });
}

function deletePostById() {
    $('.delete-post').on('click', function(e) {
        if (!confirm('Xóa bài viết này?')) {
            return
        }
        let id = $(this).data('post-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/post`,
            data: { id: id },
            success: function(data) {
                node.closest("tr").remove();
                alertify.success('Xóa thành công');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err)
            }
        });
    });
}

function updatePost(markdown, converter) {
    $('#btnUpdatePost').on('click', function(e) {
        let postId = $('#btnUpdatePost').data('post-id');
        let formData = new FormData($('form#formUpdatePost')[0]);
        let contentMarkdown = markdown.value();
        let contentHTML = converter.makeHtml(contentMarkdown);
        formData.append('contentMarkdown', contentMarkdown);
        formData.append('contentHTML', contentHTML);
        formData.append('title', $('#titlePost').val());

        let data = {
            id: postId
        };
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }
        $.ajax({
            method: "PUT",
            url: `${window.location.origin}/supporter/post/update`,
            data: data,
            success: function(data) {
                alert('Cập nhật thành công');
                window.location.href = `${window.location.origin}/supporter/manage/posts`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error)
            }
        });

    });
}

function createScheduleByDoctor(scheduleArr) {
    $("#createNewScheduleDoctor").on("click", function() {
        if (scheduleArr.length === 0) {
            alertify.error('Chưa chọn kế hoạch để lưu');
            return
        }

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/doctor/manage/schedule/create`,
            data: { 'schedule_arr': scheduleArr },
            success: function(data) {
                if (data.status === 1) {
                    alertify.success('Thêm cuộc hẹn thành công');
                }
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error)
            }

        });
    });
}

function handleBtnSchedule() {
    let scheduleArr = [];
    $('.btn-schedule').unbind('click').bind('click', function(e) {
        let idBtn = $(this).attr('id');
        $(`#${idBtn}`).toggleClass('btn btn-css');

        let time = $(`#${idBtn}`).attr("value");
        let date = $("#datepicker").val();

        //check có class thì add new row, else try to remove
        if ($(`#${idBtn}`).hasClass("btn-css")) {

            let item = {
                'date': date,
                'time': time,
                'id': `${idBtn}-${date}`
            };
            scheduleArr.push(item);
            $('#tableCreateSchedule tbody').append(
                ` <tr id="row-${idBtn}">
                         <td>${time}</td>
                         <td>${date}</td>
                  </tr>`);
        } else {
            let count = -1;
            let timeCheck = $(`#${idBtn}`).attr("value");
            let dateCheck = $("#datepicker").val();
            scheduleArr.forEach((x, index) => {
                if (x.time === timeCheck && x.date === dateCheck) {
                    count = index;
                }
            });
            if (count > -1) scheduleArr.splice(count, 1);

            $(`table#tableCreateSchedule tr#row-${idBtn}`).remove();
        }

        scheduleArr.sort(function(a, b) {
            return a.time.localeCompare(b.time)
        });
    });

    return scheduleArr;
}

function handleChangeDatePicker(currentDate) {
    $('#datepicker').datepicker().on('changeDate', function(event) {
        let date = $("#datepicker").val();
        let dateConvert = stringToDate(date, "dd/MM/yyyy", "/");
        let currentDateConvert = stringToDate(currentDate, "dd/MM/yyyy", "/");
        if (dateConvert >= currentDateConvert) {
            //continue, refresh button
            $('.btn-schedule').removeClass('btn-css').addClass('btn');
        } else {
            $('#datepicker').datepicker("setDate", new Date());
            alertify.error('Không thể tạo một kế hoạch y tế trong quá khứ');
        }
    });
}

function stringToDate(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);

}

function loadNewPatientsForSupporter() {
    $.ajax({
        url: `${window.location.origin}/supporter/get-patients-for-tabs`,
        method: 'POST',
        success: function(data) {
            let countNew = data.object.newPatients.length;
            let countPending = data.object.pendingPatients.length;
            let countConfirmed = data.object.confirmedPatients.length;
            let countCanceled = data.object.canceledPatients.length;

            $('#count-new').text(`${countNew}`);
            $('#count-need').text(`${countPending}`);
            $('#count-confirmed').text(`${countConfirmed}`);
            $('#count-canceled').text(`${countCanceled}`);

            let htmlNew, htmlPending, htmlConfirmed, htmlCanceled = '';
            data.object.newPatients.forEach((patient) => {
                htmlNew += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td>${convertStringToDateClient(patient.updatedAt)}      </td>
                    <td> 
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok"> Tiếp nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel"> Hủy bỏ </button>
                    </td>
                </tr>
                `;
            });

            data.object.pendingPatients.forEach((patient) => {
                htmlPending += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)}      </td>
                    <td> 
                    <button  data-patient-id="${patient.id}"  class="ml-3 btn btn-warning btn-pending-patient">Xác nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy bỏ </button>
                    </td>
                </tr>
                `;
            });

            data.object.confirmedPatients.forEach((patient) => {
                htmlConfirmed += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)}     </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
                    </td>
                </tr>
                `;
            });

            data.object.canceledPatients.forEach((patient) => {
                htmlCanceled += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)} </td>
                    <td> 
                    <button   data-patient-id="${patient.id}"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
                    </td>
                </tr>
                `;
            });

            $('#tableNewPatients tbody').append(htmlNew);
            $('#tableNeedConfirmPatients tbody').append(htmlPending);
            $('#tableConfirmedPatients tbody').append(htmlConfirmed);
            $('#tableCancelPatients tbody').append(htmlCanceled);
        },
        error: function(error) {
            console.log(error);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
    })
}

function handleBtnNewPatientOk() {
    $("#tableNewPatients").on("click", ".btn-new-patient-ok", function(e) {
        if (!confirm('Bạn muốn xác nhận nhập viện cho bệnh nhân này?')) {
            return
        }
        let countNew = +$('#count-new').text();
        let countPending = +$('#count-need').text();
        let patientId = $(this).data('patient-id');
        this.closest("tr").remove();
        countNew--;
        countPending++;
        $('#count-new').text(countNew);
        $('#count-need').text(countPending);

        $.ajax({
            url: `${window.location.origin}/supporter/change-status-patient`,
            method: 'POST',
            data: { patientId: patientId, status: 'pending' },
            success: function(data) {
                let patient = data.patient;
                addNewRowTablePending(patient);
            },
            error: function(error) {
                console.log(error);
                alertify.error('bạn muốn xác nhận nhập viện của bệnh nhân này?');
            }
        });
    });
}

function handleBtnNewPatientCancel() {
    $("#tableNewPatients").on("click", ".btn-new-patient-cancel", function(e) {
        $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
        $('#btnCancelBookingPatient').attr('data-type', 'new-patient-cancel');
        $('#modalCancelBooking').modal('show');
    });
}

function callAjaxRenderModalInfo(patientId, option) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/api/get-detail-patient-by-id`,
        data: { patientId: patientId },
        success: function(data) {
            $('#patientName').val(data.name);
            $('#btn-confirm-patient-done').attr('data-patient-id', data.id);
            $('#patientPhone').val(data.phone);
            $('#patientEmail').val(data.email);
            $('#patientDate').val(data.dateBooking);
            $('#patientTime').val(data.timeBooking);
            $('#patientReason').text(data.description);
            $('#patientAddress').text(data.address);
            if (data.ExtraInfo) {
                $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
                $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
            }
            if (option) {
                $('#btn-confirm-patient-done').css('display', 'none');
                $('#btn-cancel-patient').text("OK");
            }
            $('#modalDetailPatient').modal('show');
        },
        error: function(err) {
            console.log(error);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
    });
}

function handleBtnPendingPatient() {
    $("#tableNeedConfirmPatients").on("click", ".btn-pending-patient", function(e) {
        let patientId = $(this).data('patient-id');
        let option = false;
        callAjaxRenderModalInfo(patientId, option);
    });
}

function handleBtnPendingCancel() {
    $("#tableNeedConfirmPatients").on("click", ".btn-pending-patient-cancel", function(e) {
        $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
        $('#btnCancelBookingPatient').attr('data-type', 'pending-patient-cancel');
        $('#modalCancelBooking').modal('show');
    });
}

function addNewRowTablePending(patient) {
    let htmlPending = `
                 <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)}     </td>
                    <td> 
                    <button  data-patient-id="${patient.id}"  class="ml-3 btn btn-warning btn-pending-patient">Xác nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy bỏ </button>
                    </td>
                </tr>
               
                `;
    $('#tableNeedConfirmPatients tbody').prepend(htmlPending);
}

function addNewRowTableConfirmed(patient) {
    let htmlConfirmed = `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)}     </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
                    </td>
                </tr>
                `;
    $('#tableConfirmedPatients tbody').prepend(htmlConfirmed);

}

function addNewRowTableCanceled(patient) {
    let htmlPending = `
                  <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)} </td>
                    <td> 
                    <button   data-patient-id="${patient.id}"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
                    </td>
                </tr>
               
                `;
    $('#tableCancelPatients tbody').prepend(htmlPending);
}

function convertStringToDateClient(string) {
    return moment(Date.parse(string)).format("DD/MM/YYYY, HH:mm A");
}

function handleAfterCallingPatient() {
    $('#btn-confirm-patient-done').on('click', function(e) {
        if (!confirm('Bạn đã gọi điện để xác nhận xem bệnh nhân có đặt lịch hẹn hay chưa?')) {
            return;
        }
        let countPending = +$('#count-need').text();
        let countConfirmed = +$('#count-confirmed').text();
        countPending--;
        countConfirmed++;
        $('#modalDetailPatient').modal('hide');
        let patientId = $('#btn-confirm-patient-done').attr('data-patient-id');
        $('#tableNeedConfirmPatients tbody').find(`.btn-pending-patient[data-patient-id=${patientId}]`).closest("tr").remove();
        $('#count-need').text(countPending);
        $('#count-confirmed').text(countConfirmed);

        $.ajax({
            url: `${window.location.origin}/supporter/change-status-patient`,
            method: 'POST',
            data: { patientId: patientId, status: 'confirmed' },
            success: function(data) {
                console.log(data)
                let patient = data.patient;
                addNewRowTableConfirmed(patient);
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            }
        });
    });
}

function handleViewInfoPatientBooked() {
    $("#tableConfirmedPatients").on("click", ".btn-confirmed-patient", function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option);
    });
}

function handleCancelBtn() {
    $('#btnCancelBookingPatient').on('click', function(e) {
        let formData = new FormData($('form#formCancelBooking')[0]);
        let data = {};
        let text = '';
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }

        if (data.reasonCancel === 'reason3') {
            if (!$('#otherReason').val()) {
                alert('Vui lòng điền thêm thông tin vào trường lý do khác');
                return;
            }
            text = `Lý do khác: ${$('#otherReason').val()} `;
        } else if (data.reasonCancel === 'reason2') {
            text = 'Bệnh nhân đã hủy lịch khám';
        } else {
            text = 'Spam cuộc hẹn khám bệnh, không có thật'
        }

        let patientId = $('#btnCancelBookingPatient').attr('data-patient-id');

        let type = $('#btnCancelBookingPatient').attr('data-type');

        if (type === 'pending-patient-cancel') {
            let countPending = +$('#count-need').text();
            let countCancel = +$('#count-canceled').text();
            countPending--;
            countCancel++;
            $('#tableNeedConfirmPatients tbody').find(`.btn-pending-patient-cancel[data-patient-id=${patientId}]`).closest("tr").remove();
            $('#count-need').text(countPending);
            $('#count-canceled').text(countCancel);
        } else {
            let countNew = +$('#count-new').text();
            let countCancel = +$('#count-canceled').text();
            countNew--;
            countCancel++;
            $('#tableNewPatients tbody').find(`.btn-new-patient-cancel[data-patient-id=${patientId}]`).closest("tr").remove();
            $('#count-new').text(countNew);
            $('#count-canceled').text(countCancel);
        }

        $('#modalCancelBooking').modal('hide');

        $.ajax({
            url: `${window.location.origin}/supporter/change-status-patient`,
            method: 'POST',
            data: { patientId: patientId, status: 'failed', reason: text },
            success: function(data) {
                let patient = data.patient;
                addNewRowTableCanceled(patient);
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            }
        });

    });
}

function handleBtnViewHistory() {
    $('#tableCancelPatients').on('click', '.btn-history-cancel-patient', function() {
        let patientId = $(this).data('patient-id');
        $('#btn-view-history').attr('data-patient-id', patientId);
        $.ajax({
            url: `${window.location.origin}/supporter/get-logs-patient`,
            method: 'POST',
            data: { patientId: patientId },
            success: function(data) {
                $("#contentHistory").empty();

                let html = '';
                data.forEach((log) => {
                    html += `
                     <div class="form-row mb-3">
                            <div class="col-6">
                                <input type="text"  class="form-control" id="historyStatus" value="${log.content}">
                            </div>
                            <div class="col-3">
                                <input type="text"  class="form-control" id="personDone" value="${log.supporterName}">
                            </div>
                            <div class="col-3">
                                <input type="text"  class="form-control" id="timeDone" value="${convertStringToDateClient(log.createdAt)} ">
                            </div>
                        </div>
                    
                    `;
                });
                $('#contentHistory').append(html);
                $('#modalHistoryBooking').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            }
        });
    })
}

function handleDoctorViewInfoPatient() {
    $('.doctor-view-detail').on('click', function(e) {
        let patientId = $(this).attr('data-patient-id');
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-detail-patient-by-id`,
            data: { patientId: patientId },
            success: function(data) {
                $('#imageOldForms').empty();
                $('#patientName').val(data.name);
                $('#patientPhone').val(data.phone);
                $('#patientEmail').val(data.email);
                $('#patientDate').val(data.dateBooking);
                $('#patientTime').val(data.timeBooking);
                $('#patientReason').text(data.description);
                $('#patientAddress').text(data.address);
                if (data.ExtraInfo) {
                    $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
                    $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
                    if (data.ExtraInfo.oldForms) {
                        let images = JSON.parse(data.ExtraInfo.oldForms);
                        let html = '';
                        for (let [ key, value ] of Object.entries(images)) {
                            html += `
                              <a href="/images/patients/${value}" class="mr-3" target="_blank" title="Nhấn để hiển thị hình ảnh">
                                <span>${value}</span>
                              </a>
                            `;
                        }

                        $('#imageOldForms').append(html)
                    } else {
                        $('#imageOldForms').append(`<span>No information</span>`)
                    }
                }

                $('#modalDetailPatientForDoctor').modal('show');
            },
            error: function(err) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            }
        });
    });
}

function showModalSendForms() {
    $('.doctor-send-forms').on('click', function(e) {
        let patientId = $(this).attr('data-patient-id');
        let isSend = $(this).attr('data-is-send-forms');

        $.ajax({
            url: `${window.location.origin}/api/get-detail-patient-by-id`,
            method: "POST",
            data: { patientId: patientId },
            success: function(data) {
                let html = '';
                $('#divGenerateFilesSend').empty();
                $('#emailPatient').val(data.email);
                $('#agePatient').val(new Date().getFullYear() - data.year);
                $('#address').val(data.address)
                $('#gender').val(data.gender === 'male' ? 'Nam' : 'Nữ')
                $('#btnSendFilesForms').attr('data-patient-id', patientId);
                if (data.ExtraInfo) {
                    if (data.ExtraInfo.sendForms) {
                        let images = JSON.parse(data.ExtraInfo.sendForms);
                        for (let [ key, value ] of Object.entries(images)) {
                            html += `
                              <div class="form-row">
                                <div class="form-group col-9">
                                    <a type="text" class="form-control" id="nameFileSent" target="_blank" href="/images/patients/remedy/${value}" readonly="true" title="${value}" >
                               ${value}
                                </a>
                                </div>
                             </div>`;
                        }
                    } else {
                        html = `
                          <div class="form-row">
                            <div class="form-group col-9">
                                <label class="col-form-label text-label" for="nameFileSent"> Tên file:</label>
                                <input type="text" class="form-control" id="nameFileSent" name="nameFileSent" disabled>
                            </div>
                         </div>`
                    }
                }
                $('#divGenerateFilesSend').append(html);
                $('#modalSendForms').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            }
        });
    });
}

function handleSendFormsForPatient() {
    $('#btnSendFilesForms').on("click", function(e) {
        if (!$('#filesSend').val()) {
            alert("Please select files before sending!");
            return;
        }
        $(this).prop('disabled', true);
        $('#processLoadingAdmin').removeClass('d-none');
        let formData = new FormData($('form#formSendFormsForPatient')[0]);
        formData.append('patientId', $(this).attr('data-patient-id'));

        $.ajax({
            method: "POST",
            url: `${window.location.origin}/doctor/send-forms-to-patient`,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                $('#modalSendForms').modal('hide');
                $('#processLoadingAdmin').addClass('d-none');
                $('#btnSendFilesForms').prop('disabled', false);
                $(`.fa-exclamation-circle[data-patient-id=${data.patient.id}]`).css('color', '#36b9cc');
                $(`.fa-exclamation-circle[data-patient-id=${data.patient.id}]`).removeClass('fa-exclamation-circle').addClass('fa-check-circle')
                alertify.success('Gửi phác đồ điều trị và hóa đơn thành công');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            }
        });
    });
}

function resetModal() {
    $(`#modalDetailPatient`).on('hidden.bs.modal', function(e) {
        $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
    });

    $(`#modalHistoryBooking`).on('hidden.bs.modal', function(e) {
        $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
    });

    $(`#modalDetailPatientForDoctor`).on('hidden.bs.modal', function(e) {
        $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
    });

    $(`#modalSendForms`).on('hidden.bs.modal', function(e) {
        $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
    });
    $(`#modalCancelBooking`).on('hidden.bs.modal', function(e) {
        $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
        $('#inputDefaultReason').prop('checked', true);
    });
}

function doneComment() {
    $(".done-comment").on('click', function(e) {
        if (confirm("Xác nhận lưu phản hồi của khách hàng?")) {
            let commentId = $(this).attr('data-comment-id');
            node = this;
            $.ajax({
                method: 'POST',
                url: `${window.location.origin}/supporter/done-comment`,
                data: { commentId: commentId },
                success: function(data) {
                    node.closest("tr").remove();
                    console.log(data);
                    alertify.success('Lưu phản hồi của khách hàng thành công');
                },
                error: function(error) {
                    alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                    console.log(error);
                }
            })
        }

    })
}

function statisticalAdmin(month) {
    $.ajax({
        method: "POST",
        url: `${window.location.origin}/admin/statistical`,
        data: { month: month },
        success: function(data) {
            $('#sumPatient').text(data.patients.count);
            $('#sumDoctor').text(data.doctors.count);
            $('#sumPost').text(data.posts.count);

            if (data.bestDoctor === '') {
                $('#bestDoctor').text(`Không có thông tin`);
            } else {
                $('#bestDoctor').text(`${data.bestDoctor.name} (${data.bestDoctor.count})`);
            }
            if (data.bestSupporter === '') {
                $('#bestSupporter').text(`Không có thông tin`);
            } else {
                $('#bestSupporter').text(`${data.bestSupporter.name} (${data.bestSupporter.count})`);
            }
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi khi lấy thông tin thống kê, vui lòng thử lại sau');
            console.log(error);
        }
    })
}

function handleFindStatisticalAdmin(){
    $('#findStatisticalAdmin').on('click', function() {
        statisticalAdmin($('#monthAnalyse').val())
    })
}

const createNewSupporter = () => {
    $('#createNewSupporter').on('click', function(e) {
        e.preventDefault();
        let formData = new FormData($('form#formCreateNewSupporter')[0]);
        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }
        $.ajax({
            method: "POST",
            url: `${window.location.origin}/admin/supporter/create`,
            data: data,
            success: function(data) {
                alert('Create a new supporter succeeds');
                window.location.href = `${window.location.origin}/users/manage/supporter`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            }
        });
    });
}

const deleteSupporterById = () => {
    $('.delete-supporter-info').on('click', function(e) {
        if (!confirm('Delete this supporter?')) {
            return
        }

        const id = $(this).data('supporter-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/supporter`,
            data: { id: id },
            success: function(data) {
                node.closest("tr").remove();
                alertify.success('Delete succeeds');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err)
            }
        });
    });
}

const showModalPrintForms = () => {
    $('.print-prescription').on('click', function(e) {
        let patientId = $(this).attr('data-patient-id');
        let isSend = $(this).attr('data-is-send-forms');

        window.open(`${window.location.origin}/doctor/manage/appointment/print/${patientId}`, '_blank').focus();

        // $.ajax({
        //     url: `${window.location.origin}/api/get-detail-patient-by-id`,
        //     method: "POST",
        //     data: { patientId: patientId },
        //     success: function(data) {
        //         let html = '';
        //         $('#divGenerateFilesSend').empty();
        //         $('#emailPatient').val(data.email);
        //         $('#agePatient').val(new Date().getFullYear() - data.year);
        //         $('#address').val(data.address)
        //         $('#gender').val(data.gender === 'male' ? 'Nam' : 'Nữ')
        //         $('#btnSendFilesForms').attr('data-patient-id', patientId);
        //         if (data.ExtraInfo) {
        //             if (data.ExtraInfo.sendForms) {
        //                 let images = JSON.parse(data.ExtraInfo.sendForms);
        //                 for (let [ key, value ] of Object.entries(images)) {
        //                     html += `
        //                       <div class="form-row">
        //                         <div class="form-group col-9">
        //                             <a type="text" class="form-control" id="nameFileSent" target="_blank" href="/images/patients/remedy/${value}" readonly="true" title="${value}" >
        //                        ${value}
        //                         </a>
        //                         </div>
        //                      </div>`;
        //                 }
        //             } else {
        //                 html = `
        //                   <div class="form-row">
        //                     <div class="form-group col-9">
        //                         <label class="col-form-label text-label" for="nameFileSent"> Tên file:</label>
        //                         <input type="text" class="form-control" id="nameFileSent" name="nameFileSent" disabled>
        //                     </div>
        //                  </div>`
        //             }
        //         }
        //         $('#divGenerateFilesSend').append(html);
        //         $('#modalSendForms').modal('show');

        //         const doc = new jsPDF();       
            
        //         const elementHandler = {
        //             '#ignorePDF': function (element, renderer) {
        //                 return true;
        //             }
        //         };
        //         // const source = window.document.getElementsByName('test-ne')[0]
        //         // const source = window.document.getElementById('accordionSidebar')
        //         // console.log(source)
        //         // doc.html(
        //         //     source,
        //         //     {
        //         //         // callback: (doc) => setTimeout(() => doc.save(), 2000),
        //         //         filename: `${patientId}.pdf`,
        //         //         width: 800
        //         //     }
        //         // )

        //         // doc.output('dataurlnewwindow');
        //         setTimeout(() => {
        //             const htmlElement = document.getElementsByName("test-ne")[0]
        //             html2canvas(htmlElement, {
        //                 allowTaint: true,
        //                 useCORS: true,
        //               })
        //             .then(function (canvas) {
        //                 // It will return a canvas element
        //                 let image = canvas.toDataURL("image/png", 0.5);
        //                 console.log(image)
        //                 doc.addImage(image, 'JPEG', 0, 0, 800, 670);
        //                 doc.output('dataurlnewwindow');
        //             });
                
        //         }, 2000);
                
                
        //     },
        //     error: function(error) {
        //         console.log(error);
        //         alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        //     }
        // });
    });
}

$(document).ready(function(e) {
    // $('.modal').on('hidden.bs.modal', function(e) {
    //     $(this).removeData();
    // });
    window.jsPDF = window.jspdf.jsPDF
    window.html2canvas = html2canvas;


    let markdownIntroClinic = new SimpleMDE({
        element: document.getElementById("intro-clinic"),
        placeholder: 'Nội dung giới thiệu ...',
        spellChecker: false
    });
    let markdownPost = new SimpleMDE({
        element: document.getElementById("contentMarkdown"),
        placeholder: 'Nội dung bài viết...',
        spellChecker: false
    });
    let converter = new showdown.Converter();
    //create datepicker, doctor create schedule
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
    });
    $('#datepicker').datepicker("setDate", new Date());

    //create datepicker, doctor-appointment
    $('#dateDoctorAppointment').datepicker({
        format: 'dd/mm/yyyy',
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
    });

    loadFile(e);
    loadImageUserSetting(e);
    createNewClinic(markdownIntroClinic, converter);
    deleteClinicById();
    updateClinic(markdownIntroClinic, converter);
    showModalInfoClinic();
    showModalSettingUser();
    createNewDoctor();
    deleteDoctorById();
    showModalInfoDoctor();
    updateDoctor();
    deleteSpecializationById();
    showPostsForSupporter();
    deletePostById();
    createNewPost(markdownPost, converter);
    updatePost(markdownPost, converter);

    let arr = handleBtnSchedule();
    createScheduleByDoctor(arr);
    let currentDate = $("#datepicker").val();
    handleChangeDatePicker(currentDate);
    loadNewPatientsForSupporter();
    handleBtnNewPatientOk();
    handleBtnNewPatientCancel();
    handleBtnPendingPatient();
    handleBtnPendingCancel();
    resetModal();
    handleAfterCallingPatient();
    handleViewInfoPatientBooked();
    handleCancelBtn();
    handleBtnViewHistory();

    handleDoctorViewInfoPatient();
    showModalSendForms();
    handleSendFormsForPatient();
    doneComment();

    let month = new Date().getMonth();
    statisticalAdmin(month+1);
    handleFindStatisticalAdmin();
    createNewSupporter();
    deleteSupporterById();
    showModalPrintForms();
});

