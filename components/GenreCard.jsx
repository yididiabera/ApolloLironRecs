const notSelectedClass =
  "px-3 py-2 flex justify-center items-center rounded-full bg-black cursor-pointer transition-color duration-300";

const selectedClass =
  "px-3 py-2 flex justify-center items-center rounded-full cursor-pointer bg-green-500  transition-color duration-300";

const GenreCard = ({ genreName, isClicked, handleIsClicked }) => {
  if (isClicked)
    return (
      <div className={notSelectedClass} onClick={handleIsClicked}>
        <p>{genreName}</p>
      </div>
    );

  return (
    <div className={selectedClass} onClick={handleIsClicked}>
      <p>{genreName}</p>
    </div>
  );
};

export default GenreCard;
