import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  postsPerPage: number = 10;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10]
  private postSub: Subscription

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    })
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage)
    })
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage)
  }
}
