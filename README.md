# Beginning-Web

Учебный одностраничный лендинг — шаблон «агентства услуг»: header, about, services, portfolio/feedback, clients, contact form, footer.

> ⚠️ Проект является **демо-шаблоном**: тексты («We provide the best services in the world», «Digitalally Designed India» и т. п.) — плейсхолдеры исходного шаблона; формы не подключены к бэкенду (`action="#"`).

## Стек
- HTML5 + CSS3, без сборщика
- jQuery 3.5.1 (CDN по https) — только для плавного скролла по якорям

## Структура
```
index.html            — разметка
CSS/style.css         — стили + медиазапросы (≤1024px / ≤640px)
JS/JS.js              — плавный скролл по якорям
favicon.svg           — favicon
Sources/images/**     — изображения (только используемые): header, slider, social-иконки, логотипы клиентов
```

## Запуск
Открыть `index.html` в браузере или поднять локальный сервер:

```bash
python -m http.server 8000
```

## Исправления по итогам аудита (04.10)
- `<image>` → `<img alt="...">` (9 мест) — иконки соцсетей теперь отображаются;
- jQuery 1.9.0 через `http://ajax.googleapis.com` → 3.5.1 через `https://code.jquery.com`;
- разметка: убран лишний `</a>`, `</br>` → `<br>`, устаревший `align` у `<hr>`, таблица логотипов клиентов заменена на flex, к полям форм добавлены labels и валидация (`required`, `type="tel"/"email"`);
- адаптивность: добавлены медиазапросы (ранее страница была только под десктоп 1000px);
- удалено 26 неиспользуемых изображений (~6.05 MB): папки `ORIGINALS/`, файлы `*Original.png`, `Слой-0.png` и др.; папки переименованы: `Social footer` → `social-footer`, `Web development` → `web-development`;
- добавлены README, favicon.svg, `<meta name="description">`; title «Begining» → «Beginning»; убран IE-meta;
- dummy-повторы текста сведены к одному предложению (проект помечен как демо).
