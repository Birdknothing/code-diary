const sp = require("superagent");
// sp
//   .post(`http://3dcp.101.com/manager.php?c=resourcepage&a=bindToCategory`)
//   .set('Referer', 'http://3dcp.101.com/manager.php')
//   .set('Cookie', 'UM_distinctid=175f9ea4607368-02a2850b8416aa-c781f38-232800-175f9ea4608a1c; _ga=GA1.2.455932457.1608112332; edbox_edbox_args=eyJMYW5ndWFnZSI6bnVsbCwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0In0%3D; PHPSESSID=a83fcd3d1c8ae3d3ede1f03849d80c0b; uc_access_token=7F938B205F876FC3763650B474DA13152FB59E22F5FCB78402C06FA226081230D123B4C957A86EEA794F411D7F7BE6DF; uc_mac_key=ytx1fGjezP; ebook_callback_url=http://ebook-cn.101.com/; ebook_args=eyJCb29rSWQiOiIiLCJMYW5ndWFnZSI6IlNpbXBsaWZpZWRDaGluZXNlIiwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0IiwiQXBwS2V5IjoiIn0=; edbox_callback_url=http%3A%2F%2F192.168.244.133%3A8081%2F%23%2F')
//   .field("resource_id","e8d197b1-461c-492c-b176-d1aaf2227dcb")
//   .field("project_id","85")
//   .field("category_id[0][]","8721e3cd-e812-a9f4-90b3-9bffe6eb77e6")
//   .field("category_id[0][]","f89164fe-5813-aec2-ea8a-f0ce5addd322")
//   .end((err, res) => {
//     // Calling the end function will send the request
//     console.log("res",res.text);
    
//   });


sp
  .post(`http://3dcp.101.com/manager.php?c=resourcepage&a=search`)
  .set('Referer', 'http://3dcp.101.com/manager.php')
  .set('Cookie', 'UM_distinctid=175f9ea4607368-02a2850b8416aa-c781f38-232800-175f9ea4608a1c; _ga=GA1.2.455932457.1608112332; edbox_edbox_args=eyJMYW5ndWFnZSI6bnVsbCwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0In0%3D; PHPSESSID=a83fcd3d1c8ae3d3ede1f03849d80c0b; uc_access_token=7F938B205F876FC3763650B474DA13152FB59E22F5FCB78402C06FA226081230D123B4C957A86EEA794F411D7F7BE6DF; uc_mac_key=ytx1fGjezP; ebook_callback_url=http://ebook-cn.101.com/; ebook_args=eyJCb29rSWQiOiIiLCJMYW5ndWFnZSI6IlNpbXBsaWZpZWRDaGluZXNlIiwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0IiwiQXBwS2V5IjoiIn0=; edbox_callback_url=http%3A%2F%2F192.168.244.133%3A8081%2F%23%2F')
//   .field("search[id]","589c636a-a419-4a36-94a1-f4bff029a4b1")
// unavailable
  .field("search[id]","e8d197b1-461c-492c-b176-d1aaf2227dcb")
//   .field("search[project_guid]","c4ea8116-7e41-aa4e-479a-82e121a71065")
  .field("page","1")
  .field("type","unbind")
  .end((err, res) => {
    // Calling the end function will send the request
    console.log("text",res.text);
    console.log("body",res.body);
    
  });

//   curl 'http://3dcp.101.com/manager.php?c=resourcepage&a=bindToCategory' \
//   -H 'Connection: keep-alive' \
//   -H 'Pragma: no-cache' \
//   -H 'Cache-Control: no-cache' \
//   -H 'Accept: application/json, text/javascript, */*; q=0.01' \
//   -H 'X-Requested-With: XMLHttpRequest' \
//   -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' \
//   -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
//   -H 'Origin: http://3dcp.101.com' \
//   -H 'Referer: http://3dcp.101.com/manager.php' \
//   -H 'Accept-Language: zh-CN,zh;q=0.9' \
//   -H 'Cookie: UM_distinctid=175f9ea4607368-02a2850b8416aa-c781f38-232800-175f9ea4608a1c; _ga=GA1.2.455932457.1608112332; edbox_edbox_args=eyJMYW5ndWFnZSI6bnVsbCwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0In0%3D; PHPSESSID=a83fcd3d1c8ae3d3ede1f03849d80c0b; uc_access_token=7F938B205F876FC3763650B474DA13152FB59E22F5FCB78402C06FA226081230D123B4C957A86EEA794F411D7F7BE6DF; uc_mac_key=ytx1fGjezP; ebook_callback_url=http://ebook-cn.101.com/; ebook_args=eyJCb29rSWQiOiIiLCJMYW5ndWFnZSI6IlNpbXBsaWZpZWRDaGluZXNlIiwiQXJlYSI6IkNITiIsIkNoYW5uZWwiOiJEZWZhdWx0IiwiQXBwS2V5IjoiIn0=; edbox_callback_url=http%3A%2F%2F192.168.244.133%3A8081%2F%23%2F' \
//   --data-raw 'resource_id=e8d197b1-461c-492c-b176-d1aaf2227dcb&project_id=85&category_id%5B0%5D%5B%5D=1321c82f-94a8-b866-176c-5e4dc61347a8&category_id%5B0%5D%5B%5D=71179320-22e2-4a4a-8cd9-065226146f04&category_id%5B1%5D%5B%5D=81317d99-3e6b-87da-1fec-d1e895512d2d&category_id%5B1%5D%5B%5D=59dd2f6b-bff4-be14-0879-993cdb760c56&category_id%5B2%5D%5B%5D=b022353a-c85c-d932-3b22-1b40dd8f9998&category_id%5B2%5D%5B%5D=1738c55f-d390-4890-0819-ea02e81ee118&category_id%5B3%5D%5B%5D=ced107d2-f87d-1af1-a114-50f4a93c5b57' \
//   --compressed \
//   --insecure