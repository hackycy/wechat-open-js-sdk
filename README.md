# 微信官方 JS-SDK

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

基于`Github Action`将`微信JS-SDK`发布到`npm`，版本记录于[.versionrc](./.versionrc)

> 微信官方文档: https://developers.weixin.qq.com/doc/service/guide/h5/

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
```

# 致谢

- [wx-jssdk-ts](https://github.com/zhaoky/wx-jssdk-ts/tree/master)

[npm-version-src]: https://img.shields.io/npm/v/wechat-open-js-sdk?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/wechat-open-js-sdk
[npm-downloads-src]: https://img.shields.io/npm/dm/wechat-open-js-sdk?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/wechat-open-js-sdk
