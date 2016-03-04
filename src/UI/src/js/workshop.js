var jquery = require('jquery');

var workshop = {
    show_form : function (doc) {
        var workshop_form = doc.createElement('div');
        workshop_form.classList.add('workshop');

        var name_input = doc.createElement('input');
        name_input.setAttribute('id', 'name_input');
        name_input.setAttribute('type', 'text');
        name_input.setAttribute('name', 'first_name');
        name_input.setAttribute('title', 'first_name_want_to_learn');

        workshop_form.appendChild(name_input);

        return workshop_form;
    },

    addWorkshop : function () {
        return function (data) {
            console.log("sample of data: ", data);

            var newSpan = function (className, content) {
                var element = document.createElement('span');
                element.setAttribute('class', className);
                element.textContent = content;
                return element;
            }

            var workshop = document.createElement('div');
            workshop.classList.add('workshop');

            workshop.appendChild(newSpan('name_display', data.name));
            workshop.appendChild(newSpan('workshop_title', data.workshop_title));
            workshop.appendChild(document.createElement('br'));
            workshop.appendChild(newSpan('workshop_details', data.workshop_details));

            jquery('#workshops').append(workshop);
        };
    },

    newWorkshop : function (doc) {
        var name = jquery('#name_input').val();
        var new_workshop_title = jquery('#new_workshop_title').val();
        var new_workshop_details = jquery('#new_workshop_details').val();

        var payload = {
            name : name,
            workshop_title: new_workshop_title,
            workshop_details: new_workshop_details
        };

        var createWorkshopPromise = this.addWorkshop();

        jquery.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/workshop',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(createWorkshopPromise);

    }
}
module.exports = workshop;