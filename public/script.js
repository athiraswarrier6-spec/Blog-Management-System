const form = document.getElementById("blogForm");

form.addEventListener("submit", function(event) {

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || author === "" || content === "") {
        event.preventDefault();
        alert("Please fill in all fields.");
    }
});