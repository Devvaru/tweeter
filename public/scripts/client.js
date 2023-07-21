// const { response } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //renders new tweets
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $post = createTweetElement(tweet);
      $('.tweets').append($post);
    }
  };

  // load existing tweets
  const loadtweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: (response) => {
        renderTweets(response);
      }
    });
  };

  loadtweets();

  // prevents cross-site scripting
  const escape = function(text) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(text));
    return p.innerHTML;
  };

  // tweet template
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}"/>
        <div class="user-names">
          <h3 class="tweet-user">${tweet.user.name}</h3>
          <h3 class="tweet-handle">${tweet.user.handle}</h3>
        </div>
      </header>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
      <footer> 
        <p>${timeago.format(tweet.created_at)}</p>
        <ul>
          <li>
            <i class="fa-solid fa-flag"></i>
          </li>
          <li>
            <i class="fa-solid fa-retweet"></i>
          </li>
          <li>
            <i class="fa-solid fa-heart"></i>
          </li>
        </ul>
      </footer>
    </article>
  `);
    return $tweet;
  };

  // event listener on tweet submission
  $('#tweetform').on('submit', function(e) {

    // prevents default actions of form submission
    e.preventDefault();

    // get form data and turn it into a string,
    let tweet = $('#tweetform').serialize();
    // slice off 'text=' to get length
    let tweetSliced = tweet.slice(5);

    // form validation
    if (tweetSliced.length === 0) {
      $('.error-empty').addClass("reveal-error-tooltip");

    } else if (tweetSliced.length > 140) {
      $('.error-count').addClass("reveal-error-tooltip");

    } else {
      $.ajax({
        url: "/tweets", // add tweet to /tweets
        method: "POST",
        data: tweet,
        success: function(response) {
          $('#tweet-text').val("");
          loadtweets();
        },
        error: function(err) {
          console.log("there was an error ", err);
        }
      });
    }
  });

  // hides error once user starts typing
  $('#tweet-text').on('keyup', function() {
    $('.error-empty').removeClass("reveal-error-tooltip");
    $('.error-count').removeClass("reveal-error-tooltip");
  });

  // toggles new tweet section
  $('.nav-right').on('click', function() {
    $('.new-tweet').slideToggle();
  });
});