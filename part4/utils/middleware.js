const jwtExtractor = (req, res, next) => {
  console.log('middleware')
  const authorization = req.header('Authorization')
  const hasHeader = authorization && authorization.toLowerCase().startsWith('bearer ')
  req.token = hasHeader ? authorization.substring(7) : null
  next()
}

module.exports = {
  jwtExtractor
}