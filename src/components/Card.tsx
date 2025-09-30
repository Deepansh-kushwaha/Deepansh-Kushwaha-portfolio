
interface props{
 image1:string,
 image2:string
}
function Card(props:props) {
  return (<>
         
        <div className="w-1/2 h-full group relative transition-all  hover:rounded-4xl overflow-hidden hover:border-2 border-blue-100">
        <img className="w-full h-full bg-cover" src={props.image1} alt="cyber punk " />
        <div className="absolute transition-all top-0 left-0 h-full w-full flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100"> 
          <h2 className="text-white text-5xl font-bold border-1 border-white px-6 py-2 rounded-full font-[font5] uppercase">Cyberpunk</h2>
        </div>
        </div>
        <div className="w-1/2 h-full group relative transition-all  hover:rounded-4xl overflow-hidden hover:border-2 border-blue-100">
        <img className="w-full h-full bg-cover" src={props.image2} alt="cyber punk " />
        <div className="absolute transition-all top-0 left-0 h-full w-full flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100"> 
          <h2 className="text-white text-5xl font-bold border-1 border-white px-6 py-2 rounded-full font-[font5] uppercase">Cyberpunk</h2>
        </div>
        </div>

      </>
  )
}

export default Card
