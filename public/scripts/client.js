// const { response } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}"/>
        <h3 class="tweet-user">${tweet.user.name}</h3>
        <h3 class="tweet-handle">${tweet.user.handle}</h3>
      </header>
      <p class="tweet-content">${tweet.content.text}</p>
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

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $post = createTweetElement(tweet);
      $('.tweets').append($post);
    }
  };

  $('#tweetform').on('submit', function(e) {

    // prevents default actions of form submission
    e.preventDefault();

    // get form data and turn it into a string
    let tweet = $('#tweetform').serialize();

    $.ajax({
      url: "/tweets", // add tweet to /tweets
      method: "POST",
      data: tweet,
      success: (response) => {
        console.log(tweet);
      },
      error: function(err) {
        console.log("there was an error ", err);
      }

    });
  });

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

});