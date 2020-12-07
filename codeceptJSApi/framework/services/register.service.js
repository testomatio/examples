const { I } = inject();

const RegisterService = function () {
    this.signup = async function (params) {
        const r = await I.sendPostRequest('/api/register', params);
        return r;
    };
};

module.exports = RegisterService;
