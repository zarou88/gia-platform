$(document).ready(function () {
  $('#parentElement').on('submit', function (e) {
      e.preventDefault();

      // جمع بيانات جميع النماذج
      var formDataArray = [];
      $('.card').each(function (index, element) {
          var formData = [];
          $(element).find('input, select, textarea').each(function () {
              var inputType = $(this).attr('type') || $(this).prop('tagName').toLowerCase();
              var inputValue = $(this).val();
              if (inputType === 'radio' && $(this).is(':checked')) {
                  inputValue = 'on';
              }

              formData.push({
                  name: $(this).attr('name') || inputType,
                  value: inputValue
              });
          });
          formDataArray.push(formData);
      });

      // طباعة البيانات في القنصل
      console.log(formDataArray);
  });

  $(document).on('click', '.btnAddtest', function (e) {
      e.preventDefault();
      var controlForm = $('#parentElement');
      var currentEntry = $(this).closest('.card');
      var newEntry = $(currentEntry.clone()).appendTo(controlForm);

      newEntry.find('input').val('');
      newEntry.find('textarea').val('');
      newEntry.find('input[type="radio"]').prop('checked', false);

      currentEntry.find('.btnAddtest')
          .removeClass('btnAddtest bg-warning-gradient')
          .addClass('btnRemoveTest bg-danger')
          .html('<i class="si si-trash text-white"></i>')
          .off('click')
          .on('click', function (e) {
              e.preventDefault();
              $(this).closest('.card').remove();
          });

      var addButton = $('<div class="btnAddtest card-chart wd-25 ht-25 bg-warning-gradient brround ml-2 mt-1 pos-absolute b-0 l-100"><i class="bi bi-plus text-white tx-36"></i></div>');
      addButton.on('click', function (e) {
          e.preventDefault();
          var newCard = $('<div class="card pos-relative"></div>');
          newCard.appendTo(controlForm);
      });
      newEntry.find('.card-body').append(addButton);
  });
});
