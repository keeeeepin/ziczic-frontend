import { defaultApiInstance } from '../utils';

export const postCreateChannel = async (channelInfo) => {
  return await defaultApiInstance.post('/channel', channelInfo);
};

export const getChannelList = async (workspaceId) => {
  const resp = await defaultApiInstance.get(`/channel?workspaceId=${workspaceId}`);
  return resp.data;
};
