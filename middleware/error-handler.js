const errorHandler = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(error.status || 500).json({
      status: 'Error',
      message: `${error.name}: ${error.message}`
    })
  }
  const status = error.status || 500
  const message = error.message || 'Internal Server Error'
  res.status(status).json({
    status: 'Error',
    message
  })
}

module.exports = { errorHandler }