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
          body.appendChild(add_interest_input);

          var add_interest_button = document.createElement('button');
          add_interest_button.setAttribute('id', 'add_interest_button');
          add_interest_button.setAttribute('type', 'button');
          add_interest_button.addEventListener('click', add_interested_person);
          add_interest_button.textContent = 'add me to the list!';
          body.appendChild(add_interest_button);

          var add_teacher_input = document.createElement('input');
          add_teacher_input.setAttribute('id', 'add_teacher_input');
          add_teacher_input.setAttribute('type', 'text');
          add_teacher_input.setAttribute('name', 'add_teacher_input');
          add_teacher_input.setAttribute('title', 'add_teacher_input');
          body.appendChild(add_teacher_input);

          var add_teacher_button = document.createElement('button');
          add_teacher_button.setAttribute('id', 'add_teacher_button');
          add_teacher_button.setAttribute('type', 'button');
          add_teacher_button.addEventListener('click', add_teacher_to_workshop(data.id));
          add_teacher_button.textContent = 'I can teach that!';
          body.appendChild(add_teacher_button);

          var details = document.createElement('div');
          details.setAttribute('id', data.id);
          details.setAttribute('class', 'workshop_details');

          var workshop_name = document.createElement('div');
          workshop_name.setAttribute('id', 'workshop_details_name');
          workshop_name.textContent = data.name;
          details.appendChild(workshop_name);

          var workshop_title = document.createElement('div');
          workshop_title.setAttribute('id', 'workshop_details_title');
          workshop_title.textContent = data.title;
          details.appendChild(workshop_title);

          var workshop_details = document.createElement('div');
          workshop_details.setAttribute('id', 'workshop_details_details');
          workshop_details.textContent = data.details;
          details.appendChild(workshop_details);

          body.appendChild(details);

          var done_button = document.createElement('button');
          done_button.setAttribute('id', 'done_button');
          done_button.setAttribute('type', 'button');
          done_button.addEventListener('click', load_page);
          done_button.textContent = 'Done';
          details.appendChild(done_button);


          if (data.instructor) {
            var instructor_name = document.createElement('span');
            instructor_name.setAttribute('id', 'teacher_name');
            instructor_name.textContent = data.instructor;

            var instructor_label = document.createElement('span');
            instructor_label.textContent = " has signed up to teach this workshop";

            var instructor_section = document.createElement('div');
            instructor_section.setAttribute('class', 'instructor');
            instructor_section.appendChild(instructor_name);
            instructor_section.appendChild(instructor_label);
            details.appendChild(instructor_section)
          }

          var interested_people = document.createElement('div');
          interested_people.setAttribute('id', 'interested_people');
          body.appendChild(interested_people);

          var interested_people_label = document.createElement('div');
          interested_people_label.textContent = "These people are interested in this workshop too:";
          interested_people.appendChild(interested_people_label);

          for (let person of data.interestedPeople) {
              var interested_person = document.createElement('div');
              interested_person.textContent = person;
              interested_people.appendChild(interested_person);
          }
      },

      add_interest: function (workshopId) {
        var name = jquery('#add_interest_input').val();
        var id = jquery('.workshop_details').attr('id');

        var payload = {
            name: name
        };

        var self = this;

        jquery.ajax({
            method: 'PATCH',
            url: 'http://localhost:8080/api/workshops/' + id,
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json'
        }).done(self.update_interested);

      },

      update_interested : function (data) {
        var interested_people = document.getElementById('interested_people');
        interested_people.textContent = "";

        // FIXME - the code in this function is duplicated
        var interested_people_label = document.createElement('div');
        interested_people_label.textContent = "These people are interested in this workshop too:";
        interested_people.appendChild(interested_people_label);

        for (let person of data.interestedPeople) {
            var interested_person = document.createElement('div');
            interested_person.textContent = person;
            interested_people.appendChild(interested_person);
        }
      },

      add_teacher : function () {
        var name = jquery('#add_teacher_input').val();
        var workshopId = jquery('.workshop_details').attr('id');

        var payload = {
            name: name
        };

        var self = this;

        jquery.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/api/workshops/' + workshopId + '/instructor',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json'
        }).done(self.update_teacher);
      },

      update_teacher : function (data) {
        // FIXME - the code in this function is duplicated
        var instructor_name = document.createElement('span');
        instructor_name.setAttribute('id', 'teacher_name');
        instructor_name.textContent = data.instructor;

        var instructor_label = document.createElement('span');
        instructor_label.textContent = " has signed up to teach this workshop";

        var instructor_section = document.createElement('div');
        instructor_section.setAttribute('class', 'instructor');
        instructor_section.appendChild(instructor_name);
        instructor_section.appendChild(instructor_label);

        var details = document.getElementById(data.id);
        details.appendChild(instructor_section)
      }
    };
};

module.exports = workshop_details_page;