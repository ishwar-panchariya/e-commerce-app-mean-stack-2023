import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@ishwar-eshop/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: User[] = []
  endSubscription$: Subject<any> = new Subject();

  constructor(private userService: UsersService,
              private toaster: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {}

  ngOnInit() {
    this._getUsersList();  
  }

  ngOnDestroy() {
    this.endSubscription$.complete()
  }

  private _getUsersList() {
    this.userService.getUsers().pipe(takeUntil(this.endSubscription$)).subscribe((res) => {
      this.users = res
    })
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          (response) => {
            this._getUsersList()
            this.toaster.add({severity:'success', summary:'Success', detail: response.message });
          },
          (error) => {
            this.toaster.add({severity:'error', summary:'Error', detail: error.message });
          }
        )
      },

    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  getCountryName(countryKey: string) {
    if(countryKey) return this.userService.getCountry(countryKey)
  }
}
