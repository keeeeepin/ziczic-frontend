import { defaultApiInstance } from '@apis/utils';

export const postCreateWorkspace = async (workspaceInfo) => {
  return await defaultApiInstance.post('/workspace', workspaceInfo);
};

// export const postCreateWorkspace = async (workspaceId, workspaceInfo) => {
//   return await defaultApiInstance.post(`/workspaces/${workspaceId}/member`, workspaceInfo);
// };

export const getWorkspaceList = async () => {
  return await defaultApiInstance.get('/workspaces');
};
