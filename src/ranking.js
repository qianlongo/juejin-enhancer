const axios = require('axios')

axios({
  method: 'post',
  url: 'https://api.juejin.cn/content_api/v1/article/detail',
  data: {
    article_id: '7021672733213720613'
  }
}).then((res) => {
  console.log(res.data)
}).catch((err) => {
  console.log('err', err)
})