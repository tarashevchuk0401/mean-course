import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent: string = '';
  enteredTitle: string = '';


  constructor(private postService: PostService) { }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    }
    this.postService.addPost(form.value.title, form.value.content)
    form.reset()
  }


}
