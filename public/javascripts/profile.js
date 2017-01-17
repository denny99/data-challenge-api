/**
 * Created by jens on 11.01.2017.
 */
$('#saveButton').click(function () {
    $.ajax({
        url: "/api/v1/users",
        method: 'put',
        data: {
            userId: $('#userIdInput').value,
            share: $('#shareCb').value
        },
        success: function( result ) {
            window.location = '/profile';
        }
    });
});