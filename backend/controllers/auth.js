const bcrypt = require('bcrypt');
const _ = require('lodash');
const registerValidator = require('../validators/register');
const loginValidator = require('../validators/login');
const User = require('../models/user');
const { dbSecretFields } = require('../configs')

exports.register = async (req, res) => {
	const validationResult = registerValidator(req.body);

	if(!validationResult) {
		return res.status(400).json({message: validationResult});
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 12);

	const userName = await User.findOne({ name: req.body.name });

	if(userName) {
		return res.status(409).json({ message: 'Account exists.' });
	}

	const user = await User.create({...req.body, password: hashedPassword});

	req.session.userId = user.id;

	return res.status(201).json({ message: 'you are registered successfully.', user: _.omit(user.toObject(), dbSecretFields) });
}

exports.login = async (req, res) => {
	const validationResult = loginValidator(req.body);

	if(!validationResult) {
		return res.status(400).json({ message: validationResult });
	}

	const user = await User.findOne({ name: req.body.name });

	if(!user) {
		return res.status(404).json({ message: 'name does not exists.' });
	}

	const isPasswordCorrect = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if(!isPasswordCorrect) {
		return res.status(401).json({ message: 'password is not correct.' });
	}

	req.session.userId = user._id;

	res.json({ message: 'you are successfully logged in.', user: _.omit(user.toObject(), dbSecretFields)});
}

exports.loginRequired = async (req, res, next) => {
	if(!req.session || !req.session.userId) {
		return res.status(403).json({ message: 'you should login for access to this route.' });
	}
	req.user = await User.findById(req.session.userId);

	if(!req.user) {
		return res.status(403).json({ message: 'this user id is no longer exists.' });
	}
	next();
}

exports.logout = (req, res) => {
	delete req.session.userId;
	res.json({ message: 'you are successfully logged out.' });
}

exports.profile = (req, res) => {
	res.json({ user: _.omit(req.user.toObject(), dbSecretFields)});
}