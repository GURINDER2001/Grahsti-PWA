import { useState, useRef } from 'react';
// @ts-ignore
const usePullToRefresh = (fetchData) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startPosition = useRef(0);
  const deltaY = useRef(0);

  const handleDataRefresh = async () => {
    setFetchingData(true);
    const data = await fetchData(); // Fetch data using your API call
    setFetchingData(false);
    return data;
  };

  const handleTouchStart = (e:any) => {
    console.log(startPosition.current);
    setIsRefreshing(true);
    startPosition.current = e.touches[0].clientY;
    deltaY.current = 0;
  };

  const handleTouchMove = async (e:any) => {
    console.log("touch y--",e.touches[0].clientY );
    console.log(deltaY.current);
    
    // const deltaY = e.touches[0].clientY - startPosition.current;
    deltaY.current = e.touches[0].clientY - startPosition.current;
  
  };

  const handleTouchEnd = async (e:any) => {
    console.log(deltaY.current);
    setIsRefreshing(false);
    if (deltaY.current > 100 && !fetchingData) { // Adjust threshold as needed
        const data = await handleDataRefresh();
        // Update your component state with the fetched data
      }
  }

  return { isRefreshing, fetchingData, handleTouchStart, handleTouchMove,handleTouchEnd };
};

export default usePullToRefresh;