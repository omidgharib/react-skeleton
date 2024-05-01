// Define user's reducers
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LanguageName } from '@/constants'
import { ThemeName } from '@/themes'

// Reducer
const initialState: {
    token: string
    currentLang: LanguageName
    currentTheme: ThemeName
} = {
    token: import.meta.env.VITE_FAKE_TOKEN || '',
    currentLang: 'fa',
    currentTheme: 'light',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token
        },
        logout: (state) => {
            state.token = ''
        },
        changeLanguage: (state, action: PayloadAction<LanguageName>) => {
            state.currentLang = action.payload
        },
        changeTheme: (state, action: PayloadAction<ThemeName>) => {
            state.currentTheme = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCredentials, logout, changeLanguage, changeTheme } =
    userSlice.actions

export default userSlice.reducer
