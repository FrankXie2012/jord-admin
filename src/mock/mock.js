import Mock from 'mockjs'; //es6语法引入mock模块


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
