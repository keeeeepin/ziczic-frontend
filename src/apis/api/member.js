import { defaultApiInstance } from "@apis/utils"


export const postSignupMember = async (userInfo) => {
    return await defaultApiInstance.post("/member/register", userInfo);
};

export const postLoginMember = async (userInfo) => {
    return await defaultApiInstance.post("/member/login", userInfo);
}