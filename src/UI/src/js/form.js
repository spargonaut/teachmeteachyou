var jquery = require('jquery');
var workshop = require('./workshop');

var form = {
    show : function (doc) {
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

    create : function (doc) {
        var name = jquery('#name_input').val();
        var new_workshop_title = jquery('#new_workshop_title').val();
        var new_workshop_details = jquery('#new_workshop_details').val();

        var payload = {
            name : name,
            title: new_workshop_title,
            details: new_workshop_details
        };

        var createWorkshopPromise = function () {
            return workshop.getAllWorkshops();
        };

        jquery.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/workshops',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(createWorkshopPromise);

    }
}

module.exports = form;