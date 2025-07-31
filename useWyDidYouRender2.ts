import { useEffect, useRef } from 'react';

type PropsRecord = Record<string, any>;

export function useWhyDidYouRender<T extends PropsRecord>(
  componentName: string,
  props: T
) {
  const previousProps = useRef<T>();

  useEffect(() => {
    if (!previousProps.current) {
      // First render
      console.log(`[${componentName}] mounted`);
    } else {
      const allKeys = new Set([
        ...Object.keys(previousProps.current),
        ...Object.keys(props),
      ]);
      const changedProps: Record<string, { from: any; to: any }> = {};

      allKeys.forEach((key) => {
        if (previousProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length === 0) {
        console.log(`[${componentName}] re-rendered (no prop changes)`);
      } else {
        console.log(`[${componentName}] re-rendered. Changed props:`, changedProps);
      }
    }

    previousProps.current = props;
  });
}
