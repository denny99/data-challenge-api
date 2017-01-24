/**
 * Created by jens on 11.01.2017.
 */

$('#loginButton').click(function () {
    $.ajax({
        url: "/api/v1/users/authenticate/basic",
        data: {
            username: $('#inputUsername').value,
            password: $('#inputPassword').value
        },
        success: function( result ) {
            window.location = '/profile';
        }
    });
});