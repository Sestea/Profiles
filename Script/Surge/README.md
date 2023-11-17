# Surge Modules

模块是一组用于覆盖当前配置文件的设置。[官方文档](https://manual.nssurge.com/others/module.html)

## Summary

这里列出了一些由我编写或者从互联网收集的 Surge Modules，请按照提示使用。

Module | Description |
------ | ----------- |
[IP Info Panel](/Script/Surge/IP_Info_Panel/) | 显示特定策略组的节点名称及IP信息
[Sub Info Panel](/Script/Surge/Sub_Info_Panel/) | 提取并显示订阅链接中附带的流量信息
[Server Info Panel](/Script/Surge/Server_Info_Panel/) | 实时显示远程服务器的系统信息
[iRingo](https://github.com/VirgilClyne/iRingo) | 解锁完整的 Apple 功能和集成服务

## Tutorial

这里是模块使用方法的说明。

### 关于 argument

Surge 提供方法使脚本可以读取配置文件中附带的参数信息，按照提示编辑可以帮助你控制模块行为。

注意：直接从URL安装模块无法改动 argument，如有需求请复制到本地修改。

示例：在 `argument=` 后添加参数，参数名和参数值用 `=` 号连接，多个参数之间用 `&` 分隔

```ini
[Script]
test = type=generic,timeout=10,script-path=test.js,script-update-interval=0,argument=set1=true&set2=custom
```


