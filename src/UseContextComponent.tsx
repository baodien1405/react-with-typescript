import { useContext, useState } from "react";

import UserContext, { UserState } from "./store";

function ConsumerCompomnent() {
  const user = useContext<UserState>(UserContext);

  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  )
}

function UseContextComponent() {
  const [user, setUser] = useState<UserState>({
    first: "Dien",
    last: "Cap"
  })
  return (
    <UserContext.Provider value={user}>
      <ConsumerCompomnent />
      <button onClick={() => {
        setUser({
          first: "Nhu",
          last: "Vo"
        })
      }} >Change context</button>
    </UserContext.Provider>
  )
}

export default UseContextComponent;