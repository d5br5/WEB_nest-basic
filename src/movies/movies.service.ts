import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity.ts';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    const newMovie = {
      id: (this.movies[this.movies.length - 1]?.id || 0) + 1,
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  searchByYear(year: string) {
    return this.movies.filter((movie) => movie.year === +year);
  }
}
