
interface props{
 image1:string,
 image2:string
}
function Card(props: props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full h-full">
      <div className="w-full md:w-1/2 h-[300px] md:h-full group relative overflow-hidden rounded-[2.5rem] bg-[var(--surface-container-low)] soft-shadow transition-all duration-500 hover:scale-[1.01]">
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" src={props.image1} alt="Project" />
        <div className="absolute inset-0 flex justify-center items-center bg-[var(--surface-container-highest)]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h2 className="label-md px-8 py-4 bg-[var(--surface)] text-[var(--on-surface)] rounded-full soft-shadow transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            View Case Study
          </h2>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 h-[300px] md:h-full group relative overflow-hidden rounded-[2.5rem] bg-[var(--surface-container-low)] soft-shadow transition-all duration-500 hover:scale-[1.01]">
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" src={props.image2} alt="Project" />
        <div className="absolute inset-0 flex justify-center items-center bg-[var(--surface-container-highest)]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h2 className="label-md px-8 py-4 bg-[var(--surface)] text-[var(--on-surface)] rounded-full soft-shadow transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            View Case Study
          </h2>
        </div>
      </div>
    </div>
  )
}


export default Card
