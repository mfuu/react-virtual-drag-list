import * as React from 'react';

function useCombine(states, effect: () => void) {
  React.useEffect(effect, Object.values(states));
}

export default useCombine;
