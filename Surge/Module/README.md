# Surge Modules

模块是一组用于覆盖当前配置文件的设置。[官方文档](https://manual.nssurge.com/others/module.html)

## Summary

这里列出了一些由我编写或者从互联网收集的 Surge Modules，请按照提示使用。

Module | Description |
---- | ----------- |
[IP Info Panel](#ip-info-panel) | 显示特定策略组的节点名称及IP信息
[Sub Info Panel](#sub-info-panel) | 提取并显示订阅链接中附带的流量信息
[Server Info Panel](#server-info-panel) | 实时显示远程服务器的系统信息
[iRingo](https://github.com/VirgilClyne/iRingo) | 解锁完整的 Apple 功能和集成服务

## Tutorial

这里是模块使用方法的说明。

### 关于 argument

Surge 提供方法使脚本可以读取配置文件中附带的参数信息，按照提示编辑可以帮助你控制模块行为。

注意：直接从URL安装模块无法改动 argument，如有需求请复制到本地修改。

示例：在`argument=`后添加参数，参数名和参数值用 `=` 号连接，多个参数之间用 `&` 分隔

```ini
[Script]
test = type=generic,timeout=10,script-path=test.js,script-update-interval=0,argument=set1=true&set2=normal
```

### IP Info Panel

显示特定策略组的节点名称及IP信息。感谢 [fishingworld](https://github.com/fishingworld)

参数 "group" 指定面板显示哪个策略组的代理 IP 信息，默认值为 "Proxy"。如果你的代理策略组名称不是 "Proxy" 或需要修改可选参数，请将模块复制到本地修改。否则可以直接从以下 URL 导入并安装。

```
https://raw.githubusercontent.com/Sestea/Profiles/master/Surge/Module/IP_Info_Panel.sgmodule
```

#### 可选参数

 - `icon` : 自定义图标，内容为任意有效的 SF Symbol Name，如 `bolt.horizontal.circle.fill`
 - `color` : 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：`color=#007aff`

### Sub Info Panel

提取并显示订阅链接中附带的流量信息。感谢 [mieqq](https://github.com/mieqq)

本模块不能直接导入到 Surge 使用，请复制到本地修改。需要先将带有流量信息的订阅链接 encode，然后替换 `url=` 后的 [URL Encode 后的订阅链接] 字样。

```
https://raw.githubusercontent.com/Sestea/Profiles/master/Surge/Module/Sub_Info_Panel.sgmodule
```

#### 可选参数
 - `reset_day` : 填写流量每月重置的日期，如8号就写 `reset_day=8`，不加该参数不会显示流量重置信息
 - `expire` : 订阅链接不带 expire 信息的，可以手动传入 expire 参数，如 `expire=2022-02-01`，注意一定要按照 yyyy-MM-dd 的格式。不希望显示到期信息也可以添加 `expire=false` 取消显示
 - `title` : 自定义标题
 - `icon` : 自定义图标，内容为任意有效的 SF Symbol Name，如 `cloud.fill`
 - `color` : 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：`color=#007aff`

### Server Info Panel

实时显示远程服务器的系统信息。

这个模块由一个在远端服务器运行的 Python 程序和在 Surge 运行的 JavaScript 脚本组成。前者会在远端服务器上持续运行一个特定端口号（默认为 7122）的 HTTP 服务器，当收到请求时会返回一个 json 字典，其中包含了一些有用的系统信息。后者会定时或在用户手动触发时向指定服务器发送请求，接受到响应后会整理系统信息并显示在 Surge 策略组页面的面板上。

注意：由于程序需要在公网暴露端口才能正常收发HTTP请求，由此带来的安全问题请您慎重考虑。在境外的服务器上使用该服务时，最好也通过境外代理服务器转发请求。

#### 1.在服务端安装依赖

运行该脚本需要 Python3 环境，pip 包管理工具 和 Python 模块 `http.server` `socketserver` `json` `time` `psutil`

一般 Linux/Windows/macOS 等系统都可以运行。这里以 Debian 11 为例（使用 `sudo` 或者确保在 root 下执行以下命令）
：

```sh
apt install python3 python3-pip
pip install http.server socketserver json time psutil
```

#### 2.下载并运行脚本
```sh
wget https://github.com/Sestea/Profiles/blob/master/Surge/Source/server-info.py /usr/local/share/server-info/server-info.py
python3 /usr/local/share/server-info/server-info.py
```

若出现 `Serving at port 7122` 字样，代表程序已经成功启动并在7122端口监听，你可以试着用浏览器访问 `服务器IP地址：7122`，你应该得到一个json数组，其中包含了所需的系统信息。

这时已经确定脚本可以成功运行，按下 `Ctrl + C` 退出程序。

#### 3. 配置 Systemd 服务

复制并执行以下命令，创建 Systemd 服务文件，运行服务和配置开机自启。

```sh
cat << EOF > /etc/systemd/system/server-info.service
[Unit]
Description=Server Info Monitor

[Service]
Type=simple
ExecStart=/usr/bin/python3 /usr/share/server-info/server-info.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF
systemctl enable --now server-info.service
```

使用 `systemctl status server-info.service` 查看程序是否成功运行。

#### 4.配置 Surge Module
将以下 URL 中的内容复制到本地模块修改：
```
https://raw.githubusercontent.com/Sestea/Profiles/master/Surge/Module/Server_Info_Panel.sgmodule
```
找到 `server=http://localhost:7122` 字样，将 `http://localhost:7122` 替换为你的服务器的IP和端口号，如 `http://1.1.1.1:7122`（注意不要省略 http://）

保存退出，检查面板是否成功显示系统信息。

#### 可选参数
 - `title` : 自定义标题
 - `icon` : 自定义图标，内容为任意有效的 SF Symbol Name，如 `ray`
 - `color` : 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：`color=#39c5bb`
