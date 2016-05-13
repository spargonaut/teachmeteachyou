var jquery = require('jquery');
var workshop = require('./workshop');

var form = function () {
    return {
        show_button : function (doc) {

            var submit_button = doc.createElement('button');
            submit_button.setAttribute('id', 'workshop_form_button');
            submit_button.setAttribute('type', 'button');
            submit_button.addEventListener('click', show_workshop_form);
            submit_button.textContent = 'Create Workshop';

            return submit_button;
        },

        hide_form : function () {
            var action_div = document.getElementsByClassName('action')[0];
            action_div.innerHTML = "";
            action_div.appendChild(this.show_button(document));
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
                label.textContent = labelContent;
                return label;
            };

            var submit_button = doc.createElement('button');
            submit_button.setAttribute('id', 'workshop_submit');
            submit_button.setAttribute('type', 'button');
            submit_button.addEventListener('click', create_workshop);
            submit_button.textContent = 'Create';

            var hide_form_button = doc.createElement('button');
            hide_form_button.setAttribute('id', 'hide_form_button');
            hide_form_button.setAttribute('type', 'button');
            hide_form_button.addEventListener('click', hide_workshop_form);
            hide_form_button.textContent = 'Cancel';

            var buttonset = doc.createElement('span');
            buttonset.appendChild(submit_button);
            buttonset.appendChild(hide_form_button);

            var legend = doc.createElement('legend');
            legend.textContent = "Create A Workshop";

            var name_fieldset = doc.createElement('span');
            name_fieldset.appendChild(new_label('name_input', 'name'));
            name_fieldset.appendChild(new_input_element('name_input'));

            var topic_fieldset = doc.createElement('span');
            topic_fieldset.appendChild(new_label('new_workshop_title', 'I want to learn'));
            topic_fieldset.appendChild(new_input_element('new_workshop_title'));

            var details_fieldset = doc.createElement('span');
            details_fieldset.appendChild(new_label('new_workshop_details', 'more details'));
            details_fieldset.appendChild(doc.createElement('br'));
            var details_text_area = doc.createElement('textarea');
            details_text_area.setAttribute('id', 'new_workshop_details');
            details_text_area.setAttribute('type', 'text');
            details_text_area.setAttribute('name', 'new_workshop_details');
            details_text_area.setAttribute('title', 'new_workshop_details');
            details_fieldset.appendChild(details_text_area);

            var workshop_form = doc.createElement('fieldset');
            workshop_form.setAttribute('class', 'workshop_form');
            workshop_form.appendChild(legend);
            workshop_form.appendChild(name_fieldset);
            workshop_form.appendChild(topic_fieldset);
            workshop_form.appendChild(doc.createElement('br'));
            workshop_form.appendChild(details_fieldset);
            workshop_form.appendChild(doc.createElement('br'));
            workshop_form.appendChild(buttonset);

            var action_div = doc.getElementsByClassName('action')[0];
            action_div.innerHTML = "";
            action_div.appendChild(workshop_form);
        },

        create : function () {
            var name = jquery('#name_input').val();
            var new_workshop_title = jquery('#new_workshop_title').val();
            var new_workshop_details = jquery('#new_workshop_details').val();

            var payload = {
                name : name,
                title: new_workshop_title,
                details: new_workshop_details
            };

            var createWorkshopPromise = function () {
                return workshop().getAllWorkshops();
            };

            var self = this;
            var form_hider = function () {
                return self.hide_form();
            };

            jquery.ajax({
                method: "POST",
                url: '/api/workshops',
                data: JSON.stringify(payload),
                dataType: 'json',
                contentType: "application/json"
            }).done(createWorkshopPromise)
            .then(form_hider);
        }
    };
};

module.exports = form;