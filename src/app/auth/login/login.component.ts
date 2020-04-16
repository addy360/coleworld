import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
@Component({
	templateUrl:'./login.component.html',
	styleUrls:['./login.component.css']
})
export class LoginComponent{
	loading:boolean = false
	constructor( private authservice:AuthService ){}
	onSubmit(data: NgForm){
		this.loading = true
		if (data.invalid) return
		const { email, password } = data.value
		this.authservice.loginUser(email,password)

	}
}