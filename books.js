let myBooks = [];

// Ждём полной загрузки DOM перед работой с элементами
document.addEventListener('DOMContentLoaded', () => {
    
    // ===== Элементы =====
    const search = document.getElementById("search");
    const finded = document.getElementById("finded");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const year = document.getElementById("year");
    const genre = document.getElementById("genre");
    
    const addModal = document.getElementById("addModal");
    const addBookBtn = document.getElementById("addBook");
    const btnAdd = document.getElementById("btnAdd");
    const btnClose = document.getElementById("btnClose");
    
    const seaBooksModal = document.getElementById("seaBooks");
    const seaBookBtn = document.getElementById("seaBook");
    const btnSearch = document.getElementById("btnSearch");
    const taskList = document.getElementById("taskList");
    const btnCloseList = document.getElementById("btn-Close"); // 🔑 Кнопка закрытия списка

    // ===== Загрузка данных =====
    function loadData() {
        const saved = localStorage.getItem('library');
        myBooks = saved ? JSON.parse(saved) : [];
        if (!Array.isArray(myBooks)) myBooks = [];
    }
    loadData(); // Загружаем сразу при старте

    // ===== Сохранение данных =====
    function saveData() {
        localStorage.setItem('library', JSON.stringify(myBooks));
    }

    // ===== Добавление книги =====
    function addTask() {
        if (title.value.trim() === "") { 
            alert("Введите название!"); 
            return; 
        }
        if (author.value.trim() === "") { 
            alert("Введите автора!"); 
            return; 
        }
        if (year.value.trim() === "") { 
            alert("Введите год!"); 
            return; 
        }
        if (genre.value.trim() === "") { 
            alert("Введите жанр!"); 
            return; 
        }

        const book = {
            title: title.value.trim(),
            author: author.value.trim(),        
            year: year.value.trim(),
            genre: genre.value.trim()
        };

        myBooks.push(book);
        saveData();

        title.value = ""; 
        author.value = ""; 
        year.value = ""; 
        genre.value = "";
        title.focus();
    }

    // ===== Поиск и отрисовка =====
    function searchBook() {
        const text = search.value.trim().toLowerCase();
        taskList.innerHTML = '';

        const booksToShow = text === '' 
            ? myBooks : myBooks.filter(book => 
                book.title.toLowerCase().includes(text) ||
                book.author.toLowerCase().includes(text) ||
                book.year.toString().toLowerCase().includes(text)
            );

        booksToShow.forEach(book => {
            const li = document.createElement('li');
            
            const span = document.createElement('span');
            span.textContent = `${book.title} — ${book.author} (${book.year})`;
            li.appendChild(span);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", function() {
                const index = myBooks.indexOf(book);
                if (index !== -1) {
                    myBooks.splice(index, 1);
                    saveData();
                }
                li.remove();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // ===== Обработчики кнопок =====
    
    // Открытие модалки добавления
    addBookBtn.addEventListener('click', () => addModal.showModal());
    
    // Закрытие модалки добавления
    btnClose.addEventListener('click', () => addModal.close());
    
    // Добавление книги по кнопке
    btnAdd.addEventListener('click', addTask);

    // 🔑 Открытие модалки списка книг
    seaBookBtn.addEventListener('click', () => {
        searchBook(); // Обновляем список
        seaBooksModal.showModal(); // ✅ Правильное имя переменной
    });
    
    // 🔑 Закрытие модалки списка книг
    btnCloseList.addEventListener('click', () => {
        seaBooksModal.close(); // ✅ Правильное имя переменной
    });

    // Поиск
    btnSearch?.addEventListener('click', searchBook);
    search?.addEventListener('input', searchBook);
});