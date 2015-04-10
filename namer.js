var _ = require('lodash');
var exportMethods = require('export-methods');
var jsonfile = require('jsonfile');

var wordPool = jsonfile.readFileSync(__dirname + '/data/wordpool.json');

var wordsForTypes = {};

for (var word in wordPool) {
  var types = wordPool[word];
  for (var i = 0; i < types.length; ++i) {
    var type = types[i];
    addWordToTypeList(word, type);
  }
}

function addWordToTypeList(word, type) {
  var list = wordsForTypes[type];
  if (!list) {
    list = [];
    wordsForTypes[type] = list;
  }
  list.push(word);
}

// console.log(JSON.stringify(wordsForTypes, null, '  '));

// base
// add modifier
//  - modifier says which modifier generators it works with in parallel.
//  - modifier says which modifier generators can modify it.

function createNamer(opts) {
  var probable;

  if (opts) {
    probable = opts.probable;
  }

  function name() {
    var group1 = addArticlesToGroup(makeGroup(wordsForTypes.base));
    var groups = [group1];

    if (probable.roll(3) !== 0) {
      var group2 = addConnectorToGroup(addArticlesToGroup(
        makeGroup(wordsForTypes.base)
      ));

      groups.push(group2);
    }

    var group2ConnectedByOf = (group2 && group2.connector === 'of');
    if (!group2ConnectedByOf && probable.roll(3) !== 0) {
      addOrdinalToGroup(group1);
    }

    if (group2 && probable.roll(group1.ordinal ? 10 : 3) === 0) {
      addOrdinalToGroup(group2);
    }

    return groups;
  }

  function makeGroup(bases) {
    var group = {
      base: probable.pickFromArray(bases)
    };

    group.prefix =
      probable.pickFromArray(_.without(wordsForTypes.prefix, group.base));

    if (wordPool[group.prefix].indexOf('cannotbeprefixed') === -1 &&
      probable.roll(2) === 0) {

      group.preprefix = probable.pickFromArray(
        _.without(wordsForTypes.prefix, group.base, group.prefix)
      );
    }

    var suffixChanceBar = 0;
    if (group.prefix) {
      suffixChanceBar += 1;
    }
    if (group.preprefix) {
      suffixChanceBar += 1;
    }

    if (wordPool[group.base].indexOf('cannotattachsuffix') === -1 &&
      probable.roll(10) === 0) {
      
      group.attachedSuffix = probable.pickFromArray(
        _.without(wordsForTypes['attached-suffix'], group.base)
      );
    }

    if (probable.rollDie(3) > suffixChanceBar) {
      group.suffix = probable.pickFromArray(
        _.without(wordsForTypes.suffix, group.attachedSuffix, group.base)
      );
    }

    return group;    
  }

  function addArticlesToGroup(group) {
    if (wordPool[group.base].indexOf('article-object') !== -1) {
      if (probable.roll(2) === 0) {
        // group.article = (probable.roll(10) === 0 ? 'a' : 'the');
        group.article = 'the';
      }
    }

    return group;
  }

  function addConnectorToGroup(group) {
    if (wordPool[group.base].indexOf('of-object') !== -1) {
      if (probable.roll(2) === 0) {
        group.connector = 'of';
      }
    }
    if (!group.connector) {
      group.connector = ':';
    }

    return group;
  }

  function addOrdinalToGroup(group) {
    if (probable.roll(5) === 0) {
      group.ordinal = probable.pickFromArray(wordsForTypes.ordinal);
    }
    else {
      group.ordinal = 2 + probable.roll(4);
    }
    return group;
  }

  return exportMethods(name);
}

module.exports = {
  create: createNamer
};
