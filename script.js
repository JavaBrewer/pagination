document.addEventListener("DOMContentLoaded", function () {
  const dataList = document.getElementById("data-list");
  const pagination = document.getElementById("pagination");

  const itemsPerPage = 5;
  const data = [
    "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
    "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
    "Item 11", "Item 12", "Item 13", "Item 14", "Item 15", "Item 16", "Item 17", "Item 18", "Item 19", "Item 20",
    "Item 21", "Item 22", "Item 23", "Item 24", "Item 25", "Item 26", "Item 27", "Item 28", "Item 29", "Item 30",
    "Item 31", "Item 32", "Item 33", "Item 34", "Item 35", "Item 36"
  ];

  function displayData(items, page) {
    dataList.innerHTML = "";
    page--;

    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      dataList.appendChild(li);
    });
  }

  function setupPagination(items) {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const maxButtonsToShow = 5;

    let currentPage = 1;

    function updatePagination() {
      pagination.innerHTML = "";

      for (let i = currentPage; i < currentPage + maxButtonsToShow && i <= pageCount; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function () {
          displayData(items, i);
          setActiveButton(i);
        });
        pagination.appendChild(button);
      }

      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
          currentPage -= maxButtonsToShow;
          updatePagination();
          setActiveButton(currentPage);
        }
      });
      pagination.insertBefore(prevButton, pagination.firstChild);

      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.addEventListener("click", function () {
        if (currentPage + maxButtonsToShow <= pageCount) {
          currentPage += maxButtonsToShow;
          updatePagination();
          setActiveButton(currentPage);
        }
      });
      pagination.appendChild(nextButton);

      setActiveButton(currentPage);
    }

    updatePagination();
  }

  function setActiveButton(page) {
    const buttons = document.querySelectorAll(".pagination button");
    buttons.forEach(button => {
      button.classList.remove("active");
      if (parseInt(button.textContent) === page) {
        button.classList.add("active");
      }
    });
  }

  displayData(data, 1);
  setupPagination(data);
});
