const XLSX = require('xlsx')

const ws1Json = [
  {
    '姓名': '前端胖头鱼1',
    '年龄': 100
  },
  {
    '姓名': '前端胖头鱼1',
    '年龄': 1000
  },
]

const ws2Json = [
  {
    '姓名': '前端胖头鱼2',
    '年龄': 200
  },
  {
    '姓名': '前端胖头鱼2',
    '年龄': 2000
  },
]

const wb = XLSX.utils.book_new()
const ws1 = XLSX.utils.json_to_sheet(ws1Json)
const ws2 = XLSX.utils.json_to_sheet(ws2Json)

XLSX.utils.book_append_sheet(wb, ws1, '表格1')
XLSX.utils.book_append_sheet(wb, ws2, '表格2')


XLSX.writeFile(wb, './write.xlsx')
