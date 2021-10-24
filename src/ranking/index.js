const axios = require('axios')
const randomUa = require('random-ua')
const XLSX = require('xlsx')
// 获取文章分类简讯
const getClassifyInfo = () => {
  const workbook = XLSX.readFile('./star.xlsx')
  // console.log(workbook.Sheets)
  return workbook.Sheets
}

// 获取单篇文章详情
const getArticalDetail = async (articleId) => {
  return new Promise(async (resolve) => {
    let resultData = null

    try {
      const result = await axios({
        method: 'post',
        url: 'https://api.juejin.cn/content_api/v1/article/detail',
        data: {
          article_id: articleId
        },
        headers: {
          origin: 'https://juejin.cn',
          referer: 'https://juejin.cn/',
          'user-agent': randomUa.generate()
        }
      })

      const { article_info, author_user_info } = result.data.data || {}
      // 浏览量 点赞数 评论数 收藏数
      const { view_count: viewCount, digg_count: diggCount, comment_count: commentCount, collect_count: collectCount } = article_info || {}
      // 用户名 userId
      const { user_name: userName, user_id: userId } = author_user_info || {}

      resultData = {
        userName,
        userId,
        viewCount,
        diggCount,
        commentCount,
        collectCount
      }
    } catch (err) {
      console.log('获取单篇文章出错，文章ID是：', articleId)
    }

    resolve(resultData)
  })
}

const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

const init = async () => {
  const articalClassifyInfo = getClassifyInfo()
  const wb = XLSX.utils.book_new()
  let count = 0
  let startTime = Date.now()

  for (sheetName in articalClassifyInfo) {
    const sheetContent = XLSX.utils.sheet_to_json(articalClassifyInfo[sheetName])
    // const sheetContent = [ XLSX.utils.sheet_to_json(articalClassifyInfo[sheetName])[0] ]

    let sheetJson = {}

    for (classifyInfo of sheetContent) {
      const articalLink = classifyInfo['链接']
      const articalId = articalLink.match(/\/(\d+)/)[1]

      count += 1

      await sleep(Math.random())

      console.log(`-------开始获取${articalLink}文章数据, 第${count}篇文章`)

      const articalDetail = await getArticalDetail(articalId)

      console.log(`-------获取${articalLink}文章数据结束`)
      const name1 = '用户名'
      const name2 = '投稿数'
      const name3 = '阅读量'
      const name4 = '点赞数'
      const name5 = '评论数'
      const name6 = '收藏数'

      const originArticaldetail = sheetJson[articalDetail.userId] || {}

      sheetJson[articalDetail.userId] = {
        [ name1 ]: articalDetail.userName,
        [ name2 ]: (originArticaldetail[ name2 ] || 0) + 1,
        [ name3 ]: (originArticaldetail[ name3 ] || 0) + articalDetail.viewCount,
        [ name4 ]: (originArticaldetail[ name4 ] || 0) + articalDetail.diggCount,
        [ name5 ]: (originArticaldetail[ name5 ] || 0) + articalDetail.commentCount,
        [ name6 ]: (originArticaldetail[ name6 ] || 0) + articalDetail.collectCount,
      }
    }
    const ws = XLSX.utils.json_to_sheet(Object.values(sheetJson))

    XLSX.utils.book_append_sheet(wb, ws, sheetName)
  }

  let endTime = Date.now()

  console.log('整体耗时', endTime - startTime)

  XLSX.writeFile(wb, 'out.xlsx')
}

init()

// console.log()
// getAllArticalDetail()

// console.log(Scheduler)
// const XLSX = require('xlsx')

// const workbook = XLSX.readFile('./star.xlsx')




// // console.log(XLSX.utils.sheet_to_json(workbook))
// // console.log(XLSX.utils.sheet_to_json(workbook.Sheets['前端']))
// console.log(Object.keys(workbook.Sheets))

// // const ws_data = [
// //   ['id','name','role','path','state'],
// //   [1,'首页','user','/',1],
// //   [2,'全部文章','user','/article',1],
// // ]

// const ws = XLSX.utils.json_to_sheet([
//   {
//     '用户名': '前端胖头鱼',
//     '浏览量': 10000
//   }
// ])

// let wb = XLSX.utils.book_new('前端')
// XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
// XLSX.writeFile(wb, 'out.xlsx')




