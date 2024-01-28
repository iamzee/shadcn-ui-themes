import {createThemeAction} from 'remix-themes'
import {themeSessionResolver} from '~/utils/sessions.server';

export const action = createThemeAction(themeSessionResolver)