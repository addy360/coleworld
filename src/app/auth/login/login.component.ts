import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';

@Component({
	templateUrl:'./login.component.html',
	styleUrls:['./login.component.css']
})
export class LoginComponent{
	loading:boolean = false
	constructor( private authservice:AuthService, private router:Router ){}
	onSubmit(data: NgForm){
		this.loading = true
		if (data.invalid) return
		const { email, password } = data.value
		this.authservice.loginUser(email,password)
		.subscribe(data=>{
			const { token } = data
			this.authservice.setToken(token) 
			this.authservice.authStatusListener.next(true)
			this.router.navigate(['/'])
		},
		err=>{
			this.loading = false
		})

	}
}