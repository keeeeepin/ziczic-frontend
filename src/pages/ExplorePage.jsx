import React from 'react';
import ExploreBar from '../components/Explore/ExploreBar';
import ExploreContainer from '../components/Explore/ExploreContainer';

import { useEffect } from 'react';

const ExplorePage = ({ setSideBar }) => {
  useEffect(() => {
    console.log('Explore Page ... ');

    setSideBar(<ExploreBar />);
  }, []);

  return (
    <>
      <ExploreContainer />
    </>
  );
};

export default ExplorePage;
