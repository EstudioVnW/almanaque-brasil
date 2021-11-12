/* eslint-disable array-callback-return */
function countActions(actions, action) {
  return actions.reduce((a, v) => (v === action ? a + 1 : a), 0)
}

export function trailState(trailId, actionsBook) {
  let trailsCompleted = 0;

  const filteredTrail = actionsBook.filter((action) => {
    return action.trailId === trailId;
  })

  if (actionsBook.length === 0 || filteredTrail.length === 0) {
    return {
      trailId,
      state: 'todo'
    }
  }

  if (filteredTrail.length > 0) {
    const correctActivitiesIds = filteredTrail.filter(action => action.success === true);
    trailsCompleted = correctActivitiesIds.length;

    if (correctActivitiesIds.length >= 10) {
      return {
        trailId,
        state: 'done'
      }
    }
    const wrongActivitiesIds = filteredTrail.filter(action => action.success === false);
    
    let actionsById = [];
    let allActions = [];
    
    wrongActivitiesIds.map(action => {
      allActions.push(action.activityId);
      if (!actionsById.includes(action.activityId))
      actionsById.push(action.activityId);

    });

    actionsById.map(action => {

      const counter = countActions(allActions, action);
      if(counter >= 3) {
        trailsCompleted = trailsCompleted + 1
      }
    })

    if(trailsCompleted >= 10) {
      return {
        trailId,
        state: 'done'
      }
    }
    
    return {
      trailId,
      state: 'doing'
    }
  }
}
