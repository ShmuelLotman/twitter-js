const _ = require('lodash');
var data = [];
var idCount = 0;
function add (name, content) {
  idCount++
  data.push({ name: name, content: content, id: idCount });
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive', 'mindblowing', 'amazeballs'];

for (let i = 0; i < 10; i++) {
  module.exports.add((fakeFirsts[i] + ' ' + fakeLasts[i]),  "Fullstack Academy is " + awesome_adj[i] + "! The instructors are just so " + awesome_adj[i] + ". #fullstacklove #codedreams" );
}

