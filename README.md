# 📬 Nordify Messenger API

Nordify Messenger API реализует основной функционал мессенджера, включая обмен текстовыми сообщениями между пользователями в реальном времени с использованием веб-сокетов. API поддерживает регистрацию, авторизацию, выход из аккаунта, получение информации об авторизованном пользователе, получение списка пользователей, получение списка сообщений с выбранным пользователем и отправку сообщений выбранному пользователю.

## 🛠 Технологии и стек

- [**Node.js**](https://nodejs.org/en/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Express**](https://expressjs.com/)
- [**Socket.IO**](https://socket.io/)
- [**PostgreSQL**](https://www.postgresql.org/)
- [**Prisma**](https://www.prisma.io/)
- [**JSON Web Tokens**](https://jwt.io/)
- [**bcryptjs**](https://www.npmjs.com/package/bcryptjs)

## 📂 Архитектура проекта

```
nordify-api
├── prisma
│ └── schema.prisma
├── src
│ ├── controllers
│ │ ├── auth.controller.ts
│ │ └── message.controller.ts
│ ├── db
│ │ └── prisma.ts
│ ├── middleware
│ │ └── protectRoute.ts
│ ├── routes
│ │ ├── auth.route.ts
│ │ └── message.route.ts
│ ├── socket
│ │ └── socket.ts
│ ├── utils
│ │ ├── generateToken.ts
│ │ └── index.ts
│ └── index.ts
├── .env
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## 🚀 Начало работы с проектом

### Настройка .env файла

Создайте файл `.env` в корне проекта и заполните его следующими значениями:

```env
# ссылка на подключение к базе данных https://console.neon.tech/
DATABASE_URL=...

# секретный ключ jwt
JWT_SECRET=...

# режим работы проекта (development/production)
NODE_ENV=...

# порт, на котором будет запускаться сервер
PORT=...
```

### Установка зависимостей

Для установки всех необходимых зависимостей выполните команду:

```shell
npm install
```

### Миграции

Примените миграции к базе данных с помощью Prisma:

```shell
npx prisma db push
```

### Запуск проекта в режиме разработки

Для запуска проекта в режиме разработки выполните команду:

```shell
npm run dev
```

### Сборка проекта

Чтобы собрать проект, выполните команду:

```shell
npm run build
```

### Запуск собранного проекта

Для запуска собранной версии проекта выполните команду:

```shell
npm start
```

## 📡 Использование API

### Авторизация

- Регистрация
  - Метод: `POST`
  - URL: `/api/auth/signup`
  - Тело запроса:
    ```json
    {
      "username": "username",
      "fullName": "Full Name",
      "password": "password",
      "confirmPassword": "password",
      "gender": "male"
    }
    ```
  - Ответ:
    ```json
    {
      "id": "clwxgripe0004cjc5zxgavolq",
      "fullName": "Full Name",
      "username": "username",
      "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
    }
    ```

- Вход в аккаунт
  - Метод: `POST`
  - URL: `/api/auth/login`
  - Тело запроса:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
  - Ответ:
    ```json
    {
      "id": "clwxgripe0004cjc5zxgavolq",
      "fullName": "Full Name",
      "username": "username",
      "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
    }
    ```

- Выход из аккаунта
  - Метод: `POST`
  - URL: `/api/auth/logout`
  - Ответ:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- Информация об аккаунте
  - Метод: `GET`
  - URL: `/api/auth/me`
  - Ответ:
    ```json
    {
      "id": "clwxgripe0004cjc5zxgavolq",
      "fullName": "Full Name",
      "username": "username",
      "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
    }
    ```

### Сообщения

- Получение списка пользователей
    - Метод: `GET`
    - URL: `/api/messages/conversations`
    - Ответ:
      ```json
      [
        {
          "id": "clwxe9vbh0000cjc5xg6rb4xc",
          "fullName": "Full Name",
          "profilePic": "https://avatar.iran.liara.run/public/boy?username=username"
        }
      ]
      ```

- Получение сообщений
    - Метод: `GET`
    - URL: `/api/messages/:conversationId`
    - Ответ:
      ```json
      [
        {
          "id": "clwxf6s810003cjc589vdh71e",
          "conversationId": "clwxf6s350001cjc5g8filk0o",
          "senderId": "clwxe9vbh0000cjc5xg6rb4xc",
          "body": "Hello World!",
          "createdAt": "2024-06-02T10:49:35.329Z",
          "updatedAt": "2024-06-02T10:49:35.514Z"
        }
      ]
      ```

- Отправка сообщения
    - Метод: `POST`
    - URL: `/api/messages/send/:conversationId`
    - Тело запроса:
      ```json
      {
        "message": "Hello World!"
      }
      ```
    - Ответ:
      ```json
      {
        "id": "clwxhfmb10006cjc5q3lyniwo",
        "conversationId": "clwxf6s350001cjc5g8filk0o",
        "senderId": "clwxe9vbh0000cjc5xg6rb4xc",
        "body": "Hello World!",
        "createdAt": "2024-06-02T11:52:26.797Z",
        "updatedAt": "2024-06-02T11:52:26.797Z"
      }
      ```

## 🌐 Контакты
- GitHub: [litvin0d](https://github.com/litvin0d)
- Telegram: [litvinod](https://t.me/litvinod)
