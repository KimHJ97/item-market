# Item 프로젝트

## 프로젝트 구조

 - `상황`
   - 클라이언트 웹 사이트와 관리자 웹 사이트 구현이 필요한 상황
   - 클라이언트는 클라이언트 사이드 렌더링 방식으로 Next.js를 이용하여 구현하고, 클라이언트용 API 서버가 필요한 상황
   - 관리자는 서버 사이드 렌더링 방식으로 API 서버에서 뷰 엔진을 이용
   - 클라이언트 API와 관리자 API가 분리가 되어야 한다.
     - 서로 API 규격, 인증 방식, 필요한 API가 다르다.
     - 엔드포인트를 분리하여 폴더로 분기처리를 통해 코드상 분기 코드가 들어가진 않아도 되지만, 중복 코드가 많이 발생할 수 있다.
 - `구조 잡기`
   - domain과 persistence는 대부분 여러 애플리케이션에서 공통으로 이용될 수 있다. 때문에, 재사용 가능하도록 libs에 위치시킨다.
   - DB, AWS, FCM(푸시 메시지) 등 설정도 여러 곳에서 설정만 추가하여 사용하고 싶다.
   - 특정 애플리케이션에 엔드포인트(cotnroller)와 비즈니스 로직(service)은 상이할 수 있다.
     - 요청 DTO, 응답 DTO도 각 애플리케이션마다 만든다.
     - Persistence 계층은 libs에서 공통으로 사용한다.
   - __MSA를 이용할 만큼 크지 않으며, MSA를 해본 적이 없다. 때문에, 단방향 의존 구조와 재사용 가능한 구조만 갖추었다.__ 
 - `폴더 구조 참고`
   - 모노레포(package.json): https://github.com/mikemajesty/nestjs-monorepo
   - 모노레포(루트 package.json): https://github.com/moeedhy/microservices-nestjs-monorepo-boilerplate
   - 단일 모듈 프로젝트: https://github.com/brocoders/nestjs-boilerplate
```
.
├── apps
│   ├── admin-server: 어드민 서버
│   └── api-server: 클라이언트 API 서버
├── config
│   └── database: RDBMS 설정
├── libs
│   ├── domain: 순수 TypeScript 도메인 객체
│   └── infrastructure: persistence 등 기타 구현체
├── nest-cli.json: 멀티 모듈 구조 설정
├── package.json
└── tsconfig.json: TypeScript 파일 경로 설정
```
