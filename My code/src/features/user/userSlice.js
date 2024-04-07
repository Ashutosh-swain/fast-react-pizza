import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
// import { action } from '../order/CreateOrder';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// creating a Thunk middleware in redux toolkit using the createAsyncThunk function:
// it takes 2 arguments : actions, an async function which in this case we are using anymous function
// this fetchAddress function will become an action creator function so we will call it later so we are exporting it
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // this data will become the payload of fulfilled state
    // payload of the FULFILLED state
    return { position, address };
  },
);

// creating a state slice using redux toolkit:
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  // here we are connecting our Thunks with the reducers
  // here below we are handling the three cases of the thunks middleware which are pending,fulfilled,rejected
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state) => {
        (state.status = 'error'),
          (state.error =
            'There was a problem getting your address, Make sure to fill this field!');
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
