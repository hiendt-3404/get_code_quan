import swal from 'sweetalert2';
window.Swal = swal;

$(document).on('click', '#deleteElement', function () {
    let deletePostURL = $(this).data('url');
    let name = $(this).data('name');
    let thisElement = $(this);

    $.i18n({
        locale: document.documentElement.lang,
    }).load({
        'en': '/i18n/en.json',
        'vi': '/i18n/vi.json',
    }).done(function () {
        Swal.fire({
            title: $.i18n('title_remove'),
            text: $.i18n('text_remove') + ` "${name}"`,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#556ee6',
            cancelButtonColor: '#d33',
            cancelButtonText: $.i18n('cancel'),
            confirmButtonText: $.i18n('delete'),
            allowOutsideClick: false
        }).then(function (result) {
            if (result.isConfirmed) {
                $.ajax({
                    url: deletePostURL,
                    type: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if (response.code == 200) {
                            thisElement.closest('tr').remove();
                            toastr.success(response.message);
                        }
                        if (response.code == 400) {
                            toastr.error(response.message);
                        }
                    },
                });
            }
        })
    })
});
