import React from 'react';

import ExploreSection from './ExploreSection';
import WorkspaceCardList from './WorkspaceCardList';

import { Box } from '@chakra-ui/react';

const ExploreContainer = () => {
  return (
    <>
      <Box flex width="100%" direction="column" alignItems="center">
        <ExploreSection />
        <WorkspaceCardList />
      </Box>
    </>
  );
};

export default ExploreContainer;
