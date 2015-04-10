var createNamer = require('../namer').create;
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var assembleGroupsIntoTitle = require('../assemble-groups-into-title');

// var cmdOpts = require('nomnom').parse();

var seed = (new Date()).toISOString();
// seed = '2015-04-10T05:16:11.618Z';
console.log('seed:', seed);

var namer = createNamer({
  probable: createProbable({
    random: seedrandom(seed)
  })
});

var nameGroups = namer.name();
console.log(nameGroups);
console.log(assembleGroupsIntoTitle(nameGroups));
