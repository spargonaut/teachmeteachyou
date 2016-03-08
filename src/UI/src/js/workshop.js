var jquery = require('jquery');

var workshop = {
    show_form : function (doc) {
        var new_input_element = function (name) {
            var input_element = doc.createElement('input');
            input_element.setAttribute('id', name);
            input_element.setAttribute('type', 'text');
            input_element.setAttribute('name', name);
            input_element.setAttribute('title', name);
            return input_element;
        };

        var new_label = function (name, labelContent) {
            var label = doc.createElement('label');
            label.setAttribute('for', name);
            label.textContent = labelContent + ":";
            return label;
        };

        var submit_button = doc.createElement('button');
        submit_button.setAttribute('id', 'workshop_submit');
        submit_button.setAttribute('type', 'button');
        submit_button.setAttribute('onClick', 'createWorkshop()');
        submit_button.textContent = 'Create Workshop';

        var workshop_form = doc.createElement('div');
        workshop_form.classList.add('workshop');
        workshop_form.appendChild(new_label('name_input', 'name'));
        workshop_form.appendChild(new_input_element('name_input'));
        workshop_form.appendChild(new_label('new_workshop_title', 'I want to learn'));
        workshop_form.appendChild(new_input_element('new_workshop_title'));
        workshop_form.appendChild(doc.createElement('br'));
        workshop_form.appendChild(new_label('new_workshop_details', 'more details'));
        workshop_form.appendChild(new_input_element('new_workshop_details'));
        workshop_form.appendChild(doc.createElement('br'));
        workshop_form.appendChild(submit_button);

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
            workshop.appendChild(newSpan('workshop_title', data.title));
            workshop.appendChild(document.createElement('br'));
            workshop.appendChild(newSpan('workshop_details', data.details));

            jquery('#workshops').append(workshop);
        };
    },

    newWorkshop : function (doc) {
        var name = jquery('#name_input').val();
        var new_workshop_title = jquery('#new_workshop_title').val();
        var new_workshop_details = jquery('#new_workshop_details').val();

        var payload = {
            name : name,
            title: new_workshop_title,
            details: new_workshop_details
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