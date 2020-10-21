# Demo Service trên Kubernetes

Demo service trên Kubernetes

## Biến môi trường cần thiết cho app NodeJS

|    Tên biến   | Điều kiện  |           Giá trị mẫu            |      Diễn giải       |
|---------------|------------|----------------------------------|----------------------|
| `PORT`        | `required` | 3000                             | Cổng app lắng nghe   |
| `MONGODB_URI` | `required` | `mongodb://<host>:<port>/<dbname>` | Kết nối tới mongodb` |

Docker image để chạy app NodeJS: `minhpq331/demo-service`. Đã có sẵn chỉ cần pull về dùng

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

# Forward port về local
kubectl -n <ns> port-forward svc/<svc-name> <local_port>:<service_port>
```

## Task 1

- Tạo namespace mang tên mình bằng `kubectl create ns <name>`
- Copy nội dung `deployment.template.yaml` ra 1 file `deployment.mongo.yaml`
- Chỉnh sửa `deployment.mongo.yaml` (tên, image, label,...) sử dụng image official [mongodb](https://hub.docker.com/_/mongo) (không cần quan tâm tới volume hay data).
- Apply deployment mongodb trên bằng `kubectl apply`
- Kiểm tra mongo đã chạy thành công hay chưa bằng `kubectl logs`
- Tạo 1 file `service.mongo.yaml` và copy phần định nghĩa ClusterIP trong `service.demo.yaml`
- Sửa lại tên service, label selector, service port, container port... tương ứng với MongoDB
- Apply service mongodb vừa tạo bằng `kubectl apply`

## Task 2

- Copy nội dung `deployment.template.yaml` ra 1 file `deployment.app.yaml`
- Chỉnh sửa `deployment.app.yaml` (tên, image, label,...) sử dụng image `minhpq331/demo-service` và replica=2
- Chỉnh sửa biến môi trường của app với `MONGO_URI` trỏ tới service mongodb vừa mới tạo ở trên (sử dụng full DNS của service và port tương ứng). Database name đặt bất kỳ.
- Apply deployment app trên bằng `kubectl apply`
- Kiểm tra app đã chạy thành công hay chưa bằng `kubectl logs`
- Tạo 1 file `service.app.yaml` và copy phần định nghĩa NodePort trong `service.demo.yaml`
- Sửa lại tên service, label selector, service port, container port, node port... tương ứng với app NodeJS
- Apply service app vừa tạo bằng `kubectl apply`
- Truy cập IP của host ở cổng NodePort đã chọn (30000 ~> 32767) để test thử ứng dụng

## Task 3

- Sửa service app NodeJS phía trên về dạng ClusterIP
- Chỉnh sửa file `ingress.demo.yaml` và thêm ingress resource với domain `<tênmình>.demo.service` và path prefix `/crud` trong url trỏ tới tên service app ở trên.
- Apply file `ingress.demo.yaml` bằng `kubectl apply`
- Kiểm tra ingress đang hoạt động bằng lệnh `kubectl -n <ns> get ingress` và `kubectl describe ingress <name>`
- Chỉnh sửa file host của hệ thống để trỏ domain `<tênmình>.demo.service` tới IP của host
    + Với windows là `C:\Windows\System32\drivers\etc`
    + Với mac, linux là `/etc/hosts`
- Truy cập app CRUD qua `http:///<tênmình>.demo.service:30000/crud` (30000 là port của nginx-ingress-controller đang chạy sẵn)

