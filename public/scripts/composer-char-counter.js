$(document).ready(function () {

  $("#tweet-text").keyup(function () {

    let count = $(this).val().length;

    let $counter = $(this).parent().find(".counter").text(140 - count);

    if ($counter.val() < 0) {
      ($counter).css('color', 'red')
    } else if ($counter.val() >= 0) {
      ($counter).css('color', '#0e1737')
    }

  });
});