import React from "react";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}
export default async function GetHomePages() {
  const posts = await getData();
  return (
    <div>
      {posts.map((post) => (
        <div>
          this is post number {post.id} and the title is {post.title}
        </div>
      ))}
    </div>
  );
}
