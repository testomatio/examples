const canPlaceFlowers = (flowerbed, flowerCount) => {
  let prevElement = 0;
  for (let element of flowerbed) {
    if (element === 0 && prevElement === 0) {
      element = 1;
      flowerCount -= 1;
    } else if (element === 1 && prevElement === 1) {
      flowerCount += 1;
    }

    prevElement = element;
  }

  return flowerCount <= 0;
};

export default canPlaceFlowers;
