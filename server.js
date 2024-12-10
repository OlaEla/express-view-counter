const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Путь к файлу, где хранятся данные просмотров
const viewsFilePath = path.join(__dirname, 'views.json');

// Функция для загрузки данных из файла
function loadViews() {
    if (fs.existsSync(viewsFilePath)) {
        const data = fs.readFileSync(viewsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
}

// Функция для сохранения данных в файл
function saveViews(views) {
    fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2), 'utf-8');
}

// Загружаем данные при старте сервера
const views = loadViews();

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
    const url = '/';
    views[url] = (views[url] || 0) + 1; // Увеличиваем счетчик
    saveViews(views); // Сохраняем данные в файл
    res.send(`<h1>Welcome to Home Page</h1><p>Views: ${views[url]}</p>`);
});

// Обработчик для страницы "about"
app.get('/about', (req, res) => {
    const url = '/about';
    views[url] = (views[url] || 0) + 1; // Увеличиваем счетчик
    saveViews(views); // Сохраняем данные в файл
    res.send(`<h1>About Page</h1><p>Views: ${views[url]}</p>`);
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
