$(document).ready(function() {
    // معالجة النقر على زر "أضف"
    $(document).on('click', '.btnAddtest', function(e) {
      e.preventDefault();
      var controlForm = $('#parentElement');
      var currentEntry = $(this).closest('.card');
      var newEntry = $(currentEntry.clone()).appendTo(controlForm);
      
      // إعادة تعيين قيم الحقول في الكارت الجديدة
      newEntry.find('input').val('');
      newEntry.find('input[type="radio"]').prop('checked', false);
      
      // إعادة تعيين الزر الحالي إلى زر "إزالة"
      currentEntry.find('.btnAddtest')
        .removeClass('btnAddtest bg-warning-gradient')
        .addClass('btnRemoveTest bg-danger')
        .html('<i class="si si-trash text-white"></i>')
        .off('click')
        .on('click', function(e) {
          e.preventDefault();
          $(this).closest('.card').remove();
        });
        
      // إضافة زر "أضف" في الكارت الجديدة
      var addButton = $('<div class="btnAddtest card-chart wd-25 ht-25 bg-warning-gradient brround ml-2 mt-1 pos-absolute b-0 l-100"><i class="bi bi-plus text-white tx-36"></i></div>');
      addButton.on('click', function(e) {
        e.preventDefault();
        // قم بمعالجة النقر على زر "أضف" في الكارت الجديدة هنا
        var newCard = $('<div class="card pos-relative"></div>');
        // إضافة المحتوى الخاص بالكارت الجديد هنا
        newCard.appendTo(controlForm);
      });
      newEntry.find('.card-body').append(addButton);
    });
  });
  