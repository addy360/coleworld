import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { AuthService } from '../auth.service'


@Component({
	templateUrl:'./signup.component.html',
	styleUrls:['./signup.component.css']
})
export class SignupComponent{
	loading:boolean = false
	constructor(private authService:AuthService){}
	onSubmit(data: NgForm){
		this.loading = true
		const {email, password} = data.value
		if(email === '' || password === '') return
		this.authService.createUser(email,password)
	}
}