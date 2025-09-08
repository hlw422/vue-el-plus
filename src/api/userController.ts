// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

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
