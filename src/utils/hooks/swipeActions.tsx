import { useState, useRef } from 'react';
// @ts-ignore
const useSwipeActions = (fetchData) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startPosition = useRef(0);
  const deltaX = useRef(0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchData(); // Fetch data using your API call
    setIsRefreshing(false);
    return data;
  };

  const handleTouchStart = (e) => {
    console.log(startPosition.current);
    startPosition.current = e.touches[0].clientX;
    deltaX.current = 0;
  };

  const handleTouchMove = async (e) => {
    console.log("touch y--",e.touches[0].clientX );
    console.log(deltaX.current);
    
    // const deltaY = e.touches[0].clientY - startPosition.current;
    deltaX.current = e.touches[0].clientX - startPosition.current;
  
  };

  const handleTouchEnd = async (e) => {
    console.log(deltaX.current);
    
    if (deltaX.current > 100 && !isRefreshing) { // Adjust threshold as needed
        const data = await handleRefresh();
        // Update your component state with the fetched data
      }
  }

  return { isRefreshing, handleTouchStart, handleTouchMove,handleTouchEnd };
};

export default useSwipeActions;