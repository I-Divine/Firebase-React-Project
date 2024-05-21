import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  useEffect(() => {
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
    getMovieList();
  }, []);

  return (
    <>
      Hello
      <Auth />
      <div>
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
