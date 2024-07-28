import {getData} from "./libs/fetch";
import {IPost} from "./types/entity";

interface IPostResult {
  data: IPost[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/nKmHUxG2mZW7";

async function renderPosts() {
  const posts = await getData<IPostResult>(API_URL);

  if (!posts) {
    console.log("Failed to fetch posts");
    return;
  }
  
  const parent = document.querySelector(".parent-post");
  if(!parent) {
    console.log("Failed to find main element");
    return;
  }
  posts.data.map((post) => {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    const newTitle = document.createElement("h2");
    const parentBtn = document.createElement("div");
    parentBtn.classList.add("parent-btn");
    const newContent = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const createdAt = document.createElement("p");
    deleteBtn.classList.add("delete-btn");
    newTitle.textContent = post.title;
    newContent.textContent = post.content;
    createdAt.textContent = new Date(post.createdAt).toLocaleDateString();
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
        const id = post._id;
        try {
            await fetch(API_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([id]),
            });
        } catch (error) {
            console.log(error);
        } finally{
            window.location.reload();
        }
    })
    parentBtn.append(createdAt, deleteBtn);
    newPost.append(newTitle, newContent, parentBtn);
    parent.append(newPost);
    
  });
}

renderPosts();

//create new post

const titleInput = document.getElementById("title") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn");

submitBtn?.addEventListener("click", async () => {
  const title = titleInput.value;
  const content = contentInput.value;
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        title,
        content,
      }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
});
