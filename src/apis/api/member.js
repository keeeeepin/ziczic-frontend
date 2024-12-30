import { defaultApiInstance } from "@apis/utils"


export const postSignupMember = async (userInfo) => {
    return await defaultApiInstance.post("/member/signup", userInfo);
};

export const postLoginMember = async (userInfo) => {
    return await defaultApiInstance.post("/member/login", userInfo);
}