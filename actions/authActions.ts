'use server'
import { signIn} from "../auth"
export const login = async () => {
    await signIn('github',  { prompt: "select_account", redirectTo : '/' })
}

export const loginGoogle = async() => {
    await signIn('google', {redirectTo :'/'})
}