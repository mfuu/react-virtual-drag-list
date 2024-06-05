import * as React from 'react';
import useCombine from './useCombine';
import { Sortable, SortableAttrs } from '../core';
import { DragEvent, DropEvent, VirtualProps } from '../interface';

function useSortable<T>(
  list: T[],
  props: VirtualProps<T>,
  wrapRef: any,
  uniqueKeys: string[],
  onDrag: (event: DragEvent<T>) => void,
  onDrop: (event: DropEvent<T>) => void
) {
  const {
    delay = 0,
    group = '',
    handle = '',
    lockAxis = undefined,
    disabled = false,
    sortable = true,
    draggable = '.virutal-dnd-list-item',
    animation = 150,
    autoScroll = true,
    ghostClass = '',
    ghostStyle = undefined,
    chosenClass = '',
    fallbackOnBody = false,
    scrollThreshold = 55,
    delayOnTouchOnly = false,
  } = props;

  const [dnd, setDnd] = React.useState<Sortable>(undefined);
  const combinedStates = {
    delay,
    group,
    handle,
    lockAxis,
    disabled,
    sortable,
    draggable,
    animation,
    autoScroll,
    ghostClass,
    ghostStyle,
    chosenClass,
    fallbackOnBody,
    scrollThreshold,
    delayOnTouchOnly,
  };

  React.useEffect(() => {
    setDnd(() => {
      return new Sortable(wrapRef.current, {
        ...combinedStates,
        list,
        uniqueKeys,
        onDrag: onDrag,
        onDrop: onDrop,
      });
    });

    return () => {
      dnd?.destroy();
    };
  }, []);

  useCombine(combinedStates, () => {
    SortableAttrs.forEach((key) => {
      dnd?.option(key, props[key]);
    });
  });

  return [dnd];
}

export default useSortable;
