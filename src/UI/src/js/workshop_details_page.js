var jquery = require('jquery');

var workshop_details_page = function () {
    return {
        show: function (data) {
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
          workshop_details.textContent = data.details
          details.appendChild(workshop_details);

          var body = document.getElementsByTagName('body')[0];
          while (body.firstChild) {
              body.removeChild(body.firstChild);
          }

          body.appendChild(details);

          var done_button = document.createElement('button');
          done_button.setAttribute('id', 'done_button');
          done_button.setAttribute('type', 'button');
          done_button.addEventListener('click', load_page);
          done_button.textContent = 'Done';
          workshop_details.appendChild(done_button);

          var add_interest_input = document.createElement('input');
          add_interest_input.setAttribute('id', 'add_interest_input');
          add_interest_input.setAttribute('type', 'text');
          add_interest_input.setAttribute('name', 'add_interest_input');
          add_interest_input.setAttribute('title', 'add_interest_input');
          body.appendChild(add_interest_input);

          var add_interest_button = document.createElement('button');
          add_interest_button.setAttribute('id', 'add_interest_button');
          add_interest_button.setAttribute('type', 'button');
          add_interest_button.addEventListener('click', show_add_interest_fields);
          add_interest_button.textContent = 'add me to the list!';
          body.appendChild(add_interest_button);
      },

      add_interest: function (workshopId) {
        var name = jquery('#add_interest_input').val();
        var id = jquery('.workshop_details').attr('id');
        console.log('foobar', id);
      }
    };
};

module.exports = workshop_details_page;