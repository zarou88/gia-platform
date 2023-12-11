document.getElementById('copyButton').addEventListener('click', function() {
    var table = document.getElementById('cartprogramme');
    var range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('تمت عملية النسخ!');
  });