yet-another-module
==================

This is a bot that does a thing.

Installation
------------

Clone this repo.

Then, create a `config.js` file in the project root that contains [Twitter API keys](https://apps.twitter.com/) and [Wordnik API key](http://developer.wordnik.com/). Example:

    module.exports = {
      twitter: {
        consumer_key: 'asdfkljqwerjasdfalpsdfjas',
        consumer_secret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        access_token: '9999999999-zxcvkljhpoiuqwerkjhmnb,mnzxcvasdklfhwer',
        access_token_secret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh'
      },
      wordnikAPIKey: 'mkomniojnnuibiybvuytvutrctrxezewarewetxyfcftvuhbg'
    };

Usage
-----

    make run

Tests
-----

Run tests with `make test`.

License
-------

MIT.
