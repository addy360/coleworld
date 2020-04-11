import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router }  from '@angular/router'
import { Subject } from 'rxjs'

import { Post } from './post.model'

@Injectable({
	providedIn:'root'
})
export class PostService{
	constructor(private httpClient:HttpClient, private router:Router){}
	private posts:Post[]=[]
	public postAdded = new Subject<Post[]>()
	getPosts(){
		this.httpClient.get<{message:string, posts:Post[]}>('http://localhost:5000/api/posts')
		.subscribe(data=>{
			this.posts = data.posts
			this.postAdded.next([...this.posts])
		})
	}

	getPost(id){
		return this.httpClient.get<{message:string, post:Post}>(`http://localhost:5000/api/posts/${id}`)
	}

	addPost(title:string, content:string){
		const post:Post={
			id:undefined,title,content
		}
		this.httpClient.post<{message:string,data:{id:string,title:string,content:string}}>('http://localhost:5000/api/posts',post)
		.subscribe(data=>{
			const { message, data:{id, title, content} } = data
			const postObj = {
				id,title,content
			}
			this.posts.push(postObj)
			this.postAdded.next([...this.posts])
			this.router.navigate(['/'])
		})
	}

	updatePost(post:Post){
		this.httpClient.put(`http://localhost:5000/api/posts`,post)
		.subscribe(data=>{
			this.router.navigate(['/'])
		})
	}

	deletePost(id:string){
		this.httpClient.delete(`http://localhost:5000/api/posts/${id}`)
		.subscribe(data=>{
			this.posts = this.posts.filter(p=>p.id!==id)
			this.postAdded.next([...this.posts])
		})
	}
}