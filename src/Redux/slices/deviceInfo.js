import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}
export const deviceInfo = createSlice({
    name: "device",
    initialState,
    reducer:{}

})
export default deviceInfo.reducer;