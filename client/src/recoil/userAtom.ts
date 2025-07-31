import { atom } from 'recoil';

interface UserState {
  isAuthenticated: boolean;
}

const userAtom = atom<UserState>({
  key: "user",
  default: {
    isAuthenticated: false
  }
});

export default userAtom;
