import { createApp } from "vue";
import singleSpaVue from 'single-spa-vue';
import './set-public-path';
// import VueRouter from "/@modules/vue-router";
import App from "./App.vue";
// import "./public-path";
// import routes from "./routes";


const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
      });
    },
  },
  handleInstance: (app) => {
    // app.use(router);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
























// Vue.config.productionTip = false;

// // 声明变量管理vue及路由实例
// let router = null;
// let instance = null;

// // 导出子应用生命周期 挂载前
// export async function bootstrap(props) {
//     console.log(props)
// }

// // 导出子应用生命周期 挂载前 挂载后
// /**注意，实例化路由时，判断当运行在qiankun环境时，路由要添加前缀，前缀与主应用注册子应用函数genActiveRule("/aaa")内的参数一致**/
// export async function mount(props) {
//   // router = new VueRouter({
//   //   base: window.__POWERED_BY_QIANKUN__ ? "/aaa" : "/",
//   //   mode: "history",
//   //   routes
//   // });
//   instance = createApp({
//     // router,
//     // store,
//     render: h => h(App)
//   }).$mount("#app");
// }

// // 导出子应用生命周期 挂载前 卸载后
// export async function unmount() {
//   instance.$destroy();
//   instance = null;
//   router = null;
// }

// // 单独开发环境
// window.__POWERED_BY_QIANKUN__ || mount();