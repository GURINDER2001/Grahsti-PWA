import { useState, useRef } from 'react';
// @ts-ignore
const useSwipeActions = (fetchData) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const startPosition = useRef(0);
  const deltaX = useRef(0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchData(); // Fetch data using your API call
    setIsRefreshing(false);
    return data;
  };

  const handleTouchStart = (e:any) => {
    startPosition.current = e.touches[0].clientX;
    deltaX.current = 0;
  };

  const handleTouchMove = async (e:any) => {
    const swipeMovement = e.touches[0].clientX - startPosition.current;
    deltaX.current= swipeMovement;

  if(!isSwiped && swipeMovement < -30 ){
    setIsSwiped(true)
  }
  
  };

  const handleTouchEnd = async (e:any) => {
    console.log(deltaX.current);
    setIsSwiped(false)
    if (deltaX.current < -100 && !isRefreshing) { // Adjust threshold as needed
        const data = await handleRefresh();
        // Update your component state with the fetched data
      }
  }

  return { isRefreshing,isSwiped, handleTouchStart, handleTouchMove,handleTouchEnd };
};

export default useSwipeActions;