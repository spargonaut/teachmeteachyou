$(document).ready(function () {
    $('#name_submit').click(function () {
        var name = $('#name_input').val();
        var new_workshop_title = $('#new_workshop_title').val();
        var new_workshop_details = $('#new_workshop_details').val();

        var payload = {
            name : name,
            workshop_title: new_workshop_title,
            workshop_details: new_workshop_details
        };

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/workshop',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(function (data) {
            console.log("sample of data: ", data);
            $('#name_display').text(data.name);
            $('#workshop_title').text(data.workshop_title);
            $('#workshop_details').text(data.workshop_details);
        });
    });
});