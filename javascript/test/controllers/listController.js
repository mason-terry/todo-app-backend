const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const { ListModel } = require('../../models')
const { listController } = require('../../controllers')
chai.use(chaiHttp)

describe('List controller tests', async () => {

  it('should create a list', async () => {
    chaiHttp('../../index.js').post('/lists').send({ name: 'Test List', owner: '1234', createdOn: new Date() }).end((err, res) => {
    })
  })
})