import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

import { ErrorComponent } from './error/error.component'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    return next.handle(req)
    .pipe(
    	catchError((error:HttpErrorResponse)=>{	
    		this.dialog.open(ErrorComponent, {
    			data:{message:error.error.message}
    		})
    		return throwError(error)
    	})
    )
  }
}