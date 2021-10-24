const XLSX = require('xlsx')

const workbook = XLSX.readFile('./out.xlsx')
const articalClassifyInfo = workbook.Sheets

for (sheetName in articalClassifyInfo) {
  const sheetContent = XLSX.utils.sheet_to_json(articalClassifyInfo[sheetName])
  let sheetJson = {
    1: 0,
    2: 0,
    '3 ~ 4': 0,
    '5 ~ 10': 0,
    '10 ~ 20': 0,
    '20+': 0
  }
  const name1 = '投稿数'

  for (classifyInfo of sheetContent) {
    const articalCount = classifyInfo[ name1 ]
    
    if (articalCount === 1) {
      sheetJson[ 1 ] += 1
    } else if (articalCount === 2) {
      sheetJson[ 2 ] += 1
    } else if (articalCount >= 3 && articalCount <= 4) {
      sheetJson[ '3 ~ 4' ] += 1
    } else if (articalCount >= 5 && articalCount <= 10) {
      sheetJson[ '5 ~ 10' ] += 1
    } else if (articalCount >= 10 && articalCount <= 20) {
      sheetJson[ '10 ~ 20' ] += 1
    } else if (articalCount > 20) {
      sheetJson[ '20+' ] += 1
    }
  }

  console.log(sheetName, sheetJson)
}
