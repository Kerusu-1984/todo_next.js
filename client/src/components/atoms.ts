import {atom} from "recoil"
import {recoilPersist} from "recoil-persist"

const { persistAtom } = recoilPersist();

export const isLoggedInState = atom({
    key:"isLoggedIn",
    default:false,
    effects_UNSTABLE: [persistAtom]
});

export const nameState = atom({
    key:"name",
    default:"guest",
    effects_UNSTABLE: [persistAtom]
})