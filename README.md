# 영어 표현 학습 체크 테스트 🎯


🔗 **데모:** ([데모](https://recruit-frontend-xwax.vercel.app/))


모바일 웹 기반의 영어 표현 학습 테스트 애플리케이션입니다. 사용자가 영어 문장을 듣고 올바른 단어를 선택하여 문장을 완성하는 방식으로 학습 능력을 측정합니다.

## 주요 기능 ✨

- 📱 모바일 최적화 UI/UX (320px~424px)
- 🖥️ 반응형 디자인 지원 (태블릿 800px, 데스크탑 1920px)
- ⏱️ 45초 제한 시간 타이머
- 🎵 음성 힌트 기능
- 🔄 진행 상태 자동 저장
- 📊 상세한 결과 분석

## 기술 스택 🛠️

- **프레임워크:** Next.js 15.0.3
- **언어:** TypeScript 5.x
- **UI 라이브러리:**
    - React 19.0.0-rc
    - styled-components 6.1.13
- **개발 도구:**
    - ESLint 8.x
    - Turbopack

## 주요 페이지 🎯

### 테스트 목록 페이지 (/)

- 응시 가능한 테스트 목록 표시
- API 연동 (`/api/test/list`)
- 이전 응시 기록에 따른 페이지 라우팅

### 문제 페이지 (/test)

- 3초 카운트다운 모달
- 45초 제한 타이머
- 보기 및 답안 영역
- 음성 힌트 기능

### 문제 결과 페이지 (/result)

- 개별 문제 결과 표시
- 다음 문제 이동 기능
- 최종 결과 페이지 연결

### 테스트 결과 페이지 (/final)

- 전체 문제 결과 요약
- 성공/실패 판정 (오답 3개 기준)
- 결과별 차별화된 이미지

## 사용자 플로우 🔄

1. **테스트 목록 접속**

    - 응시 가능한 테스트 목록 확인
    - 시작하기 버튼으로 테스트 진입

2. **테스트 진행**

    - 3초 카운트다운
    - 45초 제한 시간 내 문제 풀이
    - 힌트 음성 청취 가능

3. **결과 확인**
    - 문제별 정답/오답 확인
    - 최종 성공/실패 여부 판정
    - 결과에 따른 피드백 제공

## 특이사항 ⚠️

### 테스트 중단 처리

- 테스트 중 이탈 시 해당 문제 오답 처리
- 재진입 시 다음 문제부터 시작

### 판정 기준

- 오답 2개 이하: 성공
- 오답 3개 이상: 실패

## 반응형 브레이크포인트 📱

- **모바일:** 320px ~ 424px (최적화)
- **태블릿:** 800px
- **데스크탑:** 1920px
