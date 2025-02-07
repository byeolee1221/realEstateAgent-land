# 공인중개사 업무효율화 플랫폼 중개랜드

## 배포 웹사이트: https://real-estate-agent-land.vercel.app/

## 프로젝트 소개

- 제작 계기: 공인중개사의 실제 업무현장에서 아날로그 방식으로 업무를 하는 곳이 많아서 비효율적인 부분을 개선하고자 제작하게 되었습니다.
- 웹사이트가 기여할 수 있는 점
  - 공인중개사가 더 이상 아날로그적으로 업무하지 않고, 사무실 내외에서 쉽게 업무를 할 수 있도록 도와줍니다.
  - 일부 복잡하고 구시대적인 UI의 서비스에 비해, 훨씬 세련된 UI의 업무도구를 사용함으로써, 가독성과 편의성을 높여줍니다.
  - 상담노트와 중개메모 서비스를 통해 고객과의 상담내역을 가독성 좋게 한번에 파악할 수 있으며, 적어 놓고 잊어버릴 수 있는 단순한 메모의 관리를 확실하게 할 수 있습니다.
  - 향후 추가될 각 사무소별 업무현황 공유서비스를 통해 사무소 전체 인원이 간편하게 업무상황을 파악할 수 있습니다.
- 제작기간: 2024.04.13 ~ 2024.10.19
- 제작인원: 1명 (프론트엔드 - 문창기)
- 사용 기술스택
  - 프론트엔드: 
  ![](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)
  ![](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white) 
  ![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white) 
  ![](https://img.shields.io/badge/Jotai-97979A?style=flat-square&logo=Jotai&logoColor=white)
  - 백엔드: 
  ![](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white)
  - 호스팅:
  ![](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white)

## 시작 가이드

### 요구사항
- React 18
- Next.js 14.2.1
- TailwindCSS 3.4.1
- Typescript 5.4.5
- Jotai 2.9.3
- Firebase 10.11.0
- React-hook-form 7.51.3
- Zod 3.23.7
- Next-auth 4.24.7
- axios 1.6.8

### 설치
```
$ git clone https://github.com/byeolee1221/realEstateAgent-land.git
$ cd realEstateAgent-land
$ npm install
$ npm run dev
```

## 화면 구성
|메인페이지|상담노트페이지|
|:---:|:---:|
|<img src="/public/mainPage.png" width="400" height="400">|<img src="/public/notePageReadMe.png" width="400" height="400">|
|중개메모페이지|설정페이지|
|<img src="/public/memoPageReadMe.png" width="400" height="400">|<img src="/public/settingPage.png" width="400" height="400">|
|내 구독관리페이지|공지사항페이지|
|<img src="/public/mySubscriptionPage.png" width="400" height="400">|<img src="/public/noticePage.png" width="400" height="400">|

## 주요 기능

### 상담노트
- 고객과 면담 후 적은 정보들을 카테고리에 맞춰서 깔끔하게 정리할 수 있습니다.
- 매물 위치는 카카오맵을 이용해서 어느 위치인지 시각적으로 바로 파악할 수 있습니다.
- 상담노트를 작성하면 어떤 고객과의 어떤 매물에 관한 정보인지 각 노트의 제목을 통해 쉽게 파악할 수 있습니다.
- 노트의 카테고리 하나하나 상황에 따라 중개사가 직접 입력해서 관리할 수 있도록 하는 등 중개업무의 특성을 고려한 서비스를 제공합니다.

### 중개메모
- 매물이나 업무상 메모를 적어놓고 잊어버리거나, 어디에 적었는지 찾아 헤매는 비효율적인 부분을 해소할 수 있습니다.
- 메모에도 카카오맵을 통해 어떤 위치의 매물인지 메모와 함께 파악할 수 있도록 구성했습니다.
- 바쁜 중개업무에서 형식에 구애받지 않고 편하게 작성할 수 있도록 자유양식의 메뉴를 구성했습니다.

### 구독서비스 결제
- 중개랜드에서 제공하는 무료횟수를 모두 사용하면 구독서비스 결제를 통해 서비스를 이용할 수 있습니다.
- 구독서비스는 월 10,000원으로 제한없는 상담노트 및 중개메모 서비스를 제공합니다.
- 원할 때 언제든 구독취소할 수 있고, 서비스를 전혀 사용하지 않았다면 7일 이내에는 100% 환불, 이후에는 90% 환불이 가능합니다.
- 구독서비스를 이용하다가 중간에 해지하면 그 달의 마지막날까지는 계속 사용할 수 있습니다.