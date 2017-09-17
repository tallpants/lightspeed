export default function(object, words) {
  let found = true;

  if (object.hasOwnProperty('title')) {
    const sField = object['title'].toLowerCase();

    for (let word of words) {
      found = found && sField.indexOf(word) >= 0;
    }

    if (found) {
      return true;
    }
  }

  found = true;

  if (object.hasOwnProperty('url')) {
    const sField = object['url'].toLowerCase();

    for (let word of words) {
      found = found && sField.indexOf(word) >= 0;
    }
  }

  return found;
}
