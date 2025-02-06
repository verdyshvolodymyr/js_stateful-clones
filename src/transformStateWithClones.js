'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let destruction = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const clonedState = { ...destruction };

    if (actions[i].type === 'addProperties') {
      Object.assign(clonedState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (let key = 0; key < actions[i].keysToRemove.length; key++) {
        delete clonedState[actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in clonedState) {
        delete clonedState[key];
      }
    }
    destruction = clonedState;
    newState.push(clonedState);
  }

  return newState;
}

module.exports = transformStateWithClones;
