## Sub Info Panel

提取并显示订阅链接中附带的流量信息。感谢 [mieqq](https://github.com/mieqq)

本模块不能直接导入到 Surge 使用，请复制到本地修改。需要先将带有流量信息的订阅链接 encode，然后替换 `url=` 后的 `[SUBLINK]` 字样。

```ini
#!name=Sub Info Panel
#!desc=Show subscription information for proxy providers

[Script]
Sub_Info = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/Sestea/Profiles/beta/Script/Surge/Sub_Info_Panel/Sub_Info.js,script-update-interval=0,argument=url=[SUBLINK]

[Panel]
Sub_info_Panel = script-name=Sub_Info,update-interval=600
```

### 可选参数

 - `reset_day` : 填写流量每月重置的日期，如8号就写 `reset_day=8`，不加该参数不会显示流量重置信息
 - `expire` : 订阅链接不带 expire 信息的，可以手动传入 expire 参数，如 `expire=2022-02-01`，注意一定要按照 yyyy-MM-dd 的格式。不希望显示到期信息也可以添加 `expire=false` 取消显示
 - `title` : 自定义标题
 - `icon` : 自定义图标，内容为任意有效的 SF Symbol Name，如 `cloud.fill`
 - `color` : 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：`color=#007aff`
