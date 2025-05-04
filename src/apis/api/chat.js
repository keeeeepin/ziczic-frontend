import { defaultApiInstance } from '@apis/utils';

export const getChatHistoryList = async (workspaceId, channelId) => {
  const resp = await defaultApiInstance.get(`/${workspaceId}/${channelId}/chatHistory`);

  console.log('resp : ', resp);
  return resp.data;
};

// @GetMapping("/{workspaceId}/{channelId}/chatHistory")
// public ResponseEntity<List<Chat>> getChatMessages(@RequestBody GetChatHistoryReq req) {
