import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'

@Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
	isAuthenticated:boolean
	sub:Subscription;
	constructor(private auth:AuthService) {}

	ngOnInit(){
		this.sub =  this.auth.getAuthStatus()
		.subscribe(res=>{
			this.isAuthenticated = res
		})
	}

	logoutUser(){
		this.auth.logoutUser()
	}

	ngOnDestroy(){
		this.sub.unsubscribe()
	}
}