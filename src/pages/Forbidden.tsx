import { useNavigate } from "react-router"
function Forbidden() {
    const navigate = useNavigate()
        setInterval(( ) => {
        navigate(-1)
    }, 3000)
  return (
    <div className="h-screen w-full relative">
      <h1 className='text-3xl text-zinc-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>404 NOT FOUND</h1>
    </div>
  )
}

export default Forbidden
