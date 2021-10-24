class Scheduler {
  constructor (maxCount = 10) {
    this.queue = []
    this.maxCount = maxCount
    this.runCount = 0
  }
  // promiseCreator执行后返回的是一个Promise
  add(promiseCreator) {
    // 小于等于2，直接执行
    this.queue.push(promiseCreator)
    // 每次添加的时候都会尝试去执行任务
    this.runQueue()
  }

  runQueue () {
    // 队列中还有任务才会被执行
    if (this.queue.length && this.runCount < this.maxCount) {
      // 执行先加入队列的函数
      const promiseCreator = this.queue.shift()
      // 开始执行任务 计数+1    
      this.runCount += 1
      // 假设任务都执行成功，当然也可以做一下catch
      promiseCreator().then(() => {
        // 任务执行完毕，计数-1
        this.runCount -= 1
        // 尝试进行下一次任务
        this.runQueue()
      })
    }
  }
}

module.exports = Scheduler