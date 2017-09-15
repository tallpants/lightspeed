export default function(object, words) 
{
  let found = true;
  if('title' in object)
  {
    const sField = object['title'].toLowerCase();
    for(let word of words) 
    {
      found = found && sField.indexOf(word) >= 0;
    }

    if(found)
    {
      return true;
    }
  }

  found = true;
  if('url' in object)
  {
    const sField = object['url'].toLowerCase();
    for(let word of words) 
    {
      found = found && sField.indexOf(word) >= 0;
    }
  }
  
  return found;
}
