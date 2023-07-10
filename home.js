getData();

function   getData() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer a20131be-9cb1-46fd-b470-cf249571cc70");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://sistech-api.vercel.app/blog/", requestOptions)
    .then(response => response.text())
    .then(result => {
        var res = JSON.parse(result)
        res.forEach((val, index) => {
            addDataToTable(val)
            console.log(val);
        })
        console.log(result)
        })
    .catch(error => console.log('error', error));
}

function addDataToTable(blog) {
    console.log(blog)
    var table = document.getElementById("child-blog-list")

    var cardBlog = `
    <div class="card col-4">
        <div class="card-body">
            <h5 class="card-title">`+ blog.title +`</h5>
            <p class="card-text">`+ blog.content +`</p>
            <button class="btn btn-info" value="`+ blog.id +`" onClick="like(this.value)">`+ blog.like +` 🤍</button>
            <a class="btn btn-info" href="./edit.html?id=`+ blog.id +`&title=`+ blog.title+`&content=`+ blog.content +`">Edit</a>
        </div>
    </div>
    `
    table.insertAdjacentHTML("afterend",cardBlog)
}

function like(id) {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer a20131be-9cb1-46fd-b470-cf249571cc70");

var raw = JSON.stringify({
  "id": id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://sistech-api.vercel.app/blog/like", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}