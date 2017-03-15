var _ = require('lodash');
var EmoticonParser = require('emoticon-parser');
var emoticonParser = new EmoticonParser({
  debug: false,
  emoticons: {},
  emoticon_html: ':{EMOTICON}:'
});

var emoji = require("emojilib");

// console.log(emoji.lib);
// console.log(rs);
let str = 'When a boy winks at you :girl: fear not, ;-) back and give him a broad :-)';

function emoji_replace(str, returnObject) {
  var m = [],
    obj = {},
    
    w = '';

  // First parse common emoticons
  str = emoticonParser.parseText(str);
  m = str.match(/:(.+?):/ig);
  _.each(m, function(v) {
    w = v.replace(/:/g, '');
    obj = emoji.lib[w] || _.find(emoji.lib, function(o) {
      return (_.indexOf(o.keywords, w) > -1 && o.char);
    });
    
    // If character exists
    if (obj.char) {
      str = str.replace(v, obj.char);
    }
  });
  return str;
}

//now some emoji replacements.
str = emoji_replace(str);

console.log(str);

module.exports = emoji_replace;