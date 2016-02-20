var jquery = require('jquery');

var workshop = {
    newWorkshop : function (doc) {
        var name = jquery('#name_input').val();
        var new_workshop_title = jquery('#new_workshop_title').val();
        var new_workshop_details = jquery('#new_workshop_details').val();

        var payload = {
            name : name,
            workshop_title: new_workshop_title,
            workshop_details: new_workshop_details
        };

        jquery.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/workshop',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(function (data) {
            console.log("sample of data: ", data);

            var workshop = document.createElement('div');
            workshop.classList.add('workshop');

            var name = document.createElement('span');
            name.setAttribute('class', 'name_display');
            name.textContent = data.name;
            workshop.appendChild(name);

            var title = document.createElement('span');
            title.setAttribute('class', 'workshop_title');
            title.textContent = data.workshop_title;
            workshop.appendChild(title);

            var lineBreak = document.createElement('br');
            workshop.appendChild(lineBreak);

            var details = document.createElement('span');
            details.setAttribute('class', 'workshop_details');
            details.textContent = data.workshop_details;
            workshop.appendChild(details);


            jquery('#workshops').append(workshop);
        });
    }
}
module.exports = workshop;