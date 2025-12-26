let items = JSON.parse(localStorage.getItem("wishlist")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

const list = document.getElementById("wishlist");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const themeToggle = document.getElementById("themeToggle");

if (darkMode) document.body.classList.add("dark");

themeToggle.onclick = () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", darkMode);
};

function save() {
    localStorage.setItem("wishlist", JSON.stringify(items));
}

function updateStats() {
    totalCount.textContent = items.length;
    doneCount.textContent = items.filter(i => i.done).length;
}

function render() {
    list.innerHTML = "";
    emptyState.style.display = items.length ? "none" : "block";

    items.forEach((item, index) => {
        const li = document.createElement("li");
        if (item.done) li.classList.add("done");

        li.innerHTML = `
            <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleItem(${index})">
            <span contenteditable="true"
                  onblur="editItem(${index}, this.textContent)">
                  ${item.name}
            </span>
            <div class="actions">
                <button class="delete" onclick="deleteItem(${index})">Hapus</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function addItem() {
    const input = document.getElementById("itemInput");
    const value = input.value.trim();
    if (!value) return;

    items.push({ name: value, done: false });
    input.value = "";
    save();
    render();
}

function toggleItem(index) {
    items[index].done = !items[index].done;
    save();
    render();
}

function editItem(index, value) {
    if (!value.trim()) return;
    items[index].name = value.trim();
    save();
}

function deleteItem(index) {
    items.splice(index, 1);
    save();
    render();
}

render();
