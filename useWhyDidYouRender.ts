interface WhyDidYouRenderOptions {
  /** Component name to display in logs */
  name?: string;
  /** Props to track for changes */
  propsToTrack?: string[];
  /** Whether to enable logging (useful for production builds) */
  enabled?: boolean;
  /** Custom logger function */
  logger?: (message: string, data?: any) => void;
}

interface RenderInfo {
  renderCount: number;
  lastRenderTime: number;
  propChanges: Record<string, { previous: any; current: any; changed: boolean }>;
}

/**
 * Hook to debug component renders and track prop changes
 * 
 * @param props - Component props to track
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * const MyComponent = (props) => {
 *   useWhyDidYouRender(props, {
 *     name: 'MyComponent',
 *     propsToTrack: ['count', 'data']
 *   });
 *   
 *   return <div>{props.count}</div>;
 * };
 * ```
 */
export function useWhyDidYouRender<T extends Record<string, any>>(
  props: T,
  options: WhyDidYouRenderOptions = {}
): void {
  const {
    name = 'Component',
    propsToTrack = Object.keys(props),
    enabled = true,
    logger = console.log
  } = options;

  const renderInfoRef = { current: {
    renderCount: 0,
    lastRenderTime: Date.now(),
    propChanges: {}
  } as RenderInfo };

  const previousPropsRef = { current: {} as T };

  // Only run if enabled
  if (!enabled) return;

  // Increment render count
  renderInfoRef.current.renderCount++;
  const currentTime = Date.now();
  const timeSinceLastRender = currentTime - renderInfoRef.current.lastRenderTime;
  renderInfoRef.current.lastRenderTime = currentTime;

  // Track prop changes
  const propChanges: Record<string, { previous: any; current: any; changed: boolean }> = {};
  let hasPropChanges = false;

  propsToTrack.forEach(propName => {
    const currentValue = props[propName];
    const previousValue = previousPropsRef.current[propName];
    const changed = !Object.is(currentValue, previousValue);

    propChanges[propName] = {
      previous: previousValue,
      current: currentValue,
      changed
    };

    if (changed) {
      hasPropChanges = true;
    }
  });

  // Log render information
  const logMessage = `🔍 [${name}] Render #${renderInfoRef.current.renderCount}`;
  const logData: any = {
    renderCount: renderInfoRef.current.renderCount,
    timeSinceLastRender: `${timeSinceLastRender}ms`,
    timestamp: new Date().toISOString()
  };

  if (hasPropChanges) {
    logData.propChanges = propChanges;
    logData.changedProps = Object.entries(propChanges)
      .filter(([_, info]) => info.changed)
      .map(([propName, info]) => ({
        prop: propName,
        previous: info.previous,
        current: info.current
      }));
  } else {
    logData.message = 'No prop changes detected';
  }

  logger(logMessage, logData);

  // Update previous props for next render
  previousPropsRef.current = { ...props };
}

/**
 * Higher-order component wrapper for useWhyDidYouRender
 * 
 * @param Component - React component to wrap
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * const MyComponentWithDebug = withWhyDidYouRender(MyComponent, {
 *   name: 'MyComponent',
 *   propsToTrack: ['count', 'data']
 * });
 * ```
 */
export function withWhyDidYouRender<P extends Record<string, any>>(
  Component: any,
  options: WhyDidYouRenderOptions = {}
) {
  const WrappedComponent = (props: P) => {
    useWhyDidYouRender(props, {
      name: options.name || Component.displayName || Component.name || 'WrappedComponent',
      ...options
    });

    return Component(props);
  };

  WrappedComponent.displayName = `withWhyDidYouRender(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Utility function to compare two values deeply
 * Useful for custom comparison logic
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return a === b;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}

/**
 * Hook to track specific values and log when they change
 * 
 * @param values - Object with values to track
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [count, setCount] = useState(0);
 *   const [data, setData] = useState({});
 *   
 *   useTrackValues({ count, data }, {
 *     name: 'MyComponent State',
 *     enabled: process.env.NODE_ENV === 'development'
 *   });
 *   
 *   return <div>{count}</div>;
 * };
 * ```
 */
export function useTrackValues<T extends Record<string, any>>(
  values: T,
  options: WhyDidYouRenderOptions = {}
): void {
  const {
    name = 'Values',
    propsToTrack = Object.keys(values),
    enabled = true,
    logger = console.log
  } = options;

  const previousValuesRef = { current: {} as T };
  const renderCountRef = { current: 0 };

  if (!enabled) return;

  renderCountRef.current++;

  const changes: Record<string, { previous: any; current: any; changed: boolean }> = {};
  let hasChanges = false;

  propsToTrack.forEach(key => {
    const currentValue = values[key];
    const previousValue = previousValuesRef.current[key];
    const changed = !Object.is(currentValue, previousValue);

    changes[key] = {
      previous: previousValue,
      current: currentValue,
      changed
    };

    if (changed) {
      hasChanges = true;
    }
  });

  if (hasChanges) {
    logger(`📊 [${name}] Values changed on render #${renderCountRef.current}`, {
      renderCount: renderCountRef.current,
      changes: Object.entries(changes)
        .filter(([_, info]) => info.changed)
        .map(([key, info]) => ({
          key,
          previous: info.previous,
          current: info.current
        }))
    });
  }

  previousValuesRef.current = { ...values };
}
