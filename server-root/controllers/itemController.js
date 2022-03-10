const { userModel, shoppinglistModel, itemModel } = require('../models');

function newItem(itemName, userId, shoppinglistId) {
    return itemModel.create({ itemName, userId, shoppinglists: [shoppinglistId] })
        .then(item => {
            return Promise.all([
                userModel.findOneAndUpdate({ _id: userId }, { $addToSet: { shoppinglists: shoppinglistId } }),
                shoppinglistModel.findByIdAndUpdate({ _id: shoppinglistId }, { $addToSet: { items: item._id } }, { new: true }),
                item
            ])
        })
}
function createItem(req, res, next) {
    const { _id: userId } = req.user;
    const { shoppinglistId } = req.body;
    const { itemName } = req.body;

    newItem(itemName, userId, shoppinglistId)
        .then(([_, updatedShoppinglist, item]) => {
            console.log(item.itemName);
            res.status(200).json(item);
        })
        .catch(next);
}

function getItem(req, res, next) {
    const { id } = req.params;
    itemModel.findOne({ _id: id },)
        .populate('shoppinglists')
        .then(item => {
            res.status(200).json(item)
        })
        .catch(next);
}

function getItemByName(req, res, next) {
    const { itemName } = req.params;
    itemModel.findOne({ itemName: itemName },)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {

                res.status(204).json();
            }
        })
        .catch(next);
}


function updateItem(itemId, shoppinglistId) {
    return itemModel.updateOne({ _id: itemId }, { $addToSet: { subscribers: shoppinglistId } })
        .then(item => {
            return Promise.all([
                shoppinglistModel.findByIdAndUpdate({ _id: shoppinglistId }, { $addToSet: { items: item._id } }),
                item
            ])
        })
}

function subscribe(req, res, next) {
    const { itemId, shoppinglistId } = req.body;

    itemModel.findOneAndUpdate({ _id: itemId, shoppinglists: {$in: shoppinglistId} }, { $addToSet: { subscribers: shoppinglistId } }, {new: true})
        .then(item => {
            return res.status(200).json(item)
        })
        .catch(next);
}

function removeItemSubscribers(req, res, next) {
    const { itemId, shoppinglistId } = req.body;

    itemModel.findByIdAndUpdate({ _id: itemId }, { $pull: { subscribers: shoppinglistId } }, {new: true})
        .then(item => res.status(200).json(item))
        .catch(next);
}

function unsubscribe(req, res, next) {
    const { itemId, shoppinglistId } = req.body;

    itemModel.findOneAndUpdate({ _id: itemId, shoppinglists: {$in: shoppinglistId}, subscribers: { $in: shoppinglistId} }, { $pull: { subscribers: shoppinglistId } }, {new: true})
        .then(item => {   
            return res.status(200).json(item);
        })
        .catch(next);
}

function editItem(req, res, next) {
    const { itemId } = req.params;
    const { itemName } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the item, the item will not be updated
    itemModel.findOneAndUpdate({ _id: itemId, userId }, { itemName: itemName }, { new: true })
        .then(updatedItem => {
            if (updatedItem) {
                res.status(200).json(updatedItem);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteItem(req, res, next) {
    const { itemId, shoppinglistId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        itemModel.findOneAndDelete({ _id: itemId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { items: itemId } }),
        shoppinglistModel.findOneAndUpdate({ _id: shoppinglistId }, { $pull: { items: itemId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { itemId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    itemModel.updateOne({ _id: itemId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    subscribe,
    unsubscribe,
    getItem,
    newItem,
    createItem,
    getItemByName,
    editItem,
    deleteItem,
    like,

}
