export default function PixelMe() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 border-b-2 border-black dark:border-white pb-8">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
            About<br/>Me
          </h1>
          <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
            Curious dropout. Self-taught dev. Lifelong learner.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-b-2 border-black dark:border-white pb-24">
          <div className="md:col-span-5 text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            <p className="mb-8">I BUILD</p>
            <p className="mb-8 italic">STUFF</p>
            <p className="mb-8">THAT</p>
            <p className="mb-8 italic">WORKS.</p>
          </div>
          
          <div className="md:col-span-7 flex flex-col justify-end text-xl md:text-2xl font-bold uppercase leading-snug space-y-8">
            <p>
              <span className="text-4xl md:text-6xl float-left mr-4 mt-2 font-black leading-none">H</span>
              ey! I'm Rahul. Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me.
            </p>
            <p>
              My journey hasn't been a straight line—from dropping out of engineering, to working as a System and Project Manager, to chasing the dream of being a Seafarer, and ultimately teaching myself to build full-stack web applications.
            </p>
            <p>
              Whether it's managing unexpected challenges in a corporate project or architecting new digital products from scratch, I thrive on continuous growth.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
