function randomStr(len) {
  let base = 'qwertyuiopasdfghjklzxcvbnm0987654321QWERTYUIOPASDFGHJKLZXCVBNM'
  let result = ''
  for (let i = 0; i < len; i++) {
    result += base[Math.floor(Math.random() * base.length)]
  }
  return result
}

randomStr(32)

console.log("e61463f8efa94090b1f366cccfbbb444".length)