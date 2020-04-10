import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'

import { Post } from './post.model'

@Injectable({
	providedIn:'root'
})
export class PostService{
	constructor(private httpClient:HttpClient){}
	private posts:Post[]=[]
	public postAdded = new Subject<Post[]>()
	getPosts(){
		this.httpClient.get<{message:string, posts:Post[]}>('http://localhost:5000/api/posts')
		.subscribe(data=>{
			this.posts = data.posts
			this.postAdded.next([...this.posts])
		})
	}

	addPost(title:string, content:string){
		const post:Post={
			id:"hgyhsgfd",title,content
		}
		this.httpClient.post('http://localhost:5000/api/posts',post)
		.subscribe(data=>{
			console.log(data)
			this.posts.push(post)
			this.postAdded.next([...this.posts])
		})
	}
}