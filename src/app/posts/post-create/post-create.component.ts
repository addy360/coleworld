import { Component, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

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
	form:FormGroup
	imagePreview:string | ArrayBuffer
	public loading:boolean = false
	private mode:string 
	private postId:string = null
	post: Post;
	ngOnInit(){
		this.form = new FormGroup({
			'title':new FormControl(null,{validators:[Validators.required, Validators.minLength(4)]}),
			'content':new FormControl(null,{validators:[Validators.required]}),
			'image':new FormControl(null,{validators:[Validators.required]}),
		})
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
					const { title, content, imagePath } = this.post
					this.form.setValue({title, content, image:imagePath})
				})
			} 

		})
	}
	getPost(){
		return this.postservice.getPost(this.postId)
	}
	onAddPost=()=>{
		if(this.form.invalid) return
		const title = this.form.value.title
		const content = this.form.value.content
		const image = this.form.value.image
		this.loading = true
		if (this.mode === "create"){
			this.postservice.addPost(title, content, image)
		} 
		else {
			let post:Post = {
				id:this.postId,
				title, content, imagePath:image
			}
			this.postservice.updatePost(post)
		}
		this.form.reset()
	}

	onImage(e:Event){
		const { files } = (e.target as HTMLInputElement)
		const file = files[0]
		this.form.patchValue({image:file})
		this.form.get('image').updateValueAndValidity()
		const reader = new FileReader()
		reader.onload = ()=>{
			this.imagePreview = reader.result
		}

		reader.readAsDataURL(file)
	}
}