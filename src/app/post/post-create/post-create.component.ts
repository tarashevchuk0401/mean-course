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
  isLoading: boolean = false;
  postId: string;
  post: Post = { title: '', content: '', id: '123' };

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          console.log('!' + postData)
          this.post = { id: postData._id, title: postData.title, content: postData. content }
        })
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
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content)
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }

    form.reset()
  }





}
