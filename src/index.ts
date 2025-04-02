type Theme = 'light' | 'dark' | 'system';

type ThemeExcludeSystem = Exclude<Theme, 'system'>;

/** 콘솔 출력에 적용할 수 있는 스타일 옵션 */
type ConsoleStyle = {
  theme?: Theme;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
};

type GroupOptions = {
  title: string;
  collapsed?: boolean;
  style?: ConsoleStyle;
};

type TableOptions = {
  headers?: string[];
  style?: ConsoleStyle;
  headerStyle?: ConsoleStyle;
  rowStyles?: ConsoleStyle[];
  alternateRowColors?: boolean;
};

/** 브라우저 콘솔 스타일링을 위한 유틸리티 클래스 */
class BeautifulConsole {
  private readonly defaultTheme: Theme = 'system';
  private readonly themeStyles: Record<ThemeExcludeSystem, ConsoleStyle> = {
    light: {
      backgroundColor: '#333333',
      color: '#d3d3d3',
    },
    dark: {
      backgroundColor: '#ffffff',
      color: '#333333',
    },
  };

  private get currentTheme(): ThemeExcludeSystem {
    return this.isDarkMode ? 'dark' : 'light';
  }

  private get isDarkMode(): boolean {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  /**
   * 기본 로그 출력
   * @param message - 출력할 메시지
   * @param style - 적용할 스타일
   */
  log(message: any, style?: ConsoleStyle): void {
    const theme = style?.theme || this.defaultTheme;
    const themeStyle =
      theme === 'system'
        ? this.themeStyles[this.currentTheme]
        : this.themeStyles[theme as ThemeExcludeSystem];

    const combinedStyle = { ...themeStyle, ...style };
    delete combinedStyle.theme;

    const styleString = this.styleObjectToString(combinedStyle);

    if (typeof message === 'object') {
      console.log('%c Object:', styleString, message);
    } else {
      console.log(`%c${message}`, styleString);
    }
  }

  /**
   * 에러 메시지 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   */
  error(message: any, style?: ConsoleStyle): void {
    const errorStyle: ConsoleStyle = {
      color: 'white',
      backgroundColor: '#FF5555',
      fontWeight: 'bold',
      padding: '2px 5px',
      borderRadius: '3px',
      ...style,
    };

    this.log(message, errorStyle);
  }

  /**
   * 경고 메시지 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   */
  warn(message: any, style?: ConsoleStyle): void {
    const warnStyle: ConsoleStyle = {
      color: 'black',
      backgroundColor: '#FFDD00',
      fontWeight: 'bold',
      padding: '2px 5px',
      borderRadius: '3px',
      ...style,
    };

    this.log(message, warnStyle);
  }

  /**
   * 성공 메시지 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   */
  success(message: any, style?: ConsoleStyle): void {
    const successStyle: ConsoleStyle = {
      color: 'white',
      backgroundColor: '#4CAF50',
      fontWeight: 'bold',
      padding: '2px 5px',
      borderRadius: '3px',
      ...style,
    };

    this.log(message, successStyle);
  }

  /**
   * 정보 메시지 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   */
  info(message: any, style?: ConsoleStyle): void {
    const infoStyle: ConsoleStyle = {
      color: 'white',
      backgroundColor: '#2196F3',
      fontWeight: 'bold',
      padding: '2px 5px',
      borderRadius: '3px',
      ...style,
    };

    this.log(message, infoStyle);
  }

  /**
   * 박스 스타일로 메시지 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   */
  box(message: any, style?: ConsoleStyle): void {
    const boxStyle: ConsoleStyle = {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: '#f8f8f8',
      ...style,
    };

    this.log(message, boxStyle);
  }

  /**
   * 그라데이션 스타일로 메시지 출력
   * @param message - 출력할 메시지
   * @param fromColor - 시작 색상
   * @param toColor - 종료 색상
   */
  gradient(message: string, fromColor = '#FF5722', toColor = '#2196F3'): void {
    console.log(
      `%c${message}`,
      `background: linear-gradient(to right, ${fromColor}, ${toColor}); color: white; padding: 5px; border-radius: 3px;`,
    );
  }

  /**
   * 그룹화된 메시지 출력
   * @param options - 그룹 옵션
   * @param callback - 그룹 내부에서 실행할 콜백 함수
   */
  group(options: GroupOptions, callback: () => void): void {
    const { title, collapsed = false, style } = options;

    const groupStyle: ConsoleStyle = {
      color: '#444',
      fontWeight: 'bold',
      ...style,
    };

    const styleString = this.styleObjectToString(groupStyle);

    if (collapsed) {
      console.groupCollapsed(`%c${title}`, styleString);
    } else {
      console.group(`%c${title}`, styleString);
    }

    callback();
    console.groupEnd();
  }

  /**
   * 테이블 형태로 데이터 출력
   * @param data - 출력할 데이터 배열
   * @param options - 테이블 스타일 옵션
   */
  table(data: any[], options?: TableOptions): void {
    if (!data.length) {
      console.log('No data to display');
      return;
    }

    const {
      headers = Object.keys(data[0]),
      style,
      headerStyle,
      rowStyles,
      alternateRowColors = true,
    } = options || {};

    const defaultHeaderStyle: ConsoleStyle = {
      color: 'white',
      backgroundColor: '#444',
      fontWeight: 'bold',
      padding: '5px',
      ...headerStyle,
    };

    console.log(
      '%cTable Data:',
      this.styleObjectToString({
        fontWeight: 'bold',
        fontSize: '14px',
        ...style,
      }),
    );

    const headerStyleString = this.styleObjectToString(defaultHeaderStyle);
    console.log('%c' + headers.join('\t|\t'), headerStyleString);

    data.forEach((row, index) => {
      let rowStyle: ConsoleStyle = {};

      if (rowStyles && rowStyles[index]) {
        rowStyle = rowStyles[index];
      } else if (alternateRowColors) {
        rowStyle = {
          backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e9e9e9',
        };
      }

      const rowData = headers.map((header) => row[header]).join('\t|\t');
      console.log('%c' + rowData, this.styleObjectToString(rowStyle));
    });
  }

  /**
   * 시간 측정 시작
   * @param label - 측정할 작업의 레이블
   * @param style - 추가 스타일
   */
  timeStart(label: string, style?: ConsoleStyle): void {
    const timeStyle: ConsoleStyle = {
      color: '#9C27B0',
      fontStyle: 'italic',
      ...style,
    };

    this.log(`⏱️ Timer started: ${label}`, timeStyle);
    console.time(label);
  }

  /**
   * 시간 측정 종료 및 결과 출력
   * @param label - 측정할 작업의 레이블
   * @param style - 추가 스타일
   */
  timeEnd(label: string, style?: ConsoleStyle): void {
    const timeStyle: ConsoleStyle = {
      color: '#9C27B0',
      fontStyle: 'italic',
      ...style,
    };

    console.timeEnd(label);
    this.log(`⏱️ Timer ended: ${label}`, timeStyle);
  }

  /**
   * JSON 데이터를 포맷팅하여 출력
   * @param data - 출력할 JSON 데이터
   * @param expanded - 확장된 형태로 출력할지 여부
   */
  json(data: any, expanded = true): void {
    if (expanded) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(JSON.stringify(data));
    }
  }

  /**
   * 객체를 트리 형태로 시각화하여 출력
   * @param obj - 출력할 객체
   * @param name - 트리의 루트 이름
   */
  objectTree(obj: any, name = 'Object'): void {
    console.groupCollapsed(`%c${name}`, 'font-weight: bold; color: #2196F3;');

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
          this.objectTree(value, key);
        } else {
          console.log(`%c${key}:`, 'font-weight: bold;', value);
        }
      }
    }

    console.groupEnd();
  }

  /**
   * 진행률을 시각화하여 출력
   * @param value - 현재 진행값
   * @param max - 최대값
   * @param length - 프로그레스 바의 길이
   */
  progress(value: number, max = 100, length = 20): void {
    const percentage = Math.round((value / max) * 100);
    const filledLength = Math.round((value / max) * length);

    const filledBar = '█'.repeat(filledLength);
    const emptyBar = '░'.repeat(length - filledLength);

    const progressBar = `${filledBar}${emptyBar} ${percentage}%`;

    let color = '#2196F3';
    if (percentage < 30) {
      color = '#F44336';
    } else if (percentage < 70) {
      color = '#FF9800';
    } else {
      color = '#4CAF50';
    }

    this.log(progressBar, { color });
  }

  /**
   * ConsoleStyle 객체를 CSS 스타일 문자열로 변환
   * @param style - 변환할 스타일 객체
   * @returns CSS 스타일 문자열
   */
  private styleObjectToString(style: ConsoleStyle): string {
    return Object.entries(style)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        // camelCase를 kebab-case로 변환 (예: backgroundColor -> background-color)
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join('; ');
  }
}

export const beautifulConsole = new BeautifulConsole();
export default beautifulConsole;
