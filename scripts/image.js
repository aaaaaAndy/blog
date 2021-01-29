// var cheerio = require('cheerio');
//
// hexo.extend.filter.register('after_post_render', function(data){
// 	var config = hexo.config;
// 	var root = config.root;
//
// 	var toprocess = ['excerpt', 'more', 'content'];
// 	for(var i = 0; i < toprocess.length; i++) {
// 		var key = toprocess[i];
//
// 		var $ = cheerio.load(data[key], {
// 			ignoreWhitespace: false,
// 			xmlMode: false,
// 			lowerCaseTags: false,
// 			decodeEntities: false
// 		});
//
// 		$('img').each(function () {
// 			var src = $(this).attr('src');
// 			if (src) {
// 				var srcSplits = src.split('./');
// 				var appendSrc = srcSplits.pop();
// 				$(this).attr('src', root + appendSrc);
// 			}
// 		});
//
// 		data[key] = $.html();
// 	}
//
// 	return data;
// });
//
