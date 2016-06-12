"use strict";
var jquery = require('jquery');

var workshop_details_page = function () {
    return {
        show: function (data) {
          var body = document.getElementsByTagName('body')[0];
          body.textContent = "";

          var add_interest_input = document.createElement('input');
          add_interest_input.setAttribute('id', 'add_interest_input');
          add_interest_input.setAttribute('type', 'text');
          add_interest_input.setAttribute('name', 'add_interest_input');
          add_interest_input.setAttribute('title', 'add_interest_input');

          var add_interest_button = document.createElement('button');
          add_interest_button.setAttribute('id', 'add_interest_button');
          add_interest_button.setAttribute('type', 'button');
          add_interest_button.setAttribute('class', '--pad-right');
          add_interest_button.addEventListener('click', add_interested_person);
          add_interest_button.textContent = 'add me to the list!';

          var add_teacher_input = document.createElement('input');
          add_teacher_input.setAttribute('id', 'add_teacher_input');
          add_teacher_input.setAttribute('type', 'text');
          add_teacher_input.setAttribute('name', 'add_teacher_input');
          add_teacher_input.setAttribute('title', 'add_teacher_input');

          var add_teacher_button = document.createElement('button');
          add_teacher_button.setAttribute('id', 'add_teacher_button');
          add_teacher_button.setAttribute('type', 'button');
          add_teacher_button.addEventListener('click', add_teacher_to_workshop(data.id));
          add_teacher_button.textContent = 'I can teach that!';

          var action_div = document.createElement('div');
          action_div.setAttribute('class', 'action');
          action_div.appendChild(add_interest_input);
          action_div.appendChild(add_interest_button);
          action_div.appendChild(add_teacher_input);
          action_div.appendChild(add_teacher_button);
          body.appendChild(action_div);

          var workshop_header = document.createElement('div');
          workshop_header.setAttribute('id', 'workshop_header');
          workshop_header.textContent = data.name + " wants to learn " + data.title;

          var workshop_details = document.createElement('div');
          workshop_details.setAttribute('id', 'workshop_details_details');
          workshop_details.textContent = data.details;

          var done_button = document.createElement('button');
          done_button.setAttribute('id', 'done_button');
          done_button.setAttribute('type', 'button');
          done_button.addEventListener('click', load_page);
          done_button.textContent = 'Done';

          var details = document.createElement('div');
          details.setAttribute('id', data.id);
          details.setAttribute('class', 'main_content');
          details.appendChild(workshop_header);
          details.appendChild(workshop_details);
          details.appendChild(done_button);
          body.appendChild(details);

          var extras_div = document.createElement('div');
          extras_div.setAttribute('class', 'extras');

          if (data.instructor) {
            var instructor_section = document.createElement('div');
            instructor_section.setAttribute('class', 'instructor');
            instructor_section.innerHTML = data.instructor + " has signed up to teach this workshop";
            extras_div.appendChild(instructor_section)
          }

          if (data.interestedPeople.length > 0) {
            console.log('interested people', data.interestedPeople.length);
            var interested_people = document.createElement('div');
            interested_people.setAttribute('id', 'interested_people');

            var interested_people_label = document.createElement('div');
            interested_people_label.textContent = "These people are interested in this workshop too:";
            interested_people.appendChild(interested_people_label);

            for (var index = 0; index < data.interestedPeople.length; index++) {
                var person = data.interestedPeople[index];
                var interested_person = document.createElement('div');
                interested_person.textContent = person;
                interested_people.appendChild(interested_person);
            }
            extras_div.appendChild(interested_people);
          }

          body.appendChild(extras_div);
      },

      add_interest: function () {
        var name = jquery('#add_interest_input').val();
        var id = jquery('.main_content').attr('id');

        var payload = {
            name: name
        };

        var self = this;

        jquery.ajax({
            method: 'POST',
            url: '/api/workshops/' + id + '/interested',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json'
        }).done(self.update_interested);

      },

      update_interested : function (data) {
        // FIXME - the code in this function is duplicated
        var interested_people = document.getElementById('interested_people');
        console.log('interested people update', data.interestedPeople.length);
        if (interested_people == null) {
          var extras = document.getElementsByClassName('extras')[0];
          interested_people = document.createElement('div');
          interested_people.setAttribute('id', 'interested_people');
          extras.appendChild(interested_people);
        }

        interested_people.textContent = "";
        var interested_people_label = document.createElement('div');
        interested_people_label.textContent = "These people are interested in this workshop too:";
        interested_people.appendChild(interested_people_label);

        for (var index = 0; index < data.interestedPeople.length; index++) {
            var person = data.interestedPeople[index];
            var interested_person = document.createElement('div');
            interested_person.textContent = person;
            interested_people.appendChild(interested_person);
        }
      },

      add_teacher : function () {
        var name = jquery('#add_teacher_input').val();
        var workshopId = jquery('.main_content').attr('id');

        var payload = {
            name: name
        };

        var self = this;

        jquery.ajax({
            method: 'PUT',
            url: '/api/workshops/' + workshopId + '/instructor',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json'
        }).done(self.update_teacher);
      },

      update_teacher : function (data) {
        // FIXME - the code in this function is duplicated
        var instructor_section = document.getElementsByClassName('instructor')[0];

        if (!instructor_section) {
          instructor_section = document.createElement('div');
          instructor_section.setAttribute('class', 'instructor');
        }

        instructor_section.innerHTML = "";
        instructor_section.innerHTML = data.instructor + " has signed up to teach this workshop";

        var extras_div = document.getElementsByClassName('extras')[0];
        var first_element = extras_div.firstChild;
        extras_div.insertBefore(instructor_section, first_element);
      }
    };
};

module.exports = workshop_details_page;