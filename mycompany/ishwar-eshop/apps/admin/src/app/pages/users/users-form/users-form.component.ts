import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@ishwar-eshop/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html'
})

export class UsersFormComponent implements OnInit{

  form! : FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries = [];
  imageDisplay: string | ArrayBuffer;

  constructor(private fb: FormBuilder, 
              private userService: UsersService,
              private toaster: MessageService,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._initForm()
    this._getCountries()
    // check edit mode
    this._checkEditMode()
  }
  
  private _initForm() {
    // initialize the form
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      city: [''],
      zip: [''],
      country: [''],
      isAdmin: [false]
    })    
  }

  // get countries list for dropdown
  private _getCountries() {
    this.countries = this.userService.getCountries()
  }


  // edit mode function
  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.editMode = true
        this.currentUserId = params.id
        this.userService.getUser(this.currentUserId).subscribe(user => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['city'].setValue(user.city);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['country'].setValue(user.country);
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        })
      }
    })
  }

  // form controls getter
  get userForm() {
    return this.form.controls
  }

  // image upload
  onImageUpload(event) {
    const file = event.target.files[0]

    if(file) {
      this.form.patchValue({ image: file})
      this.form.get('image').updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }

      fileReader.readAsDataURL(file)
    }
  }
  
  
  // Save Product
  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) return;

    const user: User = {
      id: this.currentUserId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      password: this.form.controls['password'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      city: this.form.controls['city'].value,
      zip: this.form.controls['zip'].value,
      country: this.form.controls['country'].value,
      isAdmin: this.form.controls['isAdmin'].value
    }

    if(this.editMode) {
      this._updateUser(user)
    } else {
      this._addUser(user)
    }
  }

  private _addUser(user: User) {
    this.userService.createUser(user).subscribe(
      (response: User) => {
        this.toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`User ${response.name} is created!`
          }
        );
        timer(2000).toPromise().then(() => {
          this.location.back()
        })
      },
      (error) => {
        this.toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  private _updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        this.toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`User ${response.name} is updated!`
          }
        );
        timer(2000).toPromise().then(() => {
          this.location.back()
        })
      },
      (error) => {
        this.toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  // back button 
  goBack() {
    this.location.back()
  }

}