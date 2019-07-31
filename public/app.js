"use strict";
const postContainer = document.getElementById("container");
const random = document.getElementById("random");
const animemes = document.getElementById("animemes");
const drStone = document.getElementById("drStone");
const bungoStrayDogs = document.getElementById("bungoStrayDogs");
const randomArr = [
  "https://www.reddit.com/r/TokyoGhoul.json",
  "https://www.reddit.com/r/cowboybebop.json",
  "https://www.reddit.com/r/dbz.json",
  "https://www.reddit.com/r/ShokugekiNoSoma.json",
  "https://www.reddit.com/r/KimetsuNoYaiba.json",
  "https://www.reddit.com/r/souleater.json",
  "https://www.reddit.com/r/Trigun.json"
];
const subReddit = "https://www.reddit.com/r/anime.json";

function reqListner() {
  postContainer.innerHTML = null;
  let response = JSON.parse(this.responseText).data.children;
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

function createPost(subReddit) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListner);
  req.open("GET", subReddit);
  req.send();
}
createPost(subReddit);

animemes.addEventListener("click", function() {
  createPost("https://www.reddit.com/r/Animemes.json");
});
drStone.addEventListener("click", function() {
  createPost("https://www.reddit.com/r/DrStone.json");
});

bungoStrayDogs.addEventListener("click", function() {
  createPost("https://www.reddit.com/r/BungouStrayDogs.json");
});

random.addEventListener("click", function() {
  createPost(randomArr[Math.floor(Math.random() * randomArr.length)]);
});
