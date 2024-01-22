import { useState, useEffect } from 'preact/hooks'
import './app.css'
import { FaCartArrowDown  } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { CiCirclePlus,CiCircleMinus } from "react-icons/ci";
import NewsletterModal from './NewsLetterModal';

export function App() {
  const [movie, setMovie] = useState('')
  const [container, setContainer] = useState([])
  const [movieId, setMovieId] = useState('')
  const [clickedMovieId, setClickedMovieId] = useState(null);


  const fetchMovies = async() => {
    const url = `https://advanced-movie-search.p.rapidapi.com/search/movie?query=+${movie}&page=1`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '49c5216aebmsh15579da26f2b8e2p11214ajsn75d54dec1697',
        'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
            }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(">>>>",result);
      setContainer(result.results)
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   fetchMovies();
  // }, [movie]);
  const handleAddToCart = (movieId) => {
    setClickedMovieId(movieId === clickedMovieId ? null : movieId);
  }
  const submitHandler = (e) => {
    e.preventDefault()
     fetchMovies();
  }

  return (
    <div className='app-container'>
      <FaCartArrowDown className='cart-icon'/>
      <div>
      
        <h1 className='title'>Rent-a-Movie</h1>
        <form onSubmit={submitHandler}>
           <input 
              type="text" 
              value={movie} 
              className="movieString"
              placeholder='type a movie'
              onChange={(e)=>{setMovie(e.target.value)}}/>
           {/* <button type='submit'> Submit </button> */}
        </form>
        <div className='movie-grid'>
        {container.map((item) => {
        const isClicked = item.id === clickedMovieId;
              {console.log(item.id)}
          return (
            <div className='movie-container'> 
                <div className='poster-container'>
                <img src={item.poster_path} alt="movie-poster" style="width:200px; height:200px"/>
                {isClicked ? (
                    <>
                      <CiCircleMinus
                        className='minus-icon'
                        onClick={() => handleAddToCart(item.id)}
                      />
                      <p className='item-count'>1</p>
                      <CiCirclePlus
                        className='plus-icon'
                        onClick={() => handleAddToCart(item.id)}
                      />
                    </>
                  ) : (
                    <CiCirclePlus
                      className='plus-icon'
                      onClick={() => handleAddToCart(item.id)}
                    />
                  )}
                </div>
                <p style={{color: 'white'}}> 
                  {item.original_title}
                </p>

                {/* <NewsletterModal
                isOpen={true}
                // onSubmit={handleFormSubmit}
                // onClose={handleCloseNewsletterModal} 
                />                 */}
            </div>

          )
        })}
        </div>
        </div>
    </div>
  )
}
