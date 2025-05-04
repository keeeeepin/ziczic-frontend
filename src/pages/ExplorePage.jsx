import React from 'react';
import ExploreBar from '../components/Explore/ExploreBar';
import ExploreContainer from '../components/Explore/ExploreContainer';

import { useEffect } from 'react';

import { Box } from '@chakra-ui/react';

const ExplorePage = ({ setSideBar }) => {
  useEffect(() => {
    console.log('Explore Page ... ');

    setSideBar(<ExploreBar />);
  }, []);

  return (
    <>
      <Box
        position="fixed"
        left="16rem"
        right="0" // 오른쪽 끝까지 확장
        top="0" // 상단부터
        bottom="0"
        overflowY="auto"
      >
        <ExploreContainer />
      </Box>
    </>
  );
};

export default ExplorePage;
