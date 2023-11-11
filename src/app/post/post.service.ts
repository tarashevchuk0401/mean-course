import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
      })
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(post => post.id === id)}
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: '5454serv',
      title: title,
      content: content,
    };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        console.log(responseData);
        this.posts.push(post);
        this.postUpdated.next([...this.posts])
      })
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {
      id: id,
      title: title,
      content: content,
    }

    this.http.put('http://localhost:3000/api/posts/' + id, { title: title, content: content})
    .subscribe(response => console.log(response));
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postUpdated.next([...updatedPost])
      });

  }
}
