import {Component, OnDestroy, OnInit} from '@angular/core'
import { Subscription } from 'rxjs'
import { Post } from '../post.model'
import { PostService } from '../post.service'

@Component({
	selector:'app-post-list',
	templateUrl:'./post-list.component.html',
})
export class PostListComponent implements OnInit, OnDestroy{
	posts:Post[]=[]
	sub: Subscription
	constructor(private postService:PostService){}
	ngOnInit(){
		this.posts = this.postService.getPosts()
		this.sub = this.postService.postAdded.subscribe(data=>{
			this.posts = data
		})
	}

	ngOnDestroy(){
		this.sub.unsubscribe()
	}
}