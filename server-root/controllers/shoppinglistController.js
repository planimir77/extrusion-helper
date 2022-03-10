const { shoppinglistModel, userModel, itemModel } = require('../models');

function getShoppinglists(req, res, next) {
    const { _id: userId } = req.user;

    shoppinglistModel.find()
        .where({ userId: userId })
        .populate(['userId', 'items'])
        .then(shoppinglists => res.json(shoppinglists))
        .catch(next);
}

function getShoppinglist(req, res, next) {
    const id = req.params.id;
    //const { _id: userId } = req.user;

    shoppinglistModel.findById(id)
        //.where({ subscribers: { $in: userId } })
        .populate('items')
        .then(shoppinglist => {
            res.json(shoppinglist);
        })
        .catch(next);
}

function getFavoriteShoppinglist(req, res, next) {
    const { _id: userId } = req.user;

    shoppinglistModel.findOne()
        .where({ userId: userId, favorite: true })
        .then(shoppinglist => {
            res.json(shoppinglist);
        })
        .catch(next);
}

function addItem(shoppinglistId, itemId, userId) {
    return shoppinglistModel.findByIdAndUpdate({ _id: shoppinglistId }, { $addToSet: { items: itemId } })
        .then(shoppinglist => {
            return Promise.all([
                userModel.findOneAndUpdate({ _id: userId }, { $addToSet: { shoppinglists: shoppinglist._id } }),
                itemModel.findOneAndUpdate({ _id: itemId }, { $addToSet: { shoppinglists: shoppinglistId } })
            ])
        })
}

function addShoppinglistItem(req, res, next) {
    const { shoppinglistId, itemId } = req.body;
    const { _id: userId } = req.user;

    addItem(shoppinglistId, itemId, userId)
        .then(([_, shoppinglist]) => res.status(200).json(shoppinglist))
        .catch(next);
}

function newShoppinglist(shoppinglistName, userId) {
    return shoppinglistModel.create({ shoppinglistName, userId, subscribers: [userId] })
        .then(shoppinglist => {
            return Promise.all([
                userModel.findOneAndUpdate({ _id: userId }, { $addToSet: { shoppinglists: shoppinglist._id } }),
                shoppinglist
            ])
        })
}

function createShoppinglist(req, res, next) {
    const { shoppinglistName } = req.body;
    const { _id: userId } = req.user;

    newShoppinglist(shoppinglistName, userId)
        .then(([_, shoppinglist]) => res.status(200).json(shoppinglist))
        .catch(next);
}

function updateShoppinglist(req, res, next) {
    const shoppinglistId = req.params.Id;
    const { _id: userId } = req.user;
    const { newName } = req.body;
    shoppinglistModel.findByIdAndUpdate({ _id: shoppinglistId, userId: userId}, { shoppinglistName: newName }, { new: true })
        .then(updatedShoppinglist => {
            res.status(200).json(updatedShoppinglist)
        })
        .catch(next);
}

function deleteShoppinglist(req, res, next) {
    const { id } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        shoppinglistModel.findOneAndDelete({ _id: id, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { shoppinglists: id } }),
        itemModel.findOneAndUpdate({}, { $pull: { shoppinglists: id } }),
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

function deleteShoppinglistItem(req, res, next) {
    const { shoppinglistId, itemId } = req.body;
    const { _id: userId } = req.user;

    Promise.all([
        shoppinglistModel.findOneAndUpdate({ _id: shoppinglistId }, { $pull: { items: itemId } }),
        itemModel.findOneAndUpdate({ _id: itemId }, { $pull: { shoppinglists: shoppinglistId } })
    ])
        .then(([shoppinglist, item]) => {
            if (shoppinglist) {
                res.status(200).json(item);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
function shoppinglistNotFavorite(req, res, next) {
    const { shoppinglistId, itemId } = req.body;
    const { _id: userId } = req.user;


    shoppinglistModel.findOneAndUpdate({ _id: shoppinglistId, userId: userId, }, { favorite: false }, { new: true })
        .populate('items')
        .then(shoppinglist => {
            if (shoppinglist) {
                res.status(200).json(shoppinglist);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
function shoppinglistFavorite(req, res, next) {
    const { shoppinglistId } = req.body;
    const { _id: userId } = req.user;

    shoppinglistModel.findOneAndUpdate({ _id: shoppinglistId, userId: userId, }, { favorite: true }, { new: true })
        .populate('items')
        .then(shoppinglist => {
            if (shoppinglist) {
                res.status(200).json(shoppinglist);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    shoppinglistFavorite,
    shoppinglistNotFavorite,
    getFavoriteShoppinglist,
    addShoppinglistItem,
    getShoppinglists,
    createShoppinglist,
    getShoppinglist,
    updateShoppinglist,
    deleteShoppinglist,
    deleteShoppinglistItem,
}
