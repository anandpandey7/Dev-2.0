import { useState } from 'react'
import { networkAtom, jobsAtom, messagingAtom, notificationsAtom, totalNotiificationSelector } from './atoms'
import { RecoilRoot, selector, useRecoilValue, useSetRecoilState } from 'recoil'

function App() {
  return(
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )
}

function MainApp(){
  const networkNotificationCount = useRecoilValue(networkAtom)
  const jobsNotificationCount = useRecoilValue(jobsAtom)
  const messagingNotificationCount = useRecoilValue(messagingAtom)
  const notificationsNotificationCount = useRecoilValue(notificationsAtom)
  const totalNotificationCount = useRecoilValue(totalNotiificationSelector)


  return (
    <>
      <button>Home</button>
      <button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
      <button>Jobs ({jobsNotificationCount >= 100 ? "99+" : jobsNotificationCount})</button>
      <button>Messages ({messagingNotificationCount >= 100 ? "99+" : messagingNotificationCount})</button>
      <button>Notifications ({notificationsNotificationCount >= 100 ? "99+" : notificationsNotificationCount})</button>
      <button>Me({totalNotificationCount})</button>
    </>
  )
}
export default App
