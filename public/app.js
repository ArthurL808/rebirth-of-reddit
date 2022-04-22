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
    link.href = response[i].data.url;
    let postImg = document.createElement("div");
    postImg.className = "postImg";
    if (response[i].data.preview === undefined) {
      postImg.style.backgroundImage = "url('https://i.pinimg.com/originals/07/4d/aa/074daa2e08d94a388b0ad82867f965c2.jpg')";
    } else {
      postImg.style.backgroundImage = `url(${response[i].data.preview.images[0].source.url.replace(
        /amp;/g,
        ""
      )})`;
    }
    
    let postTitle = document.createElement("h3");
    postTitle.className = "postTitle";
    postTitle.innerHTML = response[i].data.title;

    let spanContainer = document.createElement("div");
    spanContainer.className = "spanContainer";
    
    let author = document.createElement("p");
    author.className = "author";
    author.innerHTML = `By ${response[i].data.author} `;
    
    let authorDotSpan = document.createElement("span");
    authorDotSpan.className = "dot";

    let date = document.createElement("p");
    date.className = "date";
    date.innerHTML = `${moment
      .unix(response[i].data.created, "YYYYMMDD")
      .fromNow()} `;

      let dateDotSpan = document.createElement("span");
    dateDotSpan.className = "dot";

    let views = document.createElement("p");
    views.className = "views";
    views.innerHTML = `${response[i].data.score} Views`;

    let postText = document.createElement("p");
    postText.className = "postText";
    postText.innerHTML = response[i].data.selftext;

    postContainer.appendChild(link);
    link.appendChild(post);
    post.appendChild(postImg);
    post.appendChild(postTitle);
    post.appendChild(spanContainer);
    spanContainer.appendChild(author);
    spanContainer.appendChild(date);
    spanContainer.appendChild(views);
    author.appendChild(authorDotSpan);
    date.appendChild(dateDotSpan);
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