const a = [{
    id: 1,
    x: 1
}, { id: 3, x: 2 }]
const b = [
    { id: 1, y: 1 }, { id: 2, y: 2 },{id:1,z:3}
]
const arr = a.reduce((acc, item) => {
    b.forEach(ele => {
        if (ele.id === item.id) {
            acc.push({ id: item.id, ...item, ...ele });
        }
    });
    return acc;
}, [])
console.log(arr);
