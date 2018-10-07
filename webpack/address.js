import os from 'os';

let net = os.networkInterfaces(),
    currentIp;

Object.keys(net).forEach(ifname => {
  let alias = 0;
  net[ifname].forEach(iface => {
    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    if ('IPv4' !== iface.family || iface.internal !== false) return
    currentIp = iface.address;
    ++alias;
  });
});

export default {
  ip: currentIp,
  port: 3000
}