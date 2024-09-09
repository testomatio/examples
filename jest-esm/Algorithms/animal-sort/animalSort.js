const animalSort = animals => {
  const animalComparator = (animalOne, animalTwo) => {
    if (animalOne.numberOfLegs === animalTwo.numberOfLegs) {
      return animalOne.name > animalTwo.name ? 1 : -1;
    }
    return animalOne.numberOfLegs - animalTwo.numberOfLegs;
  };

  return animals.sort(animalComparator);
};

export default animalSort;
