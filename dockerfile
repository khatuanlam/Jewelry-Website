# Chọn image cơ bản
FROM node:14

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các file vào container
COPY . .

# Expose cổng ứng dụng
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "run dev"]
