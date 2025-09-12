declare namespace API {
  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type LoginUserVO = {
    username?: string;
    useravatar?: string;
    userprofile?: string;
  };

  type UserLoginRequest = {
    useraccount?: string;
    userpassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };
}
