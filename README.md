# 생활정보 모바일 웹

### 구현
__취소선은 구현 완료__
* 날씨
    * ~~시간별 온도 간격 차트로 표시 (해당 시간 기준 +-N시간)~~
    * ~~차트에 강수 확률,습도,온도 표시 (그래프 차트? 아래쪽에 그래프와 맞춰 추가 정보 표시)~~
    * ~~7일간의 일기예보 아이콘, 온도, 강수 확률 (위의 차트와 별개로 새로운 뷰 구성, 온도는 가로 막대로 표시 *아이폰 날씨 앱)~~
    * ~~지도로 사용자 위치 표시~~
    * 현재 대기 정보 (미세먼지 농도) => __추가 기능__
    * ~~날씨 조회 위치 변경 기능 “서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주”~~
* 코로나
    * ~~기준일, 기준시간, 확진자 수, 사망자 수~~
    * ~~지난 일주일 추세 차트~~
    * 감염자가 가장 많은 TOP3지역 => __추가 기능__
* 로그인
    * ~~로그인/로그아웃~~
    * ~~계정 관리 페이지~~
    * WYSIWYG 에디터로 사용자 소개 페이지 편집
* 가이드



## 구성
* Back-end
* Front-end

## 실행 방법 Back-end


### Mongodb가 필요합니다.
개발하면서 테스트 할 때에는 Docker Mongodb를 사용했습니다.


DockerHub mongodb 
https://hub.docker.com/_/mongo 

Docker mongo 실행 방법이 정리되어 있는 블로그
https://poiemaweb.com/docker-mongodb

```
docker pull mongo
docker run --name mongodb-container -v ~/data:/data/db -d -p 27017:27017 mongo
```

서버 설정 정보 수정 `.../server/Config.json`
```
{
    "DB": {
        "host": "localhost:27017",                      // 데이터베이스 주소
        "DataBase": "life_information"                  // 사용할 데이터베이스 이름
    },
    "JWT": {
        "ACCESS_TOKEN_SECRET": "AccessToken",           // JWT 토큰(Access Token) 생성에 쓰이는 값
        "REFRESH_TOKEN_SECRET": "RefreshToken",         // JWT 토큰(Refresh Token) 생성에 쓰이는 값
        "AccessExpireIn": "10min",                      // Access Token 만료 시간
        "RefreshExpireIn": "1h"                         // Refresh Token 만료 시간
    },
    "APIKEY": {
        "Weather": "",                                  // OpenWeatherAPI의 API KEY 값
        "Covid": ""                                     // 공공데이터 코로나 API의 API KEY 값
    }
}
```

```
cd server
npm i
npm build
npm start
```

#### 참고사항
* 서버 기본 포트: 80
* 기본 mongodb 주소: localhost:27017

## 실행 방법 Front-end


```
// 실행 명령어
cd web
npm i
npm start
```

```
// lint 명령어
npm run lint
npm run lint:fix
```

#### 참고사항
* 프론트엔드 기본 포트: 3000
* 기본 API 주소: http://localhost
