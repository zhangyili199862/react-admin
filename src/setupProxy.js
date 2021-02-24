const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        target: "http://www.web-jshtml.cn/api/react" , //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.REACT_APP_API}`]:""
        },
    }))
    
    // app.use(proxy("/manage/api", {
    //     target: "http://www.web-jshtml.cn/api/react" ,
    //     changeOrigin: true,
    // }))
};
