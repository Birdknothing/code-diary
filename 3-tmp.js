const wt = new Promise(res => {
    setTimeout(() => { res('hi'); }, 1000)
});

wt.then(console.log)
console.log("un believable");