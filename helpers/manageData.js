const fs = require('fs');
const archivo = './data/data.json';

const saveData = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
}

const readData = (data) => {
  if (!fs.existsSync(archivo)) {
    return null
  }
  const res = fs.readFileSync(archivo, { encoding: 'utf-8' })
  if (res) {
    return JSON.parse(res)
  } else {
    return []
  }
}
module.exports = {
  saveData,
  readData
}