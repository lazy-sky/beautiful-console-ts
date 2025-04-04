# Contributing to beautiful-console-ts

먼저 beautiful-console-ts에 기여하고 싶어 주셔서 감사합니다! 🎉

## 이슈 제보

버그를 발견하셨거나 새로운 기능을 제안하고 싶으시다면:

1. 이미 같은 이슈가 있는지 확인해주세요.
2. 버그 제보의 경우, 재현 방법과 예상 동작을 자세히 설명해주세요.
3. 새로운 기능 제안의 경우, 사용 사례와 구현 아이디어를 공유해주세요.

## 풀 리퀘스트

1. 먼저 이슈를 생성하여 변경 사항에 대해 논의해주세요.
2. fork 후 새로운 브랜치를 생성해주세요.
3. 코드 컨벤션을 준수해주세요.
4. 테스트를 추가하고 모든 테스트가 통과하는지 확인해주세요.
5. 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따라주세요.

## 개발 환경 설정

```bash
git clone https://github.com/[your-username]/beautiful-console-ts.git
cd beautiful-console-ts
npm install
npm run build
```

## 테스트

```bash
npm test
```

## 코드 컨벤션

- TypeScript strict 모드를 사용합니다.
- ESLint와 Prettier 설정을 준수해주세요.
- JSDoc으로 모든 public API를 문서화해주세요. 