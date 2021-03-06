const positionService = require('../service/position')

exports.getPosition = function (req, res) {
  let {
    searchVal = '',
    companyId = '',
    accountType = '',
    selectType = '',
    selectCity = '',
    selectTab = '',
    searchPosition = '',
    currentPage = 1,
    pageNum = 10
  } = req.query
  pageNum = +pageNum
  currentPage = +currentPage
  positionService.getPositionList(searchVal, companyId, accountType, selectType, selectCity, selectTab, searchPosition, currentPage, pageNum).then(data => {
    res.send({
      code: '200',
      data: {
        currentPage: data.currentPage,
        pageNum: data.pageNum,
        total: data.total,
        data: data.data
      }
    })
  }).catch(err => {
    res.send({
      code: '500',
      data: err.msg
    })
  })
}

exports.addPosition = function (req, res) {
  let data = req.body
  positionService.addPositionList(data).then(data => {
    res.send({
      code: '200',
      data: data
    })
  }).catch(err => {
    res.send({
      code: '500',
      data: err.msg
    })
  })
}

exports.getPositionDetail = function (req, res) {
  let { positionDetailId = '' } = req.query
  positionService.getPositionDetailList(positionDetailId).then(data => {
    res.send({
      code: '200',
      data: data
    })
  }).catch(err => {
    res.send({
      code: '500',
      data: err.msg
    })
  })
}