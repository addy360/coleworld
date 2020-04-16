import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable({
	providedIn:'root'
})
export class AuthService {
	private token:string=''
	authStatusListener = new Subject<boolean>()
	constructor(private httpClient:HttpClient, private router:Router){}
	getToken(){
		return this.token
	}
	setToken(token){
		this.token=token
	}
	getAuthStatus(){
		return this.authStatusListener.asObservable()
	}
	createUser(email:String, password:String){
		return this.httpClient.post<{message:String}>('http://localhost:5000/api/auth/register',{
			email,password
		})
	}

	loginUser(email:String, password:String){
		return this.httpClient.post<{token:string}>('http://localhost:5000/api/auth/login',{
			email,password
		})
	}

	logoutUser(){
		this.token = ''
		this.authStatusListener.next(false)
		this.router.navigate(['/'])
	}

}