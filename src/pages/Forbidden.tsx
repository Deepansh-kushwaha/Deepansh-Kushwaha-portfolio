import { useNavigate } from "react-router"
function Forbidden() {
    const navigate = useNavigate()
        setInterval(( ) => {
        navigate(-1)
    }, 3000)
  return (
    <div className="h-screen w-full relative bg-[var(--surface)] flex flex-col items-center justify-center">
      <p className="label-md text-[var(--primary)] mb-4 reveal stagger-1">Error 404</p>
      <h1 className='display-lg text-[var(--on-surface)] reveal stagger-2'>PAGE NOT <span className="text-[var(--primary)]">FOUND</span></h1>
      <p className="body-lg opacity-60 mt-8 reveal stagger-3 italic">Redirecting you back to the flow...</p>
    </div>
  )
}

export default Forbidden
