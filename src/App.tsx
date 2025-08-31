import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import { Home } from "./pages/Home"
import NoteDetail from "./pages/NoteDetail"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useCurrentUserStore } from "./modules/auth/current-user.state"
import { useEffect, useState } from "react"
import { authRepository } from "./modules/auth/auth.repository"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    // 初回ロード時にログイン状態を確認してグローバルステートに保存
    setSession();
  }, [])

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  }

  // ログイン状態の確認中はローディング表示し、この下の画面を表示しない
  if(isLoading) return <div>Loading...</div>


  return (
    <>
      <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path='/notes/:id' element={<NoteDetail />} /> 
          </Route> 
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      
      </BrowserRouter>
    </>
  )
}

export default App
