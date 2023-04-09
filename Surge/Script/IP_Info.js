;(async () => {
  let params = getParams($argument)
  let proxy = await httpAPI('/v1/policy_groups');
  let allGroup = [];
  for (var key in proxy){
    allGroup.push(key)
  }
  let group = params.group || 'Proxy'
  let rootName = (await httpAPI('/v1/policy_groups/select?group_name='+encodeURIComponent(group)+'')).policy;
  while(allGroup.includes(rootName)==true){
    rootName = (await httpAPI('/v1/policy_groups/select?group_name='+encodeURIComponent(rootName)+'')).policy;
  }
  $httpClient.get('http://ip-api.com/json/?lang=en', function (error, response, data) {
    const jsonData = JSON.parse(data);
    $done({
      title: rootName,
      content: `${jsonData.country} - ${jsonData.city}\n`+ `${jsonData.as}\n` + `${jsonData.query}`,
      icon: params.icon || 'externaldrive.connected.to.line.below',
      'icon-color': params.color || '#9a7ff7'
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
