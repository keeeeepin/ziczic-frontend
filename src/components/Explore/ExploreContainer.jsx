import React from 'react';

import ExploreSection from './ExploreSection';
import WorkspaceCardList from './WorkspaceCardList';

import { Box } from '@chakra-ui/react';

const ExploreContainer = () => {
  return (
    <>
      <Box flex>
        <ExploreSection />
        <WorkspaceCardList />
      </Box>
    </>
  );
};

export default ExploreContainer;
