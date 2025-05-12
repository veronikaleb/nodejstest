const userModel = require('../models/user');
const fighterModel = require('../models/fighter');

const isValidEmail = (email) => /^\w+@gmail\.com$/.test(email);
const isValidPhone = (phone) => /^\+380\d{9}$/.test(phone);
const isValidPassword = (password) => typeof password === 'string' && password.length >= 4;

function validate(model, creation = true) {
  return (req, res, next) => {
    const data = req.body;
    const keys = Object.keys(model).filter(k => k !== 'id');

    if (creation && keys.some(key => !(key in data))) {
      return res.sendError(`${creation ? 'Creation' : 'Update'} requires all fields except 'id'`, 400);
    }

    if (!creation && !Object.keys(data).some(key => keys.includes(key))) {
      return res.sendError('Update requires at least one valid field', 400);
    }

    if ('id' in data) return res.sendError("Field 'id' is not allowed", 400);

    for (const key in data) {
      if (!model.hasOwnProperty(key)) return res.sendError(`Unknown property '${key}'`, 400);
      const value = data[key];
      if (key === 'email' && !isValidEmail(value)) return res.sendError('Invalid email format', 400);
      if (key === 'phone' && !isValidPhone(value)) return res.sendError('Invalid phone format', 400);
      if (key === 'password' && !isValidPassword(value)) return res.sendError('Password must be at least 4 characters', 400);
    }

    next();
  };
}

module.exports = {
  validateUser: validate(userModel, true),
  validateUserUpdate: validate(userModel, false),
  validateFighter: validate(fighterModel, true),
  validateFighterUpdate: validate(fighterModel, false),
};
