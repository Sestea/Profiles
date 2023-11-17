# Surge

## 资源

### 帮助

[官方网站](https://nssurge.com/) [理解原理](https://manual.nssurge.com/book/understanding-surge/cn/) [手册](http://manual.nssurge.com/) [知识库](https://kb.nssurge.com/surge-knowledge-base/v/zh/) [常见问题](https://nssurge.zendesk.com/) [社区](https://community.nssurge.com/)

### 模块

请访问子页面寻找模块列表及使用说明。[README→](/Script/Surge/README.md)

## 说明

### 快速上手

在 `Profiles` 页面点击 `Download Profile from URL`，复制下方链接并粘贴

```
https://raw.githubusercontent.com/Sestea/Profiles/beta/Config/Surge/Surge.conf
```

导入成功后，将 `[Proxy Group]` 下条目 `DuckDuckGo`（远程策略组示例）中的 `[SUBLINK]` 字样替换为你的订阅链接。

### DNS

如果所使用的网络没有 DNS 劫持问题，则配置为使用系统 DNS 并追加公共 DNS，如果存在 DNS 劫持问题，则配置为仅使用公共 DNS。

如部分运营商存在劫持海外正常网站至反诈页面的（据目前反馈它们没有抢答公共 DNS）可以在 `DNS Settings` 中选择 `Use Custom DNS Servers` 或在配置文件中将 `dns-server` 中的 `system` 移除。

不建议使用海外 DNS，它们在大陆会存在返回结果慢，丢包，解析不准确等问题，也会影响规则匹配的准确性和效率，如 `1.1.1.1` 解析哔哩哔哩返回的是香港的 CDN，这时候再指定个规则直连没什么意义。

如果对 [DNS 泄露](https://en.wikipedia.org/wiki/DNS_leak) 存在顾虑，推荐自建加密 DNS 服务器或直接使用全局代理模式。

如果特意使用海外 DNS 或不知道所用 DNS 是否为海外，遇到应走直连的国内域名走了代理或不知道为什么走了代理，可自行在 `DNS Results` 中查找策略为代理的相关域名，就可以看到是哪个 DNS 返回了什么结果。

注意：由于 [Surge 默认使用 Fake IP 处理 DNS 请求](https://manual.nssurge.com/book/understanding-surge/cn/#%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1%E6%8E%A5%E7%AE%A1%E6%96%B9%E6%B3%95-2)，有代理规则的域名并不会有本地 DNS 结果（在远端节点解析），如果已有代理规则的域名出现在 `DNS Results`，说明有不带 `no-resolve` 参数的 IP 规则位于 DOMAIN 规则之前。

非必要（必要指被 ISP 抢答 DNS 请求等场景）不建议使用加密 DNS，常规 DNS 服务器效率更高，在网络变化后恢复连接更快。

### 规则

### 规则列表

 Ruleset | Description | Policy
 ---- | ----------- | ----------------
Block.list |广告屏蔽与隐私保护 | REJECT
Streaming.list | 国际流媒体服务 | PROXY
Global.list | 国际网络分流 | PROXY
Apple.list | Apple 服务 | DIRECT
China.list | 国内直连分流 | DIRECT
GEOIP,CN | DNS 解析分流 | DIRECT
LAN | 本地局域网 | DIRECT
FINAL | 默认策略 | PROXY

> FINAL 走代理时建议增加 `dns-failed` 参数，此时当连接域名 DNS 解析失败且未匹配到上述所有规则时，将会被直接转发至代理服务器，否则连接将会被直接中断。（如果 FINAL 走直连则该参数无效）

#### 关于广告拦截

这里提供了一个简单的 Block.list，此外，除非明确需求否则不建议使用其他广告屏蔽规则。

1. 过多的规则会降低代理工具的运行效率，互联网上一些程序生成的屏蔽规则，实际上会包含很多已经失效和大多数使用场景下很难匹配到的条目，却会影响使用体验，导致连接延时大幅增加，极端情况下可能会导致程序崩溃。如有必要只建议在桌面端使用。

2. 对于移动端 App，屏蔽隐私与广告域名的意义不大。基本只能解决一些小厂或者个人开发者调用第三方跟踪器或者广告服务的问题。  
国内外大厂 App（如 YouTube 和 Bilibili）的跟踪器与广告等内容，全部同正常请求一同收发，更有pdd这种设备信息加密后随着 HTTPDNS 一同发送的。这些场景下，在 DNS 层进行屏蔽没有作用。

3. 对于浏览器，使用插件（如 AdBlock Plus）是更为高效的选择，其支持更强大和多样化的屏蔽模式，代理工具相比之下效果欠佳。

#### 关于 Apple 分流

默认 Apple 分流为直连（中国大陆内被动或主动屏蔽的部分苹果域名已经加入 Global.list，所以 Apple.list 放在 Global.list 之后），所以如果想完全走代理可以将 Apple.list 修改为代理策略并调整顺序至 Global.list 之前。
