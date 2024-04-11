//store comment
$('#form_store_comment').on('submit', function (e) {
    e.preventDefault();
    let storeCommentUrl = $(this).attr('action');
    let methodForm = $(this).attr('method');
    $.ajax({
        url: storeCommentUrl,
        method: methodForm,
        data: new FormData(this),
        processData: false,
        dataType: 'json',
        contentType: false,
        success: function (response) {
            if (response.code === 400) {
                toastr.warning(response.message);
            } else if (response.code === 200) {
                location.reload();
            }
        },
    })
})
