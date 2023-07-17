// const { response } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function(e) {

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
        <p>${tweet.created_at}</p>
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

  renderTweets(data);

  $('#tweetform').on('submit', function(e) {

    // prevents default actions of form submission
    e.preventDefault();

    // get form data and turn it into a string
    let data = $('#tweetform').serialize();

    $.ajax({
      url: "/tweets", // add tweet to /tweets
      method: "POST",
      data: data,
      success: (response) => {
        console.log(data);
      },
      error: function(err) {
        console.log("there was an error ", err);
      }

    });
  });
});