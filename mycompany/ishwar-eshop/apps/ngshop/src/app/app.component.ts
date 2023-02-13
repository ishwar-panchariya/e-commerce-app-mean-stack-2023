import { Component, OnInit } from '@angular/core';
import { UsersService } from '@ishwar-eshop/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ngshop';

  constructor(private userService: UsersService) {
    userService.initAppSession()
  }

  ngOnInit(): void {
      
  }

}
