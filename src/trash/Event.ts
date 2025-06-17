export default function stringifyEvent(e) {
  const obj = {
    boundingClient: e.target.getBoundingClientRect()
  };
  for (let k in e) {
    obj[k] = e[k];
  }
  return JSON.parse(JSON.stringify(obj, (k, v) => {
    if (v instanceof Node) return 'Node';
    if (v instanceof Window) return 'Window';
    return v;
  }, ' '));
}