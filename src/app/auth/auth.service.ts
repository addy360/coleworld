import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable({
	providedIn:'root'
})
export class AuthService {
	private token:string=''
	private authStatusListener = new Subject<boolean>()
	constructor(private httpClient:HttpClient, private router:Router){}
	getToken(){
		return this.token
	}
	getAuthStatus(){
		return this.authStatusListener.asObservable()
	}
	createUser(email:String, password:String){
		this.httpClient.post<{message:String}>('http://localhost:5000/api/auth/register',{
			email,password
		})
		.subscribe(data=>{
			this.router.navigate(['/'])
		},
		err=>{
			console.log(err.error.message)
			this.router.navigate(['/register'])
		})
	}

	loginUser(email:String, password:String){
		this.httpClient.post<{token:string}>('http://localhost:5000/api/auth/login',{
			email,password
		})
		.subscribe(data=>{
			const { token } = data
			this.token = token
			this.authStatusListener.next(true)
			this.router.navigate(['/'])
		},
		err=>{
			console.log(err.error.message)
		})
	}

	logoutUser(){
		this.token = ''
		this.authStatusListener.next(false)
		this.router.navigate(['/'])
	}

}