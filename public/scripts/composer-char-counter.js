$(document).ready(function() {

  $("#tweet-text").keyup(function() {

    // length of input field
    let count = $(this).val().length;

    // update counter number based on input
    let $counter = $(this).parent().parent().find(".counter").text(140 - count);

    // Change color based on value
    if ($counter.val() < 0) {

      $($counter).removeClass("blue-counter").addClass("red-counter");

    } else if ($counter.val() >= 0) {

      $($counter).removeClass("red-counter").addClass("blue-counter");

    }
  });
});