import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    try {
      let response = await fetch(`https://v1.nocodeapi.com/hima/spotify/cqdJWSGqPSveoXhN/search?q=${keyword}&type=track`);
      let data = await response.json();
      console.log(data.tracks.items);
      setTracks(data.tracks.items);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Music App
          </a>
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
      <div className="row">
      </div>
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-lg-3 col-md-6 py-3">
              <div className="card">
                <img
                  src={track.album.images[0].url}
                  className="card-img-top"
                  alt={track.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  <p className="card-text">
                    <span>Aritist: {track.album.artists[0].name}</span><br />
                    <span>Release: {track.album.release_date}</span>
                  </p>
                  <audio src={track.preview_url} controls className='w-100'></audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
