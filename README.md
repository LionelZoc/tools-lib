# React Debug Utility - Why Did You Render

A lightweight debugging utility for React components that helps you track component renders and prop changes without needing Chrome DevTools or Redux DevTools. Perfect for environments with security restrictions.

## Features

- 🔍 **Component Render Tracking**: Logs every render with component name and render count
- 📊 **Prop Change Detection**: Identifies which props changed between renders
- ⏱️ **Performance Metrics**: Tracks time between renders
- 🎯 **Selective Tracking**: Choose which props to monitor
- 🚀 **Production Safe**: Can be disabled in production builds
- 🔧 **Custom Logging**: Use your own logger function
- 🎨 **HOC Support**: Wrap components with debugging capabilities
- 📈 **State Tracking**: Monitor state changes within components

## Installation

Copy the `useWhyDidYouRender.ts` file into your project and import it where needed.

## Usage

### Basic Usage

```tsx
import { useWhyDidYouRender } from './useWhyDidYouRender';

const MyComponent = (props) => {
  // Track all props
  useWhyDidYouRender(props, {
    name: 'MyComponent'
  });

  return <div>{props.count}</div>;
};
```

### Track Specific Props

```tsx
const MyComponent = (props) => {
  useWhyDidYouRender(props, {
    name: 'MyComponent',
    propsToTrack: ['count', 'data', 'title'] // Only track these props
  });

  return <div>{props.count}</div>;
};
```

### Using Higher-Order Component (HOC)

```tsx
import { withWhyDidYouRender } from './useWhyDidYouRender';

const MyComponent = (props) => {
  return <div>{props.count}</div>;
};

// Wrap component with debugging
const MyComponentWithDebug = withWhyDidYouRender(MyComponent, {
  name: 'MyComponent',
  propsToTrack: ['count', 'data']
});

// Use the wrapped component
<MyComponentWithDebug count={5} data={{ id: 1 }} />
```

### Track State Changes

```tsx
import { useTrackValues } from './useWhyDidYouRender';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ name: 'John' });

  // Track state changes
  useTrackValues({ count, data }, {
    name: 'MyComponent State'
  });

  return <div>{count}</div>;
};
```

### Custom Logger

```tsx
const MyComponent = (props) => {
  useWhyDidYouRender(props, {
    name: 'MyComponent',
    logger: (message, data) => {
      // Send to your logging service
      console.warn(message, data);
      // or
      analytics.track('component-render', data);
    }
  });

  return <div>{props.count}</div>;
};
```

### Production Safety

```tsx
const MyComponent = (props) => {
  useWhyDidYouRender(props, {
    name: 'MyComponent',
    enabled: process.env.NODE_ENV === 'development' // Only in development
  });

  return <div>{props.count}</div>;
};
```

## API Reference

### `useWhyDidYouRender(props, options)`

**Parameters:**
- `props` (object): Component props to track
- `options` (object): Configuration options
  - `name` (string, optional): Component name for logging (default: 'Component')
  - `propsToTrack` (string[], optional): Array of prop names to track (default: all props)
  - `enabled` (boolean, optional): Whether to enable logging (default: true)
  - `logger` (function, optional): Custom logger function (default: console.log)

### `withWhyDidYouRender(Component, options)`

**Parameters:**
- `Component` (React component): Component to wrap
- `options` (object): Same options as `useWhyDidYouRender`

**Returns:** Wrapped component with debugging capabilities

### `useTrackValues(values, options)`

**Parameters:**
- `values` (object): Values to track (typically state)
- `options` (object): Same options as `useWhyDidYouRender`

### `deepEqual(a, b)`

Utility function for deep comparison of values.

## Console Output Examples

### Component Render with Prop Changes
```
🔍 [MyComponent] Render #3 {
  renderCount: 3,
  timeSinceLastRender: "1500ms",
  timestamp: "2024-01-15T10:30:45.123Z",
  propChanges: {
    count: { previous: 5, current: 6, changed: true },
    data: { previous: { id: 1 }, current: { id: 1 }, changed: false }
  },
  changedProps: [
    { prop: "count", previous: 5, current: 6 }
  ]
}
```

### Component Render with No Changes
```
🔍 [MyComponent] Render #2 {
  renderCount: 2,
  timeSinceLastRender: "2000ms",
  timestamp: "2024-01-15T10:30:43.123Z",
  message: "No prop changes detected"
}
```

### State Changes
```
📊 [MyComponent State] Values changed on render #5 {
  renderCount: 5,
  changes: [
    { key: "count", previous: 4, current: 5 },
    { key: "data", previous: { name: "John" }, current: { name: "Jane" } }
  ]
}
```

## Best Practices

1. **Use Descriptive Names**: Give your components meaningful names for easier debugging
2. **Track Only Necessary Props**: Don't track all props if you only care about specific ones
3. **Disable in Production**: Use `enabled: process.env.NODE_ENV === 'development'`
4. **Custom Logging**: Implement your own logger for integration with monitoring tools
5. **Performance**: The utility is lightweight, but avoid tracking too many props in performance-critical components

## Troubleshooting

### No Logs Appearing
- Check that `enabled` is set to `true`
- Verify the component is actually re-rendering
- Ensure the hook is called at the top level of your component

### Too Many Logs
- Use `propsToTrack` to limit which props are monitored
- Consider using `enabled: false` for stable components
- Implement custom filtering in your logger function

### Performance Issues
- Limit the number of props you track
- Use the utility only in development
- Consider using `useMemo` or `useCallback` to prevent unnecessary re-renders

## License

MIT License - feel free to use in your projects! 