document.addEventListener("DOMContentLoaded", () => {
  // DOM references
  const searchInput = document.getElementById("searchInput");
  const genreDropdown = document.getElementById("genreDropdown");
  const genreButtons = document.querySelectorAll(".category-menu button");
  const books = document.querySelectorAll("#bookList li");
  const noResults = document.getElementById("noResults");

  // Search bar functionality
  if (searchInput && genreDropdown) {
    searchInput.addEventListener("focus", () => {
      genreDropdown.classList.remove("hidden");
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => genreDropdown.classList.add("hidden"), 200);
    });

    genreDropdown.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        searchInput.value = e.target.textContent;
        searchInput.dispatchEvent(new Event("keyup"));
      }
    });

    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      let matchCount = 0;

      books.forEach((book) => {
        const title = book.dataset.title.toLowerCase();
        const author = book.dataset.author.toLowerCase();
        const genre = book.dataset.genre.toLowerCase();
        const match =
          title.includes(filter) ||
          author.includes(filter) ||
          genre.includes(filter);

        book.style.display = match ? "" : "none";
        if (match) matchCount++;
      });

      if (noResults) {
        noResults.classList.toggle("hidden", matchCount > 0);
      }
    });
  }

  // Hamburger menu functionality
  const menuToggle = document.querySelector(".btn_menu");
  const menuClose = document.querySelector(".btn_menu--close");
  const menuBackdrop = document.querySelector(".menu_backdrop");

  if (menuToggle && menuClose && menuBackdrop) {
    menuToggle.addEventListener("click", () => {
      menuBackdrop.classList.remove("hidden");
    });

    menuClose.addEventListener("click", () => {
      menuBackdrop.classList.add("hidden");
    });
  }

  // Secondary navigation genre filtering
  genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genre = button.dataset.genre.toLowerCase();
      let matchCount = 0;

      // 🔄 Reset active state
      genreButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 🎯 Filter books
      books.forEach((book) => {
        const bookGenre = book.dataset.genre.toLowerCase();
        const isMatch = genre === "all" || bookGenre === genre;
        book.style.display = isMatch ? "" : "none";
        if (isMatch) matchCount++;
      });

      if (noResults) {
        noResults.classList.toggle("hidden", matchCount > 0);
      }

      if (searchInput) {
        searchInput.value = "";
      }
    });
  });
});
