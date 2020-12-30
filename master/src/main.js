import { createApp, h } from 'vue';
import App from './App.vue'
// 导入qiankun内置函数
import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 第一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载子应用
  start, // 启动
  addGlobalUncaughtErrorHandler
} from 'qiankun';

let app = null;
/**
 * 渲染函数
 * appContent 子应用html
 * loading 如果主应用设置loading效果，可不要
 */

function render({ appContent, loading } = {}) {
  if (!app) {
    app = createApp({
      // router,
      // store,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render() {
        let content = this.content
        return h(App, {
          content,
          loading: this.loading,
        });
      },
    }).mount('#app')
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

// 调用渲染主应用
render();

// 注册子应用
registerMicroApps(
  [
    {
      name: 'vue-aaa',
      entry: '//localhost:7771',  
      render,
      activeRule: genActiveRule('/aaa'),
    }
  ],
  {
    beforeLoad: [
      (app) => {
        console.log('before load', app);
      },
    ], // 挂载前回调
    beforeMount: [
      (app) => {
        console.log('before mount', app);
      },
    ], // 挂载后回调
    afterUnmount: [
      (app) => {
        console.log('after unload', app);
      },
    ], // 卸载后回调
  }
);

// 设置默认子应用,参数与注册子应用时genActiveRule("/aaa")函数内的参数一致
setDefaultMountApp('/aaa');

// 第一个子应用加载完毕回调
runAfterFirstMounted((app) => {
  console.log(app)
});
// 启动微服务
start();
// 设置全局未捕获一场处理器
addGlobalUncaughtErrorHandler(event => console.log(event));