import * as React from 'react';
import useCombine from './useCombine';
import { Virtual, Range, VirtualAttrs, debounce } from '../core';
import { VirtualProps } from '../interface';

const Emits = {
  top: 'onTop',
  bottom: 'onBottom',
};

function useVirtual<T>(
  props: VirtualProps<T>,
  rootRef: any,
  wrapRef: any,
  uniqueKeys: string[],
  onUpdate: (range: Range) => void
) {
  const {
    size = undefined,
    keeps = 30,
    scroller = undefined,
    direction = 'vertical',
    dataSource = [],
    debounceTime = 0,
    throttleTime = 0,
  } = props;

  const [virutal, setVirtual] = React.useState<Virtual>(undefined);
  const topLoading = React.useRef(false);
  const combinedStates = {
    size,
    keeps,
    scroller,
    direction,
    debounceTime,
    throttleTime,
  };

  const handleToTop = debounce(() => {
    topLoading.current = true;
    props[Emits.top]?.();
  }, 50);

  const handleToBottom = debounce(() => {
    props[Emits.bottom]?.();
  }, 50);

  React.useEffect(() => {
    setVirtual(() => {
      return new Virtual({
        ...combinedStates,
        buffer: Math.round(keeps / 3),
        wrapper: wrapRef.current,
        scroller: scroller || rootRef.current,
        uniqueKeys,
        onScroll: (event) => {
          topLoading.current = false;
          if (event.top) {
            handleToTop();
          } else if (event.bottom) {
            handleToBottom();
          }
        },
        onUpdate,
      });
    });

    return () => {
      virutal?.removeScrollEventListener();
    };
  }, []);

  const lastLength = React.useRef(null);
  React.useEffect(() => {
    // if auto scroll to the last offset
    if (topLoading.current && props.keepOffset) {
      const index = Math.abs(dataSource.length - lastLength.current);
      virutal?.scrollToIndex(index);
      topLoading.current = false;
    }

    lastLength.current = dataSource.length;
  }, [dataSource]);

  useCombine(combinedStates, () => {
    VirtualAttrs.forEach((key) => {
      virutal?.option(key, props[key]);
    });
  });

  return [virutal];
}

export default useVirtual;
