import {Component, Input} from '@angular/core'

@Component({
	selector:'app-post-list',
	templateUrl:'./post-list.component.html',
})
export class PostListComponent{
	@Input() posts:[] 
}