# Ruleset Summary

## 说明

这里的规则集文件均为 Surge RULE-SET 格式，如下所示：

```ini
# Example
DOMAIN,store.steampowered.com
DOMAIN-SUFFIX,apple.com
DOMAIN-KEYWORD,google
IP-CIDR,185.76.151.0/24,no-resolve
IP-CIDR6,2001:b28:f23d::/48,no-resolve
```

这种格式可被大多数分流代理软件直接解析。（Clash 需在 `rule-providers` 中指定 `format: text`，Quantumult X 需开启资源解析器）


### 规则类型

这里仅列出该项目中所出现的规则类型，更多类型请查看 [Surge 手册
](https://manual.nssurge.com/rule.html)

#### 域名规则

当连接的目标主机名符合时，匹配该规则。

- `DOMAIN`：严格匹配某域名。

- `DOMAIN-SUFFIX`：匹配某域名及其子域名，如 DOMAIN-SUFFIX,apple.com 可以匹配 apple.com 和 www.apple.com，但是不会匹配 anapple.com。

- `DOMAIN-KEYWORD`：简单的字符串搜索，只要域名包含子串就会匹配。

#### IP 规则

当连接的目标主机的 IP 地址符合时，匹配该规则。当目标主机名为一个域名时，将会触发 DNS 解析获取 IP 地址进行判断。

包含 `IP-CIDR`，`IP-CIDR6`，`GEOIP` 三种类型。

IP 类型规则有一个专有的参数 `no-resolve`，如果一个 IP 规则带有该参数，那么:

1. 如果目标主机名是一个域名，那么将跳过该规则，不触发 DNS 解析。 

2. 如果目标主机名是 IP 地址，按规则进行判断。 

3. 如果目标主机名是一个域名，且先前出现的 IP 规则已经触发了 DNS 解析获得了 IP 地址，那么使用该 IP 地址进行判断。

该远程规则集中的所有 IP 规则均已添加此参数。

## Remote Rules 远程规则集列表

这里列出了该项目中所有的远程规则集，数字即规则条数。

### Block.list `REJECT`

这里提供了一个简单的 Block.list，此外，除非明确需求否则不建议使用其他广告屏蔽规则。

1. 过多的规则会降低代理工具的运行效率，互联网上一些程序生成的屏蔽规则，实际上会包含很多已经失效和大多数使用场景下很难匹配到的条目，却会影响使用体验，导致连接延时大幅增加，极端情况下可能会导致程序崩溃。如有必要只建议在桌面端使用。

2. 对于移动端 App，屏蔽隐私与广告域名的意义不大。基本只能解决一些小厂或者个人开发者调用第三方跟踪器或者广告服务的问题。  
国内外大厂 App（如 YouTube 和 Bilibili）的跟踪器与广告等内容，全部同正常请求一同收发，更有pdd这种设备信息加密后随着 HTTPDNS 一同发送的。这些场景下，在 DNS 层进行屏蔽没有作用。

3. 对于浏览器，使用插件（如 AdBlock Plus）是更为高效的选择，其支持更强大和多样化的屏蔽模式，代理工具相比之下效果欠佳。


部分规则条目的来源在文件中有注释说明。

#### Advertising

简单的网页广告屏蔽，不过在实际使用中已足够有效。

#### Internet Service Providers Hijacking

防止网络服务商劫持连接到特定地址。

#### Malware

恶意软件相关网址的集合，如 Flash Player 中国特供版，由思杰马克丁代理的软件及 MacKeeper 等。

#### Privacy

屏蔽了一些常见的跟踪器和使用情况分析域名。

### Domestic.list  `DIRECT`

在中国大陆境内建议直连的网络服务。如 Microsoft CDN（包含 Windows Update 更新），游戏平台下载服务器和 Private Tracker 等。

### Streaming.list `PROXY`

常见国外流媒体服务的集合。

### Global.list `PROXY`

#### Essentials

常见的国际互联网服务以及一些中国大陆境内无法访问/被屏蔽的网站。

> 这里加入了 Steam 商店，社区和创意工坊的相关域名，配合其他规则使用可在游戏下载直连中国服务器的同时正常访问 Steam 的所有页面。

#### Region-Restricted Access Denied

中国大陆用户访问时，功能会受到限制的网络服务。

> 中国大陆境内被动或主动屏蔽的部分 Apple 服务子域名已加入，可恢复部分被屏蔽的功能（如 macOS 词典 Wikipedia 搜索）。Apple 设备配合 [iRingo](https://nsringo.github.io) 可更好的解锁完整的 Apple 功能和集成服务。

### Apple.list `DIRECT`

Apple 在国内建议直连的域名。

## Local Rules 本地规则列表

### GEOIP CN `DIRECT`

上述规则集不存在会触发未匹配域名 DNS 解析的 IP 规则。未匹配成功的主机名匹配到此条目时将会触发 DNS 解析，如果返回的结果为中国 IP 则会走直连策略，反之跳过此规则。

### LAN `DIRECT`

本地局域网地址。

```ini
DOMAIN-SUFFIX,local,DIRECT
IP-CIDR,127.0.0.0/8,DIRECT
IP-CIDR,172.16.0.0/12,DIRECT
IP-CIDR,192.168.0.0/16,DIRECT
IP-CIDR,10.0.0.0/8,DIRECT
IP-CIDR,17.0.0.0/8,DIRECT
IP-CIDR,100.64.0.0/10,DIRECT
IP-CIDR,224.0.0.0/4,DIRECT
IP-CIDR6,fe80::/10,DIRECT
```

### FINAL `PROXY`

最终规则，未被上述规则匹配的任何连接将会匹配它所对应的策略。

建议增加 `dns-failed` 参数，当连接域名进行规则匹配时若 DNS 解析失败，将会被直接转发至代理服务器，否则连接将会被直接中断。（此选项仅在与非 DIRECT 策略一起使用时才有意义）