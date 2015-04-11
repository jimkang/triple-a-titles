var config = require('./config');
var callBackOnNextTick = require('conform-async');
var createNamer = require('triple-a-namer');
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var Twit = require('twit');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var seed = (new Date()).toISOString();
console.log('seed:', seed);

var namer = createNamer({
  probable: createProbable({
    random: seedrandom(seed)
  })
});

var nameGroups = namer.name();
console.log(nameGroups);
var title = namer.assembleGroupsIntoTitle(nameGroups);

var twit = new Twit(config.twitter);

function postTweet(text) {
  if (dryRun) {
    console.log('Would have tweeted:', text);
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
      }
    );
  }
}

postTweet(title);
