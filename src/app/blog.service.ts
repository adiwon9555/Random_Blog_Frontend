import { Injectable } from '@angular/core';

import { Blog } from "./model/blog";
import { Observable } from '../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  URL_DEV='http://localhost:3000/';
  constructor(private http:HttpClient) { }
  
  getAllBlogs():Observable<any>{
    return this.http.get<any>(this.URL_DEV+'blogs');
  }
  postBlog(blog:Blog):Observable<any>{
    return this.http.post<any>(this.URL_DEV+'blog',blog);
  }
  upvoteBlog(_id:String):Observable<any>{
    return this.http.patch<any>(this.URL_DEV+'blog/'+_id,{});
  }
}
