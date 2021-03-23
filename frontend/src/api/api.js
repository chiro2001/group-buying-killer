// function api() {
//   let url_base = '/api/v1/';
//   async function test() {
//     return await ((await fetch(url_base)).json());
//   }
// }

class API {
  constructor(props) {
    this.url_base = 'http://localhost:8000/api/v1/'
  }
  async test() {
    return await ((await fetch(this.url_base)).json());
  }
};

async function test() {
  return await ((await fetch('http://localhost:8000/api/v1/')).json());
}

export { API, test };