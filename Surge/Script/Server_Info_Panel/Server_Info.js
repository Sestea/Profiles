;(async () => {
  let params = getParams($argument)
  $httpClient.get(params.server, function (error, response, data) {
    const jsonData = JSON.parse(data);
    $done({
      title: params.name || 'Server Info',
      content: `Uptime: ${formatUptime(jsonData.uptime)}\n` + `CPU: ${jsonData.cpu_usage}% | MEM: ${jsonData.mem_usage}%\n`+ `${bytesToSize(jsonData.bytes_sent)} ↑ ${bytesToSize(jsonData.bytes_recv)} ↓`,
      icon: params.icon || 'rays',
      'icon-color': params.color || '#39c5bb'
    });
  });
})();
        
function getParams(param) {
  return Object.fromEntries(
  $argument
    .split('&')
    .map((item) => item.split('='))
    .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function formatUptime(seconds) {
  var days = Math.floor(seconds / (3600 * 24));
  var hours = Math.floor((seconds % (3600 * 24)) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var result = '';
  if (days > 0) {
    result += days + ' day' + (days > 1 ? 's' : '') + ', ';
  }
  if (hours > 0) {
    result += hours + ' hour' + (hours > 1 ? 's' : '') + ' ';
  }
  if (minutes > 0 || result === '') {
    result += minutes + ' min' + (minutes > 1 ? 's' : '');
  }
  return result;
}

function bytesToSize(bytes) {
  if (bytes === 0) return '0B';
  let k = 1024;
  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}
