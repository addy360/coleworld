import { Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms'

import{ Post } from '../post.model'
import{ PostService } from '../post.service'

@Component({
	selector:'app-post-create',
	templateUrl:'./post-create.component.html',
	styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
	constructor(private postservice:PostService){

	}
	content:string
	title:string
	onAddPost=(formData:NgForm)=>{
		if(formData.invalid) return
		const title = formData.value.title
		const content = formData.value.content
		this.postservice.addPost(title, content)
		formData.resetForm()
	}
}