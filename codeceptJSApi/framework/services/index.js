const RegisterService = require('./register.service');

const apiProvider = () => {
  return {
    registerService: () => new RegisterService(),
  };
};
module.exports = apiProvider;
