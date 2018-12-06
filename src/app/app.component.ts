import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Blog } from "./model/blog";
import { BlogService } from './blog.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public blogs:Blog[];
  text:String='';
  disabledBlogs:String[]=[];
  modalRef: BsModalRef;
 
  constructor(private blogService:BlogService,private modalService: BsModalService){

  }
 
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(){
    this.getAllBlogs();
  }
  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data=>{
      this.blogs=data.blogs.sort((a,b)=>{
        return b.createdAt - a.createdAt;
      });
    });
  }
  postBlog(){
    let blog={
      _id:'',
      text:this.text,
      createdAt:0,
      vote:0
    }
    this.blogService.postBlog(blog).subscribe(data=>{
      this.getAllBlogs();
    })
  }
  upvoteBlog(blog:Blog){
    let _id=blog._id;
    this.blogService.upvoteBlog(_id).subscribe(data=>{
      this.blogs=this.blogs.map((blog)=>{
        if(blog._id==_id){
          blog.vote=data.blog.vote;
          this.disabledBlogs.push(blog._id);
          return blog;
        }
        else{
          return blog;
        }
      })
    })
  }

  convertDate(dateInt:number){
    return new Date(dateInt).toLocaleString();
  }

  checkDisabled(_id:String){
    for (let index = 0; index < this.disabledBlogs.length; index++) {
      if(this.disabledBlogs[index]==_id){
        return true;
      }
    }
    return false;
    
  }
}
