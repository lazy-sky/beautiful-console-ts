# beautiful-console-ts

![npm](https://img.shields.io/npm/v/beautiful-console-ts)
![npm bundle size](https://img.shields.io/bundlephobia/min/beautiful-console-ts)
![npm downloads](https://img.shields.io/npm/dm/beautiful-console-ts)
![GitHub stars](https://img.shields.io/github/stars/lazy-sky/beautiful-console-ts)
![License](https://img.shields.io/npm/l/beautiful-console-ts)

Enhanced browser console library with styling capabilities for frontend developers. Make your debugging more beautiful and readable.

프론트엔드 개발자를 위한 스타일링 기능이 강화된 브라우저 콘솔 라이브러리입니다. 디버깅을 더 예쁘고, 가독성 있게 만들어보세요.

## Features | 기능

- Custom styled log output | 커스텀 스타일을 적용한 로그 출력
- Status-based log styling (success, error, warning, info) | 상태별 로그 스타일링 (성공, 에러, 경고, 정보)
- Grouped log output | 그룹화된 로그 출력
- Enhanced table output | 향상된 테이블 출력
- Gradient text support | 그라데이션 텍스트 지원
- Object tree visualization | 객체 트리 시각화
- Time measurement and performance analysis | 시간 측정 및 성능 분석
- Progress bar output | 프로그레스 바 출력
- Trace (call stack) output | 트레이스(호출 스택) 출력

## Installation | 설치

```bash
npm install beautiful-console-ts
```

or | 또는

```bash
yarn add beautiful-console-ts
```

## Usage | 사용법

### Basic Usage | 기본 사용법

```typescript
import { beautifulConsole as bc } from 'beautiful-console-ts';

// Basic log output | 기본 로그 출력
bc.log('Hello, this is beautiful-console-ts by lazy-sky!');

// Log with custom style | 스타일이 적용된 로그 출력
bc.log('Message with custom style', {
  color: '#FF5722',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#FFFDE7',
  padding: '5px 10px',
  borderRadius: '4px',
});

// Log with specific theme | 특정 테마로 로그 출력
bc.log('Message in dark theme', { theme: 'dark' });
bc.log('Message in light theme', { theme: 'light' });

// Apply theme with custom style | 테마와 스타일을 함께 적용
bc.log('Message with theme and custom style', {
  theme: 'dark',
  fontSize: '16px',
  fontWeight: 'bold'
});
```
![image](https://github.com/user-attachments/assets/5fe27281-849c-4b68-a252-fb11695f5cdf)

### Status Logs | 상태별 로그 출력

```typescript
// Status-based log output | 상태별 로그 출력
bc.success('Operation completed successfully!');
bc.error('An error occurred.');
bc.warn('Warning: Please check the input.');
bc.info('Additional information.');

// Trace (call stack) | 트레이스(호출 스택)
bc.trace('여기서 호출됨');
bc.trace('에러 위치', { color: 'red' });
```
![image](https://github.com/user-attachments/assets/8af3c1c2-07d5-4aa5-877a-5d9f5b35e32c)

### Box Style and Gradient | 박스 스타일과 그라데이션

```typescript
// Box style message | 박스 스타일의 메시지
bc.box('Important Notice: System update available.');

// Gradient style | 그라데이션 스타일
bc.gradient('Gradient message');
```
![image](https://github.com/user-attachments/assets/d75db4d4-b188-4afb-8519-47f8ab6a3296)

### Group Feature | 그룹 기능

```typescript
// Group functionality | 그룹 기능
bc.group({
  title: 'User Information',
  collapsed: false,
  style: { color: '#E91E63' }
}, () => {
  bc.log('Name: John Doe');
  bc.log('Email: john@example.com');
  bc.log('Role: Admin');
});

// Nested group example | 중첩 그룹 예제
bc.group({
  title: 'Application Status',
  style: { color: '#4CAF50' }
}, () => {
  bc.log('Version: 1.2.3');
  
  bc.group({
    title: 'Network Status',
    collapsed: true,
    style: { color: '#2196F3' }
  }, () => {
    bc.log('Connection: Online');
    bc.log('Latency: 120ms');
  });
});
```
![image](https://github.com/user-attachments/assets/c2853de1-d320-42a3-b2d9-615cdc89f94d)

### Table Output | 테이블 출력

```typescript
const users = [
  { id: 1, name: 'John Doe', role: 'Admin', active: true },
  { id: 2, name: 'Jane Smith', role: 'User', active: false },
  { id: 3, name: 'Bob Johnson', role: 'Editor', active: true }
];

bc.table(users, {
  headers: ['id', 'name', 'role', 'active'],
  alternateRowColors: true,
  headerStyle: {
    backgroundColor: '#3F51B5',
    color: 'white'
  }
});
```
![image](https://github.com/user-attachments/assets/5354d343-b81f-434d-825c-6ef406be6524)

### Time Measurement | 시간 측정

```typescript
bc.timeStart('Data Loading');
// Perform time-consuming task | 시간이 걸리는 작업 수행
fetchData().then(() => {
  bc.timeEnd('Data Loading');
});
```

### JSON Data and Object Tree | JSON 데이터 및 객체 트리

```typescript
const config = {
  server: { host: 'localhost', port: 3000 },
  database: { host: 'db.example.com', user: 'admin' }
};

// Output JSON data | JSON 데이터 출력
bc.json(config);

// Output as object tree | 객체 트리 형태로 출력
bc.objectTree(config, 'Application Config');
```
![image](https://github.com/user-attachments/assets/24ffbef8-2af3-453f-b485-26d1c4248f76)

### Progress Bar | 프로그레스 바

```typescript
bc.log('File upload progress:');
bc.progress(25, 100);
bc.progress(50, 100);
bc.progress(75, 100);
bc.progress(100, 100);
```
![image](https://github.com/user-attachments/assets/56ab1d28-0edc-4741-a1dc-be9a3b7fd94a)

### Trace | 트레이스

```typescript
// Trace (call stack) | 트레이스(호출 스택)
bc.trace('트레이스 메시지');
bc.trace('에러 위치', { color: 'red' });
```

트레이스는 호출 스택을 스타일과 함께 출력합니다. 디버깅 시 호출 경로를 한눈에 파악할 수 있습니다.

## Style Properties | 스타일 속성

| Property | Example Values | Description |
|----------|---------------|-------------|
| color | '#FF5722', 'red' | Text color |
| backgroundColor | '#FFFDE7', 'lightblue' | Background color |
| fontSize | '14px', '1.2em' | Font size |
| fontWeight | 'bold', 'normal' | Font weight |
| fontStyle | 'italic', 'normal' | Font style |
| textDecoration | 'underline', 'none' | Text decoration |
| border | '1px solid #ccc' | Border style |
| borderRadius | '5px', '50%' | Border radius |
| padding | '5px 10px' | Inner spacing |
| margin | '10px' | Outer spacing |

## 🤝 Contributing | 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다! 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.

## 💖 Supporting | 후원하기

이 프로젝트가 도움이 되었다면, ⭐️ 스타를 눌러주세요!

## 📜 License | 라이센스

MIT © [lazy-sky](LICENSE)
