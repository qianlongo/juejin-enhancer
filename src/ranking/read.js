const XLSX = require('xlsx')
const workbook = XLSX.readFile('./read.xlsx')
const articalClassifyInfo = workbook.Sheets

for (sheetName in articalClassifyInfo) {
  console.log(sheetName, XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
}

