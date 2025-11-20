import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { GamesComponent } from './components/games/games';
import { BooksComponent } from './components/books/books';
import { SocialsComponent } from './components/socials/socials';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'socials', component: SocialsComponent },
  { path: '**', redirectTo: '' }
];