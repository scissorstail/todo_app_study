# TODO APP

> Django + React 공부용으로 작성한 TODO APP 입니다

## 세팅

**.env.example 파일을 복사하여 같은 위치에 .env 파일 생성 후 실행**


개발용 (react 컨테이너에서 개발 시 VS CODE Remote 확장 연결 권장)
```
docker-compose.yml
```

운영용 (운영용이라고 가정했을 때 달라지는 부분 작성. 실제 사용X)
```
docker-compose.prod.yml
```
---
## 실행 시 필요작업
```
# 실행
docker-compose -f docker-compose.yml up -d
```

```
# Django 마이그레이션
docker-compose -f ./docker-compose.yml run --rm django python manage.py migrate
```

```
# Django 마이그레이션 생성
docker-compose -f ./docker-compose.yml run --rm django python manage.py makemigrations
```

```
# Django 어드민 계정 생성
docker-compose -f ./docker-compose.yml run --rm django python manage.py createsuperuser
```
