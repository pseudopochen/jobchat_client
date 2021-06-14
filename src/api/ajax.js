import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let p;
    if (type === "GET") {
      console.log('axios get')
      p = axios.get(url, { params: data });
    } else {
      p = axios.post(url, data);
    }

    p.then((result) => {
      resolve(result.data);
    }).catch((e) => {
      console.log(e.msg);
      //reject(e)
    });
  });
}
