let books = [];

async function loadBooks() {
  const res = await fetch("data/books.json");
  books = await res.json();
  renderBooks(books);
}

function renderBooks(list) {
  const container = document.getElementById("books");
  container.innerHTML = "";

  list.slice(0, 200).forEach(b => {
    container.innerHTML += `
      <div class="book">
        <h3>${b.title}</h3>
        <p>${b.author}</p>
        <p>${b.subject}</p>

        ${b.download ? `<a href="${b.download}" target="_blank">Download</a>` : ""}
        ${b.read ? `<a href="${b.read}" target="_blank">Read</a>` : ""}
      </div>
    `;
  });
}

document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(val) ||
    b.author.toLowerCase().includes(val)
  );

  renderBooks(filtered);
});

document.getElementById("subject").addEventListener("change", e => {
  const val = e.target.value;

  if (!val) return renderBooks(books);

  const filtered = books.filter(b =>
    b.subject.toLowerCase().includes(val)
  );

  renderBooks(filtered);
});

loadBooks();
