var workshop_details_page = function () {
    return {
        show: function (data) {
          var details = document.createElement('div');
          details.setAttribute('id', 'workshop_details');

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

          body.appendChild(done_button);
      }
    };
};

module.exports = workshop_details_page;