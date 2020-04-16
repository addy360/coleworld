import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

import { environment } from '../../environments/environment'

const AUTH_BASE_URL = `${environment.baseUrl}/auth`

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
		return this.httpClient.post<{message:String}>(`${AUTH_BASE_URL}/register`,{
			email,password
		})
	}

	loginUser(email:String, password:String){
		return this.httpClient.post<{token:string}>(`${AUTH_BASE_URL}/login`,{
			email,password
		})
	}

	logoutUser(){
		this.token = ''
		this.authStatusListener.next(false)
		this.router.navigate(['/'])
	}

}