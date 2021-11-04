import { Button } from "../../components"
import { useAuth } from "../../lib/hooks"

const MainTable = () => {
  const auth = useAuth()
  return (
    <div>
      table
      <Button onClick={() => auth.signout()} >Log out</Button>
    </div>
  )
}

export default MainTable