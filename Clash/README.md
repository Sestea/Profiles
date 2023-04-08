# Clash

引用本项目中的远程规则需要 `Rule Providers` 支持，使用 [Clash Premium](https://github.com/Dreamacro/clash/releases/tag/premium) 或 [Clash.Meta](https://github.com/MetaCubeX/Clash.Meta) 以获得此特性。

## 资源
[项目主页](https://github.com/Dreamacro/clash) [社区Wiki](https://lancellc.gitbook.io/clash)

## 说明

### 快速上手

将 [示例配置](https://raw.githubusercontent.com/Sestea/Profiles/master/Clash/config.yaml) 复制到代码编辑器内。

> Clash 配置文件为 yaml 格式，请使用有自动缩进和语法高亮的代码编辑器（如 Visual Studio Code）以避免格式错误。 

寻找如下字段：

```yaml
subscribe:
    type: http
    url: "url"
    interval: 43200
    path: ./proxyset/subscribe.yaml
    health-check:
      enable: true
      interval: 300
      # lazy: true
      url: 'http://cp.cloudflare.com/generate_204'
```

将 `url:` 后引号中的内容替换为你的订阅链接，保存文件。然后自行导入到你的 clash 客户端，等待远程资源更新完毕后即可使用。

### DNS

Clash 的 DNS 配置较为复杂，详情请参考文档。
