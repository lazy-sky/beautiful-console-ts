# beautiful-console-ts

프론트엔드 개발자를 위한 스타일링 기능이 강화된 브라우저 콘솔 라이브러리입니다. 디버깅을 더 예쁘고, 가독성 있게 만들어보세요.

## 설치

```bash
npm install beautiful-console-ts
```

또는

```bash
yarn add beautiful-console-ts
```

## 기능

- 커스텀 스타일을 적용한 로그 출력
- 상태별 로그 스타일링 (성공, 에러, 경고, 정보)
- 그룹화된 로그 출력
- 향상된 테이블 출력
- 그라데이션 텍스트 지원
- 객체 트리 시각화
- 시간 측정 및 성능 분석
- 프로그레스 바 출력
- 그리고 더 많은 기능들...

## 사용법

### 기본 사용법

```typescript
import { beautifulConsole as bc } from 'beautiful-console-ts';

// 기본 로그 출력
bc.log('안녕하세요, beautifulConsole입니다!');

// 스타일이 적용된 로그 출력
bc.log('커스텀 스타일이 적용된 메시지입니다.', {
  color: '#FF5722',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#FFFDE7',
  padding: '5px 10px',
  borderRadius: '4px'
});
```

### 상태별 로그 출력

```typescript
// 상태별 로그 출력
bc.success('작업이 성공적으로 완료되었습니다!');
bc.error('오류가 발생했습니다.');
bc.warn('주의해야 할 사항이 있습니다.');
bc.info('참고할 정보입니다.');
```

### 박스 스타일과 그라데이션

```typescript
// 박스 스타일의 메시지
bc.box('중요한 알림: 시스템 업데이트가 있습니다.');

// 그라데이션 스타일
bc.gradient('그라데이션 메시지', '#FF5722', '#2196F3');
```

### 그룹 기능

```typescript
// 그룹 기능
bc.group({
  title: '사용자 정보',
  collapsed: false,
  style: { color: '#E91E63' }
}, () => {
  bc.log('이름: 홍길동');
  bc.log('이메일: hong@example.com');
  bc.log('권한: 관리자');
});

// 중첩 그룹 예제
bc.group({
  title: '애플리케이션 상태',
  style: { color: '#4CAF50' }
}, () => {
  bc.log('버전: 1.2.3');
  
  bc.group({
    title: '네트워크 상태',
    collapsed: true,
    style: { color: '#2196F3' }
  }, () => {
    bc.log('연결 상태: 온라인');
    bc.log('지연 시간: 120ms');
  });
});
```

### 테이블 출력

```typescript
const users = [
  { id: 1, name: '홍길동', role: '관리자', active: true },
  { id: 2, name: '김철수', role: '사용자', active: false },
  { id: 3, name: '이영희', role: '편집자', active: true }
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

### 시간 측정

```typescript
bc.timeStart('데이터 로딩');
// 시간이 걸리는 작업 수행
fetchData().then(() => {
  bc.timeEnd('데이터 로딩');
});
```

### JSON 데이터 및 객체 트리

```typescript
const config = {
  server: { host: 'localhost', port: 3000 },
  database: { host: 'db.example.com', user: 'admin' }
};

// JSON 데이터 출력
bc.json(config);

// 객체 트리 형태로 출력
bc.objectTree(config, '애플리케이션 설정');
```

### 프로그레스 바

```typescript
bc.log('파일 업로드 진행률:');
bc.progress(25, 100);
bc.progress(50, 100);
bc.progress(75, 100);
bc.progress(100, 100);
```

## 스타일 속성

다음 스타일 속성들을 사용하여 콘솔 출력을 커스터마이징할 수 있습니다:

| 속성 | 설명 | 예시 값 |
|------|------|---------|
| color | 텍스트 색상 | '#FF5722', 'red' |
| backgroundColor | 배경 색상 | '#FFFDE7', 'lightblue' |
| fontSize | 폰트 크기 | '14px', '1.2em' |
| fontWeight | 폰트 두께 | 'bold', 'normal' |
| fontStyle | 폰트 스타일 | 'italic', 'normal' |
| textDecoration | 텍스트 장식 | 'underline', 'none' |
| border | 테두리 | '1px solid #ccc' |
| borderRadius | 테두리 둥글기 | '5px', '50%' |
| padding | 내부 여백 | '5px 10px' |
| margin | 외부 여백 | '10px' |

## 라이센스

MIT