const Joi = require("joi");

class HttpError extends Error {
    constructor(msg = "服务器异常", errorCode = 10000, status = 400) {
      super();
      this.errorCode = errorCode;
      this.status = status;
      this.msg = msg;
    }
  };

const listValid = (data) => {
  const joiObject = Joi.object({
    page: Joi.number(),
    size: Joi.number(),
  });

  return joiObject.validateAsync(data);
}



const registerValidate = (data) => {
    const joiObject = Joi.object({
        title: Joi.string().trim(true).min(6).max(32).required().error(new HttpError("标题不合法", 10001, 400)),
        content: Joi.string().trim(true),
        userId: Joi.number(),
      //最低2位邮箱@后面的内容，例：@io
    //   email: Joi.string().email({ minDomainSegments: 2 })
    //     .required().external(isExistSameEmail, "是否存在相同邮箱")
    //     .error(new ValidateError("邮箱不合法！")),
      //password 密码必填 6-32位
    //   password1: Joi.string().trim(true).min(6).max(32).required()
    //     .error(new ValidateError("密码必须是1-32位！")),
    //   //二次检验密码
    //   password2: Joi.string().valid(Joi.ref("password1"))
    //     .error(new ValidateError("两次密码必须相同！")),
    //   //昵称 最低2位
    //   nickname: Joi.string().trim(true).pattern(new RegExp("^[^\\s]+$")).min(2)
    //     .error(new ValidateError("昵称长度最低2位且不能包含空格！")),
    });
  
    return joiObject.validateAsync(data);
  };
  
  
  
  module.exports = {
    registerValidate,
    listValid
  }