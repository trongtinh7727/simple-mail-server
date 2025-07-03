# Mail Server với Frontend Vue.js

Dự án gồm SMTP server và giao diện quản lý email.

## Cấu trúc dự án

```
mail-server/
├── api.js             # API server
├── database.js        # SQLite database
├── docker-compose.yml # Docker Compose config
├── Dockerfile         # Dockerfile cho backend
├── mail-server.js     # SMTP server
├── package.json       # Backend dependencies
├── test-email.js      # Script test gửi email
└── frontend/          # Vue.js frontend
```

## Cách chạy

### Chạy toàn bộ ứng dụng với Docker

```bash
docker-compose up --build
```

Sau khi chạy:
- SMTP server: `localhost:25` (nhận email cho domain @iiex.tech)
- API server: `http://localhost:54321`
- Frontend: `http://localhost:8080`

### Chạy backend (không có Docker)

```bash
npm install
npm run dev
```

### Chạy frontend riêng (không có Docker)

```bash
cd frontend
npm install
npm run serve
```

### Test gửi email

```bash
node test-email.js
```

## Các tính năng

- Nhận email cho domain @iiex.tech
- API để truy xuất và xóa email
- Frontend để xem và quản lý email
- Lưu trữ email trong SQLite database

## Frontend

- Vue.js với Vuetify
- Hiển thị danh sách email
- Xem chi tiết email (HTML và text)
- Xóa email
