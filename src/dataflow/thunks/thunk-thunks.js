// Libs
import axios from 'axios';

import {
  saveThunk,
} from '../modules/thunk-module';

export const getDataThunk = () => async (dispatch) => {
  const idToken = localStorage.getItem('idToken');

  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_TRUNK_ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${idToken}`,
      },
    })
    dispatch(saveThunk(response.data.Items));
  }
  catch (err) {
    console.log('err get thunk', err);
  }
}
