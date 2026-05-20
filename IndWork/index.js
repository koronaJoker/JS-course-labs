const addBtn = document.getElementById("add");
const fileInput = document.getElementById("img");
const container = document.getElementById("image-load");

const titleInput = document.getElementById("title");
const folderInput = document.getElementById("folder");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let items = [];

addBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);

    files.forEach(file => {
        items.push({
            name: titleInput.value || file.name,
            folder: folderInput.value || "без папки",
            url: URL.createObjectURL(file),
            type: file.type,
            date: Date.now(),
            filter: filterSelect.value
        });
    });

    render();
});

sortSelect.addEventListener("change", render);

function render() {
    container.innerHTML = "";

    let sorted = [...items];

    if (sortSelect.value === "new") {
        sorted.sort((a, b) => b.date - a.date);
    }
    if (sortSelect.value === "old") {
        sorted.sort((a, b) => a.date - b.date);
    }
    if (sortSelect.value === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    sorted.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        let media;

        // 🎬 видео / gif (через video → можно ставить на паузу)
        if (item.type.includes("video") || item.type.includes("gif")) {
            media = document.createElement("video");
            media.src = item.url;
            media.autoplay = true;
            media.loop = true;

            media.addEventListener("click", () => {
                media.paused ? media.play() : media.pause();
            });
        } 
        else {
            media = document.createElement("img");
            media.src = item.url;
        }

        if (item.filter !== "none") {
            media.classList.add(item.filter);
        }

        const title = document.createElement("div");
        title.textContent = "📌 " + item.name;

        const folder = document.createElement("div");
        folder.textContent = "📁 " + item.folder;
        folder.className = "meta";

        card.appendChild(media);
        card.appendChild(title);
        card.appendChild(folder);

        container.appendChild(card);
    });
}