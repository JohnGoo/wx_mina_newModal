const { Base } = require('../../utils/base.js');
const option = {
    data: {},
    toDetail() {
        this.$route('index-detail', '/pages/index-detail/index-detail');
    }
}

Base('index', option);