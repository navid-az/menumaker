async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/");
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
