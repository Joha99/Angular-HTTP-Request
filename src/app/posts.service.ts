import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ key: string }>(
        "https://ng-complete-guide-f15f7.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-complete-guide-f15f7.firebaseio.com/posts.json",
        { headers: new HttpHeaders({ "Custom-Header": "Hello" }) }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      "https://ng-complete-guide-f15f7.firebaseio.com/posts.json"
    );
  }
}
