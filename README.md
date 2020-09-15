# demo-service

Demo service deployment on Kubernetes

## Biến môi trường cần thiết cho app NodeJS

- `PORT`: trang web chạy trên port nào
- `MONGODB_URI`: chứa kết nối tới mongodb

Example: MONGODB_URI=mongodb://localhost:27017/test

## Các lệnh kubectl hay dùng:

```bash
# Check các pod đang chạy
kubectl -n <ns> get pod

# Log pod đang chạy
kubectl -n <ns> logs <pod-name>

# Check các deployment
kubectl -n <ns> get deployment

# Check các service
kubectl -n <ns> get service

# Kiểm tra mô tả service
kubectl -n <ns> describe service <svc-name>

# Apply định nghĩa resource
kubectl -n <ns> apply -f file.yaml
```

## Task 1

- Tạo namespace mang tên mình
- Tạo deployment triển khai mongodb bằng official image `mongo` dạng deployment trên K8S (không cần quan tâm tới volume hay data), template deployment xem trong bài trước
- Expose service mongodb dạng ClusterIP

> Demo service trong file service.demo.yaml

## Task 2

- Tạo deployment triển khai app CRUD NodeJS với image: `minhpq331/demo-service` với replica=2 
- Kết nối app nodejs trên với thông tin kết nối mongodb service vừa triển khai ở trên.
- Expose service CRUD trên dạng NodePort (cổng nodeport tùy chọn)
- Truy cập IP của host ở cổng đã chọn để test thử ứng dụng

> Demo service trong file service.demo.yaml

## Task 3

- Sửa service CRUD phía trên về dạng ClusterIP
- Thêm ingress resource với domain `<tênmình>.demo.service` và path prefix `/crud` trong url trỏ tới service CRUD ở trên.
- Chỉnh sửa file host của hệ thống để trỏ domain `<tênmình>.demo.service` tới IP của host
    + Với windows là `C:\Windows\System32\drivers\etc`
    + Với mac, linux là `/etc/hosts`
- Truy cập app CRUD qua `http:///<tênmình>.demo.service:30000/crud` (30000 là port của nginx-ingress-controller đang chạy sẵn)

> Demo ingress trong file ingress.demo.yaml