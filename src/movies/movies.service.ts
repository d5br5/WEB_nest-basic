import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity.ts';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOne(id: string): boolean {
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
    let movie = this.getOne(id);
    if (!movie) return false;

    movie = { ...movie, ...updateData, updatedAt: new Date() };
    this.movies = this.movies.map((m) => (m.id === +id ? movie : m));
    return movie;
  }

  searchByYear(year: string) {
    return this.movies.filter((movie) => movie.year === +year);
  }
}
