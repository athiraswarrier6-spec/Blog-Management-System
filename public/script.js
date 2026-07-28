const form = document.getElementById("blogForm");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        if (!title || !author || !content) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    author,
                    content
                })
            });

            if (response.ok) {
                alert("Blog added successfully!");
                window.location.href = "/";
            } else {
                alert("Failed to add blog.");
            }
        } catch (error) {
            console.error(error);
            alert("Server error.");
        }
    });
}