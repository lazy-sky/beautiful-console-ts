type Theme = 'light' | 'dark' | 'system';
type ThemeExcludeSystem = Exclude<Theme, 'system'>;

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

type ThemeStyles = {
  light: ConsoleStyle;
  dark: ConsoleStyle;
}

class BeautifulConsole {
  private defaultTheme: Theme = 'system';
  private themeStyles: Record<ThemeExcludeSystem, ConsoleStyle> = {
    light: {
      backgroundColor: '#333333',
      color: '#d3d3d3',
    },
    dark: {
      backgroundColor: '#ffffff',
      color: '#333333',
    }
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

  setTheme(theme: Theme): void {
    this.defaultTheme = theme;
  }

  setThemeStyles(styles: Partial<ThemeStyles>): void {
    if (styles.light) {
      this.themeStyles.light = { ...this.themeStyles.light, ...styles.light };
    }
    if (styles.dark) {
      this.themeStyles.dark = { ...this.themeStyles.dark, ...styles.dark };
    }
  }

  log(message: any, style?: ConsoleStyle): void {
    const theme = style?.theme || this.defaultTheme;
    const themeStyle = theme === 'system' ? 
      this.themeStyles[this.currentTheme] : 
      this.themeStyles[theme as ThemeExcludeSystem];

    const combinedStyle = { ...themeStyle, ...style };
    delete combinedStyle.theme;
    
    const styleString = this.styleObjectToString(combinedStyle);

    if (typeof message === 'object') {
      console.log('%c Object:', styleString, message);
    } else {
      console.log(`%c${message}`, styleString);
    }
  }

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

  gradient(
    message: string, 
    fromColor: string = '#FF5722', 
    toColor: string = '#2196F3' 
  ): void {
    console.log(
      `%c${message}`,
      `background: linear-gradient(to right, ${fromColor}, ${toColor}); color: white; padding: 5px; border-radius: 3px;`,
    );
  }

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

  timeStart(label: string, style?: ConsoleStyle): void {
    const timeStyle: ConsoleStyle = {
      color: '#9C27B0',
      fontStyle: 'italic',
      ...style,
    };

    this.log(`⏱️ Timer started: ${label}`, timeStyle);
    console.time(label);
  }

  timeEnd(label: string, style?: ConsoleStyle): void {
    const timeStyle: ConsoleStyle = {
      color: '#9C27B0',
      fontStyle: 'italic',
      ...style,
    };

    console.timeEnd(label);
    this.log(`⏱️ Timer ended: ${label}`, timeStyle);
  }

  json(data: any, expanded = true): void {
    if (expanded) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(JSON.stringify(data));
    }
  }

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
