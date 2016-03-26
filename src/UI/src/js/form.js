var jquery = require('jquery');
var workshop = require('./workshop');

var form = function () {
    return {
            show_button : function (doc) {

            var submit_button = doc.createElement('button');
            submit_button.setAttribute('id', 'workshop_form_button');
            submit_button.setAttribute('type', 'button');
            submit_button.setAttribute('onClick', 'show_workshop_form()');
            submit_button.textContent = 'Create Workshop';

            return submit_button;
        },

        hide_form : function (doc) {
            var show_form_button = this.show_button(doc);

            var workshops = doc.getElementById('workshops');
            workshops.parentNode.insertBefore(show_form_button, workshops);
            var workshop_form = doc.getElementById('workshop_form');
            workshops.parentNode.removeChild(workshop_form);
        },

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
            submit_button.textContent = 'Create';

            var hide_form_button = doc.createElement('button');
            hide_form_button.setAttribute('id', 'hide_form_button');
            hide_form_button.setAttribute('type', 'button');
            hide_form_button.setAttribute('onClick', 'hide_workshop_form()');
            hide_form_button.textContent = 'Cancel';


            var workshop_form = doc.createElement('div');
            workshop_form.setAttribute('id', 'workshop_form');
            workshop_form.appendChild(new_label('name_input', 'name'));
            workshop_form.appendChild(new_input_element('name_input'));
            workshop_form.appendChild(new_label('new_workshop_title', 'I want to learn'));
            workshop_form.appendChild(new_input_element('new_workshop_title'));
            workshop_form.appendChild(doc.createElement('br'));
            workshop_form.appendChild(new_label('new_workshop_details', 'more details'));
            workshop_form.appendChild(new_input_element('new_workshop_details'));
            workshop_form.appendChild(doc.createElement('br'));
            workshop_form.appendChild(submit_button);
            workshop_form.appendChild(hide_form_button);
            console.log('using new content')

            var workshops = doc.getElementById('workshops');
            workshops.parentNode.insertBefore(workshop_form, workshops);
            var workshop_form_button = doc.getElementById('workshop_form_button');
            workshops.parentNode.removeChild(workshop_form_button);
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
                url: 'http://localhost:8080/api/workshops',
                data: JSON.stringify(payload),
                dataType: 'json',
                contentType: "application/json"
            }).done(createWorkshopPromise);

        }
    };
}

module.exports = form;