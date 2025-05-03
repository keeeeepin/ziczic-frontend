import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../apis/queryKeys';

import { getAllWorkspaceList } from '../../apis/api/workspace';
import WorkspaceCard from './WorkspaceCard';

import { Box, SimpleGrid } from '@chakra-ui/react';
// queryClient

// 모든 workspace 리스트 조회 API

// 사용자가 이미 속한 x -> 디스코드에서는 속한것도 그냥 보여주넹..

// 디스코드 : card에 보여주는 정보
// - ws이름
// - 해당 ws의 멤버 수
// - ws  미리보기 이미지
// - 간단한 설명
// 현재 card로 보여줄수 있는 정보
// - ws이름
// - ws생성 일자
// - ws에 속한 멤버 수

const WorkspaceCardList = () => {
  const { data: allWorkspaces } = useQuery({
    queryKey: QUERY_KEYS.ALL_WORKSPACES,
    queryFn: getAllWorkspaceList,
    select: (resp) => {
      console.log(resp.data[0]);
      return resp.data || [];
    },
  });

  return (
    <>
      <Box flex gridColumn="4" gap="10px" p={5}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="20px">
          {allWorkspaces?.map((ws) => (
            <WorkspaceCard id={ws.id} workspaceName={ws.workspaceName} createdAt={ws.createdAt} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default WorkspaceCardList;
