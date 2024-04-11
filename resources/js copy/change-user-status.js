$('#userStatusActive, #userStatusBlock').on('click', function (e) {
    let changeStatusURL = $(this).attr('changeStatusURL');
    console.log(changeStatusURL);
    $.ajax({
        url: changeStatusURL,
        type: "post",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response.code === 200) {
                toastr.success(response.message),
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
            };

            if (response.code === 400) {
                toastr.warning(response.message);
            };
        }
    })
})
