export default function(object, string) {
  const words = string.toLowerCase().split(' ');
  let status = { title: true, url: true };

  for (let field of ['title', 'url']) {
    if (field in object) {
      for (let word of words) {
        status[field] =
          status[field] && object[field].toLowerCase().includes(word);
      }
    }
  }

  return status.title || status.url;
}
