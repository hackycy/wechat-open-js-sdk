# 微信官方 js-sdk

基于CI将官方 js-sdk 发布到 npm

> 版本记录于[.versionrc](./versionrc)
> 文档: https://developers.weixin.qq.com/doc/service/guide/h5/

## 安装

``` bash
pnpm add wechat-open-js-sdk
```

## 使用

``` javascript
// commonjs
var wx = require('wechat-open-js-sdk');
// es
import wx from 'wechat-open-js-sdk'

// 或者其他SDK版本，默认为.versionrc下最后一行指定的版本
import wx from 'wechat-open-js-sdk/1.2.0'
// ...
```

# 感谢

- [wx-jssdk-ts](https://github.com/zhaoky/wx-jssdk-ts/tree/master)
