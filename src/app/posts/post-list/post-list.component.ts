import {Component, OnDestroy, OnInit} from '@angular/core'
import { Subscription } from 'rxjs'
import { Post } from '../post.model'
import { PostService } from '../post.service'
import { AuthService } from '../../auth/auth.service'

@Component({
	selector:'app-post-list',
	templateUrl:'./post-list.component.html',
	styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
	posts:Post[]=[]
	sub: Subscription
	authSub: Subscription
	isAuthenticated:boolean
	public loading:boolean = true
	constructor(private postService:PostService, private auth:AuthService){}
	ngOnInit(){
		this.isAuthenticated = !!this.auth.getToken()
		this.authSub = this.auth.getAuthStatus()
		.subscribe(res=>{
			this.isAuthenticated = res
		})
		this.postService.getPosts()
		this.sub = this.postService.postAdded.subscribe(data=>{
			this.posts = data
			this.loading = false
		})
	}

	onDeletePost(id){
		this.loading = true
		this.postService.deletePost(id)
		this.loading = false
	}

	ngOnDestroy(){
		this.sub.unsubscribe()
		this.authSub.unsubscribe()
	}
}