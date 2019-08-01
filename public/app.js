"use strict";
const postContainer = document.getElementById("container");
const random = document.getElementById("random");
const animemes = document.getElementById("animemes");
const drStone = document.getElementById("drStone");
const bungoStrayDogs = document.getElementById("bungoStrayDogs");
const toTop = document.getElementById("toTop");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const randomArr = [
  "r/TokyoGhoul.json",
  "r/cowboybebop.json",
  "r/dbz.json",
  "r/ShokugekiNoSoma.json",
  "r/KimetsuNoYaiba.json",
  "r/souleater.json",
  "r/Trigun.json"
];
const subReddit = "r/anime.json";
let reddit;
let after;
function reqListner() {
  let responseText = JSON.parse(this.responseText);
  let response = responseText.data.children;
  reddit = `${responseText.data.children[0].data.subreddit_name_prefixed}.json`;
  after = `&after=${responseText.data.after}`;
  for (let i = 0; i < response.length; i++) {
    let post = document.createElement("div");
    post.className = "post";
    let link = document.createElement("a");
    link.className = "link";
    link.href = response[i].data.url;
    let postImg = document.createElement("div");
    postImg.className = "postImg";
    let img = document.createElement("img");
    img.className = "img";
    if (response[i].data.preview === undefined) {
      img.src =
        "https://i.pinimg.com/originals/07/4d/aa/074daa2e08d94a388b0ad82867f965c2.jpg";
    } else {
      img.src = response[i].data.preview.images[0].source.url.replace(
        /amp;/g,
        ""
      );
    }
    let spanHolder = document.createElement("div");
    spanHolder.className = "spanHolder";

    let postTitle = document.createElement("div");
    postTitle.className = "postTitle";
    postTitle.innerHTML = response[i].data.title;

    let authorSpan = document.createElement("span");
    authorSpan.className = "authorSpan";
    authorSpan.innerHTML = `${response[i].data.author} `;

    let bySpan = document.createElement("span");
    bySpan.className = "bySpan";
    bySpan.innerHTML = "By: ";

    let dateSpan = document.createElement("span");
    dateSpan.className = "dateSpan";
    dateSpan.innerHTML = `${moment
      .unix(response[i].data.created, "YYYYMMDD")
      .fromNow()} `;

    let viewsSpan = document.createElement("span");
    viewsSpan.className = "viewsSpan";
    viewsSpan.innerHTML = `Views: ${response[i].data.score}`;

    let postText = document.createElement("div");
    postText.className = "postText";
    postText.innerHTML = response[i].data.selftext;

    postContainer.appendChild(link);
    link.appendChild(post);
    postImg.appendChild(img);
    post.appendChild(postImg);
    post.appendChild(postTitle);
    post.appendChild(spanHolder);
    spanHolder.appendChild(bySpan);
    spanHolder.appendChild(authorSpan);
    spanHolder.appendChild(dateSpan);
    spanHolder.appendChild(viewsSpan);
    post.appendChild(postText);
  }
}

function createPost(subReddit, next) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListner);
  req.open("GET", `https://www.reddit.com/${subReddit}?limit=50${next}`);
  req.send();
}
createPost(subReddit);

searchButton.addEventListener("click", function() {
  postContainer.innerHTML = null;
  let searchValue = `r/${searchBar.value}.json`;
  createPost(searchValue);
});

toTop.addEventListener('click',function () {
  document.body.scrollTop= 0;
  document.documentElement.scrollTop= 0;
})
window.addEventListener("scroll", function() {
  if (this.scrollY >= document.body.scrollHeight - 1000) {
    let next = after;
  createPost(reddit, next);
  }
  
});

animemes.addEventListener("click", function() {
  postContainer.innerHTML = null;
  createPost("r/Animemes.json");
});
drStone.addEventListener("click", function() {
  postContainer.innerHTML = null;
  createPost("r/DrStone.json");
});

bungoStrayDogs.addEventListener("click", function() {
  postContainer.innerHTML = null;
  createPost("r/BungouStrayDogs.json");
});

random.addEventListener("click", function() {
  postContainer.innerHTML = null;
  createPost(randomArr[Math.floor(Math.random() * randomArr.length)]);
});