import Mock from 'mockjs'; //es6语法引入mock模块

// ========================================
//  文章列表
//  ========================================

Mock.mock('getNewsList', 'post', {
	total: 10,
	page: 1,
	list: [{
		"date": "2017-11-11",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"image": "img.png",
		"type": "1_1",
		"typeName": "代表大会会议"
	}, {
		"date": "2017-09-24",
		"name": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"image": "img2.png",
		"type": "1_2",
		"typeName": "常委会会议"
	}, {
		"date": "2017-08-08",
		"name": "2016年8月29日建瓯市第十五届人大常委会第36次会议通过",
		"image": "img.png",
		"type": "1_1",
		"typeName": "代表大会会议"
	}, {
		"date": "1978-06-18",
		"name": "城区殡葬“一条龙”服务点改革情况的调研报告",
		"image": "img.png",
		"type": "2_1",
		"typeName": "决定决议"
	}, {
		"date": "1977-07-09",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"image": "img.png",
		"type": "2_4",
		"typeName": "代表工作"
	}, {
		"date": "1994-09-20",
		"name": "关于吴慧艳等同志职务任免的通知",
		"image": "img.png",
		"type": "2_1",
		"typeName": "决定决议"
	}, {
		"date": "1980-01-22",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"image": "img.png",
		"type": "2_2",
		"typeName": "监督公开"
	}, {
		"date": "1985-10-10",
		"name": "龙村乡人大代表王菊英风采",
		"image": "img.png",
		"type": "3_1",
		"typeName": "自身建设"
	}, {
		"date": "1975-09-08",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"image": "img.png",
		"type": "1_1",
		"typeName": "代表大会会议"
	}, {
		"date": "1970-06-07",
		"name": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"image": "img.png",
		"type": "1_2",
		"typeName": "常委会会议"
	}]
});

// ========================================
//  图片新闻
//  ========================================

Mock.mock('getImgList', 'post', {
	total: 10,
	page: 1,
	list: [{
		"date": "2017-11-11",
		"name": "建瓯人大常委",
		"type": "1_1",
		"num": "6",
		"typeName": "人大简介"
	}, {
		"date": "2017-09-24",
		"name": "东游人大常委",
		"type": "1_2",
		"num": "6",
		"typeName": "组织机构"
	}, {
		"date": "2017-08-08",
		"name": "龙村人大常委",
		"type": "1_1",
		"num": "6",
		"typeName": "人大简介"
	}, {
		"date": "1978-06-18",
		"name": "城区殡葬“一条龙”服务点改革情况的调研报告",
		"type": "2_1",
		"num": "6",
		"typeName": "图片新闻"
	}, {
		"date": "1977-07-09",
		"name": "房道人大常委",
		"type": "1_3",
		"num": "6",
		"typeName": "组成人员名单"
	}, {
		"date": "1994-09-20",
		"name": "关于吴慧艳等同志职务任免的通知",
		"type": "2_1",
		"num": "6",
		"typeName": "图片新闻"
	}, {
		"date": "1980-01-22",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "1_4",
		"num": "6",
		"typeName": "代表名单"
	}, {
		"date": "1985-10-10",
		"name": "龙村乡人大代表王菊英风采",
		"type": "2_1",
		"num": "6",
		"typeName": "图片新闻"
	}, {
		"date": "1975-09-08",
		"name": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "1_1",
		"num": "6",
		"typeName": "人大简介"
	}, {
		"date": "1970-06-07",
		"name": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"type": "1_2",
		"num": "6",
		"typeName": "组织机构"
	}]
});


// ========================================
//  编辑图片新闻页面
//  ========================================

// 获取图片新闻数据
Mock.mock('getImgNews', 'post', {
	newsName: '东游镇人大委员',
	newsImgs: [{
		name: '张伟',
		url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513252328854&di=6100fdb5f75da2a1c85043f3df1dd525&imgtype=0&src=http%3A%2F%2F02.imgmini.eastday.com%2Fmobile%2F20170715%2F20170715114157_fc29b7cd0411843cf7799ec388a642ba_2.jpeg'
	}, {
		name: '李梦',
		url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513252328854&di=989d3d675b570561a283131a0a01ac70&imgtype=0&src=http%3A%2F%2Fs8.rr.itc.cn%2Fg%2FwapChange%2F20149_28_18%2Fa4npdu937019350305.jpg'
	}]
});

Mock.mock('uploadImgNews', 'post', {
	msg: '上传成功',
	state: 'success',
	data: null
});
