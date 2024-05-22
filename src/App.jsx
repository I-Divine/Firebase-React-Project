import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState();
  const [isAwardWinning, setIsAwardWinning] = useState(false);
  const getMovieList = async () => {
    // READ DATA FROM DB
    // SET MOVIELIST STATE
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      setMovieList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: movieTitle,
        Release: releaseDate,
        AwardWinning: isAwardWinning,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      Hello
      <Auth />
      <div>
        <div>
          <h3>Add new movie</h3>
          <input
            type="text"
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Title..."
          />
          <br />
          <input
            type="number"
            onChange={(e) => setReleaseDate(Number(e.target.value))}
            placeholder="Release Date"
          />
          <br />
          <label htmlFor="isAwardWinning">
            Award winning ?{" "}
            <input
              type="checkbox"
              value={isAwardWinning}
              onChange={(e) => setIsAwardWinning(e.target.checked)}
              id="isAwardWinning"
            />
          </label>
          <br />
          <button onClick={submitMovie}>Add Movie</button>
        </div>
        {movieList.map((movie) => (
          <div>
            <h2>Title : {movie.Title}</h2>
            <p>Release date : {movie.Release}</p>
            <p>Award winning : {movie.AwardWinning ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
