import Mock from 'mockjs'; //es6语法引入mock模块

// ========================================
//  登录页
//  ========================================

Mock.mock('servlet/validateCodeServlet', 'post', {
	msg: '获取验证码成功',
	state: 'success',
	data: null
});

Mock.mock('manage/login', 'post', {
	msg: '登录成功',
	state: 'success',
	data: {
		name: 'Frank Shieh',
		headIcon: 'path.png',
		role: 'admin'
	}
});

Mock.mock('manage/logout', 'post', {
	msg: '登出成功',
	state: 'success',
	data: null
});

// ========================================
//  文章列表
//  ========================================

Mock.mock('manage/article/list', 'post', {
	total: 10,
	page: 1,
	list: [{
		"id": "0001",
		"createDate": "2017-11-11",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "1_1",
		"categoryName": "代表大会会议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": true
	}, {
		"id": "0002",
		"createDate": "2017-09-24",
		"title": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"type": "1_2",
		"categoryName": "常委会会议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0003",
		"createDate": "2017-08-08",
		"title": "2016年8月29日建瓯市第十五届人大常委会第36次会议通过",
		"type": "1_1",
		"categoryName": "代表大会会议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0004",
		"createDate": "1978-06-18",
		"title": "城区殡葬“一条龙”服务点改革情况的调研报告",
		"type": "2_1",
		"categoryName": "决定决议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0005",
		"createDate": "1977-07-09",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "2_4",
		"categoryName": "代表工作",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0006",
		"createDate": "1994-09-20",
		"title": "关于吴慧艳等同志职务任免的通知",
		"type": "2_1",
		"categoryName": "决定决议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0007",
		"createDate": "1980-01-22",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "2_2",
		"categoryName": "监督公开",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0008",
		"createDate": "1985-10-10",
		"title": "龙村乡人大代表王菊英风采",
		"type": "3_1",
		"categoryName": "自身建设",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0009",
		"createDate": "1975-09-08",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"type": "1_1",
		"categoryName": "代表大会会议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}, {
		"id": "0010",
		"createDate": "1970-06-07",
		"title": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"type": "1_2",
		"categoryName": "常委会会议",
		"hits": "8766",
		"author": "张少影",
		"isRoll": false
	}]
});

Mock.mock('manage/article/setRoll', 'post', {
	msg: '设置成功',
	state: 'success',
	data: null
});

Mock.mock('manage/article/delete', 'post', {
	msg: '删除成功',
	state: 'success',
	data: null
});

// ========================================
//  文章发布
//  ========================================

Mock.mock('manage/article/save', 'post', {
	msg: '发布成功',
	state: 'success',
	data: null
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
