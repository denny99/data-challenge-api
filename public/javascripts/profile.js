/**
 * Created by jens on 11.01.2017.
 */
$('#saveButton').click(function () {
    $.ajax({
        url: "/api/v1/users/" + $('#userIdInput').val(),
        method: 'put',
        data: {
            userId: $('#userIdInput').val(),
            share: $('#shareCb').val(),
        },
        success: function( result ) {
            window.location = '/profile';
        }
    });
});