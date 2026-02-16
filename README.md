# 🍨 YogoPick

나만의 요거트 볼을 꾸미고, 캡처하고, 앨범에 저장하는 웹 애플리케이션입니다.

> 11가지 토핑을 자유롭게 올려 나만의 요거트 볼을 완성해보세요!

<!-- 스크린샷이나 데모 GIF를 여기에 추가하면 좋습니다 -->
<!-- ![YogoPick 데모](./docs/demo.gif) -->

<br/>

## 주요 기능

- **요거트 볼 커스터마이징** — 딸기, 바나나, 블루베리 등 11가지 토핑을 클릭하여 볼 위에 자유롭게 배치
- **볼 캡처 & 저장** — 완성된 요거트 볼을 이미지로 캡처하여 제목, 설명과 함께 저장
- **나만의 앨범** — 저장한 요거트 볼을 앨범 형태로 모아보기 (무한 스크롤)
- **상세 보기 & 편집** — 저장된 볼의 상세 정보 확인, 제목·설명 수정, 삭제
- **회원 인증** — 이메일/비밀번호 회원가입 및 Google OAuth 로그인 지원
- **마이페이지** — 프로필 정보 확인 및 관리

<br/>

## 기술 스택

| 분류              | 기술                                        |
| ----------------- | ------------------------------------------- |
| **프레임워크**    | React 19, TypeScript, Vite                  |
| **스타일링**      | Tailwind CSS 4                              |
| **백엔드 (BaaS)** | Convex (실시간 DB, 파일 스토리지)           |
| **인증**          | Convex Auth (이메일/비밀번호, Google OAuth) |
| **상태 관리**     | Convex 실시간 쿼리, React Hook Form         |
| **캡처**          | html2canvas                                 |
| **에러 추적**     | Sentry                                      |
| **배포**          | AWS Lightsail + GitHub Actions (CI/CD)      |

<br/>

## 프로젝트 구조

```
src/
├── pages/                  # 페이지 컴포넌트
│   ├── MainPage.tsx
│   ├── CreateBowlPage.tsx
│   ├── BowlCardListPage.tsx
│   ├── BowlDetailPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── MyPage.tsx
├── components/             # 재사용 컴포넌트
│   ├── YogurtBowl.tsx
│   ├── ToppingSelector.tsx
│   ├── CaptureButton.tsx
│   ├── BowlCard.tsx
│   ├── BottomNav.tsx
│   └── ...
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티
├── types/                  # 타입 정의
└── assets/                 # 정적 리소스

convex/                     # Convex 백엔드
├── schema.ts               # DB 스키마
├── yogurtBowls.ts          # 요거트 볼 CRUD
├── users.ts                # 유저 관련 로직
├── files.ts                # 파일 스토리지 (페이지네이션)
└── auth.ts                 # 인증 설정
```

<br/>

## 시작하기

### 사전 요구사항

- Node.js 20 이상
- npm
- [Convex](https://www.convex.dev/) 계정

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/meongj/yogo-pick.git
cd yogo-pick

# 의존성 설치
npm install

# Convex 개발 서버 시작 (별도 터미널)
npx convex dev

# 개발 서버 시작
npm run dev
```

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 값을 설정합니다.

```env
CONVEX_DEPLOYMENT=          # Convex 배포 이름
VITE_CONVEX_URL=            # Convex 클라우드 URL
AUTH_GOOGLE_ID=             # Google OAuth 클라이언트 ID
AUTH_GOOGLE_SECRET=         # Google OAuth 클라이언트 시크릿
```

<br/>

## 스크립트

| 명령어            | 설명                            |
| ----------------- | ------------------------------- |
| `npm run dev`     | 개발 서버 실행                  |
| `npm run build`   | TypeScript 검사 + 프로덕션 빌드 |
| `npm run preview` | 프로덕션 빌드 미리보기          |
| `npm run lint`    | ESLint 코드 검사                |

<br/>

## 배포

`main` 브랜치에 push 시 GitHub Actions를 통해 자동 배포됩니다.

**배포 파이프라인:**

1. 코드 체크아웃 → 의존성 설치
2. Convex 타입 생성 → React 빌드
3. SSH를 통해 AWS Lightsail 서버에 `dist/` 배포

**필요한 GitHub Secrets:**

- `CONVEX_DEPLOY_KEY`
- `LIGHTSAIL_HOST`
- `LIGHTSAIL_SSH_KEY`
- `LIGHTSAIL_USER`
