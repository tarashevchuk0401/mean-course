import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent: string = '';
  enteredTitle: string = '';
  private mode = 'create';
   postId: string;
   post : Post = {title: '', content: '', id:'123'};

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId)
      } else {
        this.mode = 'create';
        this.postId = null
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return
    }

    if(this.mode === 'create'){
      this.postService.addPost(form.value.title, form.value.content)
    } else {
      console.log(this.mode)
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }

    form.reset()
  }

  



}
