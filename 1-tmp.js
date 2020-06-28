const a = {
    t:1,
    test(x,y){
        console.log(this.t,x,y);
    }
}
const b = a.test;
a.test = function(x,y){
    b.call(this,x,y);
}
a.test(2,3);

const tmp = XMLHttpRequest.prototype.setRequestHeader;
XMLHttpRequest.prototype.setRequestHeader = function(key,...args){if(key!=="content-length"){return tmp.call(this,key,...args);}return this;};

    
// if (oSession.HostnameIs("ndea.99.com")){
//     oSession.oRequest.headers.Remove("Content-Length")
//     oSession.oRequest.headers.Add("Content-Length",19);
//  }