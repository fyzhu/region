import fs from 'fs'
import Pinyin from "./pinyin.js";
const pinyin = new Pinyin({ checkPolyphone: false, charCase: 0 });

const filenames = fs.readdirSync('./json');
console.log(filenames);
const all = [];

(async function() {
  for (const file of filenames) {
    const json = await import('./json/' + file, { assert: { type: "json" } })
    console.log(file, file.endsWith('.js'));
    all.push(...json.default.map(item => {
      if (item.name) {
        return item.name.substring(0, 1)
      } else {
        return item.substring(0, 1)
      }
    }))
    
    console.log(all.length);
  }

  
  const result = new Set(all)
  const poly = []
  const obj = {}
  console.log(result.size);
  // console.log(JSON.stringify([...result]));
  [...result].map(item => {
    const arr =  pinyin.getCamelChars(item)
    if (arr.length > 1) {
      poly.push(item)
      console.log(item, arr);
      
    } else {
      console.log(item, arr);
      obj[item] = arr
    }
  })
  console.log('多音字', poly.length);
  fs.writeFileSync('./result/obj.json', JSON.stringify(obj))
})();

// let o = {}
// anhui.forEach(({name}) => {
//   if (o[name] ) {
//     console.log(name);
//   } else {
//     o[name] = 1
//   }
// })
// const set = new Set(anhui.map(item => item.name.substring(0, 1)))
// const set = new Set(anhui.map(item => item.substring(0, 1)))
// console.log(set.size);
