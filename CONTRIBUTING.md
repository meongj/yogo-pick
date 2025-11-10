# Contributing Guide

프로젝트 컨벤션과 작업 방법을 설명합니다.

## Naming Convention

컴포넌트: PascalCase

훅: camelCase with 'use' prefix

유틸: camelCase

타입/인터페이스: PascalCase

변수: camelCase

함수: camelCase (동사로 시작)

이벤트 핸들러: handle/on 접두사

컴포넌트/인터페이스: PascalCase

## Git 브랜치 전략

main # 프로덕션 (배포)

dev # 개발 메인

feature/기능명 # 기능 개발

fix/버그명 # 버그 수정

hotfix/버그명 # 긴급 수정

…

**작업 흐름**

1. dev 브랜치에서 feature 브랜치 생성
2. 작업 완료 후 dev에 merge
3. 배포 준비되면 main에 merge

### 커밋 메시지 컨벤션

```tsx
<type>: <subject>

<body>
```

**Type + Gitmoji**

```tsx
✨ feat:      # 새로운 기능
🐛 fix:       # 버그 수정
📝 docs:      # 문서 변경
💄 style:     # 코드 포맷팅 (기능 변경 X)
♻️ refactor:  # 코드 리팩토링
✅ test:      # 테스트 추가/수정
🔧 chore:     # 빌드, 설정 파일 수정
⚡️ perf:      # 성능 개선
```
