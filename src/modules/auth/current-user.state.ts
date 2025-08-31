import { User } from "@supabase/supabase-js"
import { atom, useAtom } from "jotai"

// Userがあればログイン済み、なければ未ログイン
const currentUserAtom = atom<User>();
export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return {currentUser, set: setCurrentUser};
};
//  使い方例
// const currentUserStore = useCurrentUserStore();
// currentUserStore.set(userData); データの追加
// currentUserStore.currentUser;  データの参照