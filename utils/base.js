// cache业务缓存数据，optionList缓存页面对象列表副本
let cache = {};
let optionList = [];

/**
 * @description 创建基类 Base
 * @construct
 * @param {name, option} 页面名称name，页面对象option
 */
function Base(name, option) {
    // 设置全局方法
    let globalMethod = {
        $put(pageName, callBack) {
            // 若数据无需刷新，可无需重新请求
            // if (cache[pageName]) return;
            cache.isNewData = false;
            callBack((res) => {
                cache[pageName] = res;
                cache.isNewData = true;

                // onLoad 已运行时重载，解决接口加载2次的问题；不过，影响onLoad的功能（接收参数）
                // if (cache.waitingNewData) {
                //     let currentPage = getCurrentPages()[getCurrentPages().length - 1];
                //     currentPage.onLoad();
                //     cache.waitingNewData = false;
                // }
            });
        },
        $take(pageName) {
            return cache.isNewData ? cache[pageName] : null;
        },
        $route(pageName, url) {
            wx.navigateTo({ url })
            optionList[pageName].onNavigate && optionList[pageName].onNavigate();
        },
    };

    // 缓存页面对象列表副本
    optionList[name] = option;
    // 合并全局方法
    Object.assign(option, globalMethod);

    // console.log(optionList);
    Page(option);
}

module.exports = { Base };
