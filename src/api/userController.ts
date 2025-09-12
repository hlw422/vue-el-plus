// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/test */
export async function userTest(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return request<string>("/user/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
