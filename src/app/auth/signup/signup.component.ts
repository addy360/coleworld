import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'


@Component({
	templateUrl:'./signup.component.html',
	styleUrls:['./signup.component.css']
})
export class SignupComponent{
	loading:boolean = false
	constructor(private authService:AuthService, private router:Router){}
	onSubmit(data: NgForm){
		this.loading = true
		const {email, password} = data.value
		if(email === '' || password === '') return
		this.authService.createUser(email,password)
		.subscribe(data=>{
			this.router.navigate(['/'])
		},
		err=>{
			this.loading=false
			console.log(err.error.message)
			this.router.navigate(['/register'])
		})
	}
}