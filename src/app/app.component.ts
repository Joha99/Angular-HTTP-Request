import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetchingPost = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetchingPost = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.isFetchingPost = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // requests are only sent when you subscribe
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // get requests are only processed when you subscribe
    this.isFetchingPost = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetchingPost = false;
        this.loadedPosts = posts;
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
