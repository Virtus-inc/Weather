const bcrypt = require('bcrypt');
const _ = require('lodash');

const User = require('../models/user');
const File = require('../models/file');
const registerValidator = require('../validators/register');
const { dbSecretFields } = require('../configs')

exports.patchUser = async (req, res) => {
    const id = req.params.id;
    delete req.body._id;

	const validationResult = registerValidator(req.body);

	if(!validationResult) {
		return res.status(400).json({ message: validationResult });
	}

    const userInDb = await User.findById(id);

    if(!userInDb) {
		return res.status(404).json({ message: 'User not exists.' });
	}

    const userWithSameName = await User.findOne({ _id: { $ne: id }, name: req.body.name });

	if(userWithSameName) {
		return res.status(407).json({ message: 'UserName exists.' });
	}

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

	const user = await User.updateOne({ _id: id }, { ...req.body, password: hashedPassword });

	return res.status(200).json({ message: `You updated ${req.body.name} user profile.` });
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    if(id === req.session.userId) {
        delete req.session.userId;
    }
    
	res.status(200).json({ message: 'You are delete this user.' });
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Account does not exist.' });
        }

        const userResponse = _.omit(user.toObject(), dbSecretFields);

        userResponse.files = await File.find({ ownerId: id }) || [];

        res.json({ user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};