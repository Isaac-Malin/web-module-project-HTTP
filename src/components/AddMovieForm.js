import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovieForm = (props) => {

  const { setMovies } = props
  const  navigate  = useNavigate()

  const [newMovie, setNewMovie ] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
  }

  const handlePost = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/movies', newMovie)
      .then(res => {
        setMovies(res.data)
        navigate("/movies")
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handlePost}>
          <div className="modal-header">
            <h4 className="modal-title">Add New Movie</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={newMovie.title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={newMovie.director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={newMovie.genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={newMovie.metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={newMovie.description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save"/>
            <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>);
}

export default AddMovieForm