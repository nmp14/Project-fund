const createBtn = document.getElementById("createBtn");

const createProject = async (e) => {
    e.preventDefault();

    const name = document.getElementById("projectName").value.trim();
    const neededFunding = parseInt(document.getElementById("projectFunding").value.trim());
    const description = document.getElementById("projectDescription").value.trim();

    if (name && neededFunding && description) {
        const response = await fetch("/api/projects", {
            method: "POST",
            body: JSON.stringify({ name: name, needed_funding: neededFunding, description: description }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Error creating project");
        }
    }
}

createBtn.addEventListener("click", createProject);