const { ListModel } = require('../models')
const { UserModel } = require('../models')

module.exports = {
  getLists: async (req, res) => {
    const id = req.params.id
    const ownersLists = await ListModel.find({ owner: id })
    const sharedLists = await ListModel.find({ members: { $in: id }})

    res.status(200).send({ ownersLists, sharedLists })
  },
  addList: async (req, res) => {
    const name = req.body.name
    const owner = req.body.ownerId
    const createdOn = new Date()

    const newList = await new ListModel({
      name,
      owner,
      createdOn
    })

    await newList.save(error => {
      if (error) res.status(400).send({ success: false, message: `Something went wrong: ${error}` })
      res.status(200).send({ success: true, message: 'List added successfully!' })
    })
  },
  getList: async (req, res) => {
    const id = req.params.id

    const list = await ListModel.findById(id)

    res.status(200).send(list)
  }
}
