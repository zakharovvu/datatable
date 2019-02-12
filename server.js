export default function getPhones(path) {
    return fetch(path).then( (response) => response.json(), ); 
  }