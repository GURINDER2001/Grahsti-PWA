import { useState, useRef } from 'react';
// @ts-ignore
const usePullToRefresh = (fetchData) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startPosition = useRef(0);
  const deltaY = useRef(0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchData(); // Fetch data using your API call
    setIsRefreshing(false);
    return data;
  };

  const handleTouchStart = (e) => {
    console.log(startPosition.current);
    startPosition.current = e.touches[0].clientY;
    deltaY.current = 0;
  };

  const handleTouchMove = async (e) => {
    console.log("touch y--",e.touches[0].clientY );
    console.log(deltaY.current);
    
    // const deltaY = e.touches[0].clientY - startPosition.current;
    deltaY.current = e.touches[0].clientY - startPosition.current;
  
  };

  const handleTouchEnd = async (e) => {
    console.log(deltaY.current);
    
    if (deltaY.current > 100 && !isRefreshing) { // Adjust threshold as needed
        const data = await handleRefresh();
        // Update your component state with the fetched data
      }
  }

  return { isRefreshing, handleTouchStart, handleTouchMove,handleTouchEnd };
};

export default usePullToRefresh;