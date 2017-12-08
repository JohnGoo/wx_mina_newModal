const { Base } = require('../../utils/base.js');
const option = {
    data: {
        speed: true
    },

    // onNavigate存在提前加载，不存在则跳过预加载
    onNavigate() {
        this.$put('index-detail', this.fetchData);
    },
    onLoad() {
        this.prevData = (this.$take('index-detail') || this.fetchData());
    },
    fetchData(callBack) {
        let that = this;
        wx.request({
            url: 'https://baidu.com', // 测试域名地址
            data: '',
            success(res) {
                console.log(res);
                if(typeof callBack === 'function') {
                    callBack(res)
                } else {
                    that.prevData = res.data;
                    // console.log(res);
                    that.setData({ 'speed': false});
                }
            },
        })
    },
}

Base('index-detail', option);