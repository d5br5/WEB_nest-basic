import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity.ts';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  create(movieData) {
    const newMovie = {
      id: (this.movies[this.movies.length - 1]?.id || 0) + 1,
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  searchByYear(year: string) {
    return this.movies.filter((movie) => movie.year === +year);
  }
}
