var config = require('./config');
var callBackOnNextTick = require('./conform-async');
var Twit = require('twit');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var twit = new Twit(config.twitter);

function postTweet(text, done) {
  if (opts.dryRun) {
    log('Would have tweeted:', text);
    callBackOnNextTick(done);
  }
  else {
    twit.post(
      'statuses/update',
      {
        status: text
      },
      function tweetDone(error, data, response) {
        if (error) {
          console.log(error);
          console.log('data:', data);
        }
        else {
          console.log('Posted to Twitter:', text);
        }
        done(error);
      }
    );
  }
}

// Do some stuff.
