$(document).ready(function() {

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
      <div class="tweet-box">
        <header>
          <div class="avatar-container">
            <img class="avatar" src="${tweet.user.avatars}"/>
            <h3 class="tweet-user">${tweet.user.name}</h3>
          </div>
          <h3 class="tweet-handle">${tweet.user.handle}</h3>
        </header>
        <p class="tweet-content">${escape(tweet.content.text)}</p>
      </div> 
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

  //renders new tweets
  const renderTweets = function(tweets) {
    // Clear existing tweets
    $('.tweets').empty();

    // Re-render all tweets including new tweet
    for (let tweet of tweets) {
      let $post = createTweetElement(tweet);
      $('.tweets').prepend($post);
    }
  };

  // load existing tweets
  const loadtweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: (response) => {
        renderTweets(response);
      },
      error: (error) => {
        console.log("There was an error ", error);
      }
    });
  };

  // loads the pre-existing tweets from the data files
  loadtweets();

  // event listener on tweet submission
  $('#tweet-form').on('submit', function(e) {

    // prevents default actions of form submission
    e.preventDefault();

    // get value of textarea
    let tweetText = $('#tweet-text').val();

    // get form data and turn it into a string
    let tweet = $('#tweet-form').serialize();

    // form validation
    if (tweetText.length === 0) {
      $('.error-empty').addClass("reveal-error-tooltip");

    } else if (tweetText.length > 140) {
      $('.error-count').addClass("reveal-error-tooltip");

    } else {
      $.ajax({
        url: "/tweets", // add tweet to /tweets
        method: "POST",
        data: tweet,
        success: function() {
          $('#tweet-text').val("");
          loadtweets();
        },
        error: function(error) {
          console.log("There was an error ", error);
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