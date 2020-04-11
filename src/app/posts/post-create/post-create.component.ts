import { Component, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NgForm } from '@angular/forms'

import{ Post } from '../post.model'
import{ PostService } from '../post.service'

@Component({
	selector:'app-post-create',
	templateUrl:'./post-create.component.html',
	styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
	constructor(private postservice:PostService, private activeRoute:ActivatedRoute){}
	content:string
	title:string
	public loading:boolean = false
	private mode:string 
	private postId:string = null
	post: Post;
	ngOnInit(){
		this.activeRoute.paramMap.subscribe((pMap:ParamMap)=>{
			this.mode = pMap.has('id') ? 'edit': 'create'
			if(this.mode === 'edit'){
				this.postId = pMap.get('id')
				this.loading = true
				this.getPost()
				.subscribe(data=>{
					const { message, post } = data
					this.post = post
					this.loading=false
					console.log(this.post)
				})
			} 

		})
	}
	getPost(){
		return this.postservice.getPost(this.postId)
	}
	onAddPost=(formData:NgForm)=>{
		if(formData.invalid) return
		const title = formData.value.title
		const content = formData.value.content
		this.loading = true
		if (this.mode === "create"){
			this.postservice.addPost(title, content)
			this.loading = false
		} 
		else {
			let post:Post = {
				id:this.postId,
				title, content
			}
			this.postservice.updatePost(post)
			this.loading = false
		}
		formData.resetForm()
	}
}