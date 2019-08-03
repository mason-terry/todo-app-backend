const { ListModel } = require('../models')
const { UserModel } = require('../models')

module.exports = {
  getLists: async (req, res) => {
    const lists = await ListModel.find({})

    res.status(200).send(lists)
  },
  addList: async (req, res) => {
    const name = req.body.name
    const owner = req.body.owner
    const members = [req.body.owner]
    const createdOn = new Date()

    const newList = await new ListModel({
      name,
      owner,
      members,
      createdOn
    })

    await newList.save(error => {
      if (error) res.status(400).send({ success: false, message: `Something went wrong: ${error}` })
      res.status(200).send({ success: true, message: 'List added successfully!' })
    })

    await UserModel.findByIdAndUpdate(owner.id, {
      $push: { lists: { name: newList.name, id: newList._id } }
    })
  },
  getUserLists: async (req, res) => {
    const id = req.params.id

    const lists = await ListModel.find({ 'members.id': { $in: [id] } })
    console.log('lists', lists)

    res.status(200).send(lists)
  }
}
