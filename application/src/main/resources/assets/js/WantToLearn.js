$(document).ready(function () {
    $('#name_submit').click(function () {
        var bar = $('#name_input').val();

        var payload = {
            name : bar
        };

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/hello',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(function (data) {
            console.log("sample of data: ", data);
            $('#name_display').text(data.name);
        });
    });
});