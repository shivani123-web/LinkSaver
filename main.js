
//Save Bookmark
function saveBookmark(e){
    //Prevent from page reloading;
    e.preventDefault();

    //Get site name and url
    var siteName=document.querySelector("#siteName").value;
    var siteUrl=document.querySelector("#siteUrl").value;
    console.log(siteName,siteUrl);
    //create a bookmark object
    var bookmark={
        name: siteName,
        url: siteUrl
    };

    //Store bookmark
    var bookmarks= [];

    //check if the local storage is not empty
    if(localStorage.getItem("bookmarks")!== null){
        //Get bookmarks from local storage
        bookmarks=JSON.parse(localStorage.getItem("bookmarks"));

    }
    //adding new bookmark
    bookmarks.push(bookmark);

    //Update bookmarks in local storage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    //fetch bookmarks 
    fetchBookmarks();

    //empty the inputs
    document.querySelector("form").reset(); 
}

//Fetch bookmarks 
function fetchBookmarks(){
    //Get bookmarks from local storage
    var bookmarks= JSON.parse(localStorage.getItem("bookmarks")) || [];


    //Select the output bookmarks div
    var output= document.querySelector("#bookmarks");

    //Reset  the bookmarks div
    output.innerHTML = "";

    //loop over bookmarks 
    bookmarks.forEach(function(bookmark){
        //create div
        console.log(bookmark.name,bookmark.url);
        var div = document.createElement("div");
        div.className="bookmark item";
        //create h3 with bookmark name as content
        var h3 = document.createElement("h3");
        h3.textContent = bookmark.name;

        //create visit link
        var a = document.createElement("a");
        a.href = "https://"+bookmark.url;
        a.className = "btn btn-success";
        a.textContent="Visit";
        a.target="_blank";
        console.log("hello",a.href)
     

        //create delete button
        var button = document.createElement("button");
        button.className ="btn btn-danger";
        button.textContent="Delete";
        button.setAttribute("data-name",bookmark.name);

        //add event listener to the delete button
        button.addEventListener("click",function(e){
            var name = e.target.getAttribute("data-name");
            deleteBookmark(name);
        });

        //Append h3,a , button into div
        div.appendChild(h3);
        div.appendChild(a);
        div.appendChild(button);


        //append the div into output
        output.appendChild(div);
    });
}

//Delete Bookmark
function deleteBookmark(name){
    //Get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    //Find and remove the bookmark
    bookmarks = bookmarks.filter(function(bookmark){
        return bookmark.name !== name;
    });
 
    //update local Storage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    //refetch bookmarks output
    fetchBookmarks();
}

//adding event listener to submit button
document.querySelector("form").addEventListener("submit",saveBookmark);


//Adding event listener to page loading
window.addEventListener("load",fetchBookmarks);

