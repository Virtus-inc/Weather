const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  email: {
    type: 'string',
    min: 6,
    max: 20,
  },
  name: {
    type: 'string',
    min: 3,
    max: 20,
  },
  surname: {
    type: 'string',
    min: 3,
    max: 20,
  },
  password: {
    type: 'string',
  },
  $$strict: true,
}

const checker = v.compile(schema);

module.exports = checker;