import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-favourites-page",
  templateUrl: "./favourites-page.component.html",
  styleUrls: ["./favourites-page.component.scss"],
})
export class FavouritesPageComponent implements OnInit {
  favorites$ = new BehaviorSubject<any>([]);
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const fav = user.favorites
    this.favorites$.next(fav);
  }
}
