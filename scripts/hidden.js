
// hexo.extend.filter.register('before_post_render', function (data) {
// 	var raw = data.raw;
// 	var rawHeader = String(raw).split('---')[1];
//
// 	if (!rawHeader) {
// 		return '';
// 	}
//
// 	var rawHeaderArr = rawHeader.split('\n');
// 	var headerObj = {};
//
// 	rawHeaderArr && rawHeaderArr.forEach((item) => {
// 		var itemArr = item.split(':');
// 		headerObj[itemArr[0]] = itemArr[1];
// 	})
//
// 	if (!headerObj || headerObj.hidden !== 'true') {
// 		return '';
// 	}
// })

// hexo.extend.processor.register(/(.*)/, function(file){
// 	// console.log(123, file);
//
// 	return;
// });
