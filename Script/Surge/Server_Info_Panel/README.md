## Server Info Panel

实时显示远程服务器的系统信息。

这个模块由一个在远端服务器运行的 Python 程序和在 Surge 运行的 JavaScript 脚本组成。前者会在远端服务器上持续运行一个特定端口号（默认为 7122）的 HTTP 服务器，当收到请求时会返回一个 json 字典，其中包含了一些有用的系统信息。后者会定时或在用户手动触发时向指定服务器发送请求，接受到响应后会整理系统信息并显示在 Surge 策略组页面的面板上。

注意：由于程序需要在公网暴露端口才能正常收发HTTP请求，由此带来的安全问题请您慎重考虑。在境外的服务器上使用该服务时，最好也通过境外代理服务器转发请求。

### 1.在服务端安装依赖

运行该脚本需要 Python3 环境，pip 包管理工具 和 Python 模块 `http.server` `socketserver` `json` `time` `psutil`

一般 Linux/Windows/macOS 等系统都可以运行。这里以 Debian 11 为例（使用 `sudo` 或者确保在 root 下执行以下命令）
：

```sh
apt install python3 python3-pip
pip install http.server socketserver json time psutil
```

### 2.下载并运行脚本
```sh
wget https://raw.githubusercontent.com/Sestea/Profiles/beta/Script/Surge/Server_Info_Panel/server-info.py /usr/local/share/server-info/server-info.py
python3 /usr/local/share/server-info/server-info.py
```

若出现 `Serving at port 7122` 字样，代表程序已经成功启动并在7122端口监听，你可以试着用浏览器访问 `服务器IP地址：7122`，你应该得到一个json数组，其中包含了所需的系统信息。

这时已经确定脚本可以成功运行，按下 `Ctrl + C` 退出程序。

### 3. 配置 Systemd 服务

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

### 4.配置 Surge Module

将以下内容复制到本地模块修改：

```ini
#!name=Server Info Panel
#!desc=Display remote server information.

[Script]
Server_Info = type=generic,timeout=1000,script-path=https://raw.githubusercontent.com/Sestea/Profiles/beta/Script/Surge/Server_Info_Panel/Server_Info.js,argument=server=http://[ADDRESS]:[PORT]

[Panel]
Server_Info_Panel = script-name=Server_Info,update-interval=600
```

找到 `http://[ADDRESS]:[PORT]`，将对应字段替换为服务器的IP和端口号，如 `http://127.0.0.1:7122`

保存退出，检查面板是否成功显示系统信息。

### 可选参数

 - `title` : 自定义标题
 - `icon` : 自定义图标，内容为任意有效的 SF Symbol Name，如 `ray`
 - `color` : 当使用 icon 字段时，可传入 color 字段控制图标颜色，字段内容为颜色的 HEX 编码。如：`color=#39c5bb`
