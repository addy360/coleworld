import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PostListComponent } from './posts/post-list/post-list.component'
import { PostCreateComponent } from './posts/post-create/post-create.component'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'


const routes:Routes =[
	{ path:'', component: PostListComponent },
	{ path:'newpost', component: PostCreateComponent },
	{ path:'login', component: LoginComponent },
	{ path:'register', component: SignupComponent },
	{ path:'editpost/:id', component: PostCreateComponent },
]

@NgModule({
	imports:[
		RouterModule.forRoot(routes)
	],
	exports:[RouterModule]
})
export class AppRoutinModule{}