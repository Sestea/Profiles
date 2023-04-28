;(async () => {
  let params = getParams($argument)
  $httpClient.get(params.server, function (error, response, data) {
    const jsonData = JSON.parse(data);
    $done({
      title: params.name | 'Server Info',
      content: `Uptime: ${jsonData.uptime}\n` + `CPU: ${jsonData.cpu_usage}% | MEM: ${jsonData.mem_usage}%\n`+ `${bytesToSize(jsonData.bytes_sent)} ↑ ${bytesToSize(jsonData.bytes_recv)} ↓`,
      icon: params.icon || 'rays.system',
      'icon-color': params.color || '#39c5bb'
    });
  });
})();
    
function httpAPI(path = '', method = 'GET', body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => {
      resolve(result);
    });
  });
};
    
function getParams(param) {
  return Object.fromEntries(
  $argument
    .split('&')
    .map((item) => item.split('='))
    .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function bytesToSize(bytes) {
  if (bytes === 0) return '0B';
  let k = 1024;
  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}
