import {fetchMovies, addMovie, deleteMovie, updateMovie} from '../services/moviesService'
import { useGenericMutation, useGenericDelete, useUpdateMutation } from './queryMutations'

export const useDeleteMovie = () => useGenericDelete((id) => deleteMovie(id), ['fetchData', 'movies'])
export const useAddMovies = () => useGenericMutation(addMovie, 'movies')
export const useEditMovie = () => useUpdateMutation((updatedMovie) => updateMovie(updatedMovie.id, updatedMovie), ['fetchData', 'movies']);