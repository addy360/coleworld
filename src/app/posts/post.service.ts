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

	addPost(title:string, content:string, image:File){
		const formData = new FormData()
		formData.append("title",title)
		formData.append("content",content)
		formData.append("image",image, title)
		this.httpClient.post<{message:string,data:{id:string,title:string,content:string, imagePath:string}}>('http://localhost:5000/api/posts',formData)
		.subscribe(data=>{
			const { message, data:{id, title, content, imagePath} } = data
			const postObj = {
				id,title,content,imagePath
			}
			this.posts.push(postObj)
			this.postAdded.next([...this.posts])
			this.router.navigate(['/'])
		})
	}

	updatePost(post:Post){
		const { title , id, content, imagePath } = post
		let formData;
		if (typeof(imagePath) === 'object') { 
			formData = new FormData()
			formData.append('id',id)
			formData.append('title',title)
			formData.append('content',content)
			formData.append('image',imagePath)
		} else {
			formData = {
				...post
			}
		}
		console.dir(formData)
		this.httpClient.put(`http://localhost:5000/api/posts`,formData)
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