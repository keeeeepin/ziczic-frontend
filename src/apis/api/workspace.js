import { defaultApiInstance } from "@apis/utils"

export const postCreateWorkspace = async (workspaceInfo) => {
    return await defaultApiInstance.post("/workspace", workspaceInfo);
};

export const getWorkspaceList = async () => {
    return await defaultApiInstance.get("/workspace");
}

