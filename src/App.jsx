import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth } from "./config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
  // console.log(auth);
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
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  return (
    <>
      Hello
      <Auth />
      {auth.currentUser ? (
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
            <div key={movie.id}>
              <h2>Title : {movie.Title}</h2>
              <p>Release date : {movie.Release}</p>
              <p>Award winning : {movie.AwardWinning ? "Yes" : "No"}</p>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default App;
