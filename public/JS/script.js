let deleteProfileBtns;

deleteProfileBtns = document.querySelectorAll(".deleteProject");

const deleteProject = async (e, id) => {
    e.preventDefault();

    const response = await fetch(`/api/projects/${e.target.getAttribute("data-project-id")}`, {
        method: "DELETE"
    });

    if (response.ok) {
        document.location.replace("/profile");
    }
}


for (const button of deleteProfileBtns) {
    button.addEventListener("click", deleteProject);
}
