const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Cấu hình CORS
server.use(cors());

// Sử dụng các middleware mặc định
server.use(middlewares);

// Sử dụng body parser
server.use(jsonServer.bodyParser);

// Thêm delay để mô phỏng network latency
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// Sử dụng router
server.use(router);

// Khởi động server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
}); 