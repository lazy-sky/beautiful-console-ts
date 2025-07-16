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

/** 
 * Utility class for browser console styling
 * @example
 * ```ts
 * import { beautifulConsole as bc } from 'beautiful-console-ts';
 * 
 * // Basic usage
 * bc.log('Hello, World!');
 * 
 * // With custom style
 * bc.log('Styled message', {
 *   color: '#FF5722',
 *   fontSize: '16px',
 *   backgroundColor: '#FFFDE7'
 * });
 * 
 * // With theme
 * bc.log('Dark theme message', { theme: 'dark' });
 * ```
 */
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
   * Basic log output with styling
   * @param message - Message to output
   * @param style - Style to apply
   * @example
   * ```ts
   * // Basic log
   * bc.log('Hello, World!');
   * 
   * // With theme
   * bc.log('Dark theme', { theme: 'dark' });
   * 
   * // With custom style
   * bc.log('Custom style', {
   *   color: 'white',
   *   backgroundColor: '#2196F3',
   *   padding: '5px'
   * });
   * ```
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
   * Output error message
   * @param message - Error message to output
   * @param style - Additional style
   * @example
   * bc.error('Failed to fetch data');
   * 
   * // With custom style
   * bc.error('Critical error', {
   *   fontSize: '16px',
   *   padding: '10px'
   * });
   * ```
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
   * Output warning message
   * @param message - Warning message to output
   * @param style - Additional style
   * @example
   * bc.warn('Deprecated feature');
   * 
   * // With custom style
   * bc.warn('Please update', {
   *   fontSize: '14px',
   *   fontWeight: 'bold'
   * });
   * ```
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
   * Output success message
   * @param message - Success message to output
   * @param style - Additional style
   * @example
   * bc.success('Data saved successfully');
   * 
   * // With custom style
   * bc.success('Task completed', {
   *   padding: '8px',
   *   borderRadius: '4px'
   * });
   * ```
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
   * Output info message
   * @param message - Info message to output
   * @param style - Additional style
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
   * Output message in box style
   * @param message - Message to output
   * @param style - Additional style
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
   * Output message in gradient style
   * @param message - Message to output
   * @param fromColor - Start color
   * @param toColor - End color
   * @example
   * ```ts
   * // Default gradient
   * bc.gradient('Beautiful gradient');
   * 
   * // Custom gradient colors
   * bc.gradient('Custom gradient', '#FF0080', '#7928CA');
   * ```
   */
  gradient(message: string, fromColor = '#FF5722', toColor = '#2196F3'): void {
    console.log(
      `%c${message}`,
      `background: linear-gradient(to right, ${fromColor}, ${toColor}); color: white; padding: 5px; border-radius: 3px;`,
    );
  }

  /**
   * Output grouped messages
   * @param options - Group options
   * @param callback - Callback function to execute inside the group
   * @example
   * bc.group({
   *   title: 'User Info',
   *   style: { color: '#E91E63' }
   * }, () => {
   *   bc.log('Name: John');
   *   bc.log('Role: Admin');
   * });
   * 
   * // Collapsed group
   * bc.group({
   *   title: 'Details',
   *   collapsed: true
   * }, () => {
   *   bc.log('Created: 2024-03-22');
   * });
   * ```
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
   * Output data in table format
   * @param data - Array of data to output
   * @param options - Table style options
   * @example
   * ```ts
   * const users = [
   *   { id: 1, name: 'John', role: 'Admin' },
   *   { id: 2, name: 'Jane', role: 'User' }
   * ];
   * 
   * bc.table(users, {
   *   headers: ['id', 'name', 'role'],
   *   alternateRowColors: true,
   *   headerStyle: {
   *     backgroundColor: '#3F51B5',
   *     color: 'white'
   *   }
   * });
   * ```
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
   * Start time measurement
   * @param label - Label for the task being measured
   * @param style - Additional style
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
   * End time measurement and output result
   * @param label - Label for the task being measured
   * @param style - Additional style
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
   * Output formatted JSON data
   * @param data - JSON data to output
   * @param expanded - Whether to output in expanded format
   */
  json(data: any, expanded = true): void {
    if (expanded) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(JSON.stringify(data));
    }
  }

  /**
   * Output object in tree format
   * @param obj - Object to output
   * @param name - Root name of the tree
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
   * Output progress visualization
   * @param value - Current progress value
   * @param max - Maximum value
   * @param length - Length of progress bar
   * @example
   * ```ts
   * // Basic progress
   * bc.progress(50, 100);
   * 
   * // Custom length
   * bc.progress(7, 10, 30);
   * 
   * // Progress updates
   * let progress = 0;
   * const interval = setInterval(() => {
   *   progress += 25;
   *   bc.progress(progress);
   *   if (progress >= 100) clearInterval(interval);
   * }, 1000);
   * ```
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
   * 호출 스택(trace) 출력
   * @param message - 출력할 메시지
   * @param style - 추가 스타일
   * @example
   * bc.trace('여기서 호출됨');
   * bc.trace('에러 위치', { color: 'red' });
   */
  trace(message: any, style?: ConsoleStyle): void {
    const traceStyle: ConsoleStyle = {
      color: '#607D8B',
      backgroundColor: '#ECEFF1',
      fontWeight: 'bold',
      padding: '2px 5px',
      borderRadius: '3px',
      ...style,
    };

    const styleString = this.styleObjectToString(traceStyle);

    if (typeof message === 'object') {
      console.trace('%c Object:', styleString, message);
    } else {
      console.trace(`%c${message}`, styleString);
    }
  }

  /**
   * Convert ConsoleStyle object to CSS style string
   * @param style - Style object to convert
   * @returns CSS style string
   */
  private styleObjectToString(style: ConsoleStyle): string {
    return Object.entries(style)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        // camelCase to kebab-case conversion (e.g., backgroundColor -> background-color)
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join('; ');
  }
}

export const beautifulConsole = new BeautifulConsole();
export default beautifulConsole;
