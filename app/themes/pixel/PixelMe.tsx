import { BookOpen, Monitor, GraduationCap, Rocket, Briefcase, HardHat, Anchor, Code2, AlertTriangle, Baby, ArrowUpRight } from "lucide-react";

export default function PixelMe() {
  const events = [
    { year: "2003", label: "APR", title: "Hello World", desc: "Born in Krishnanagar, West Bengal.", icon: Baby },
    { year: "2019", label: "MAR", title: "Diploma In IT", desc: "Completed with 92.5% grades.", icon: Monitor },
    { year: "2019", label: "AUG", title: "Dropped Out", desc: "Left Engineering after the 3rd semester.", icon: AlertTriangle },
    { year: "2020", label: "COV", title: "The Pivot", desc: "Took control of my own education during lockdown.", icon: Rocket },
    { year: "2020", label: "-21", title: "System Manager", desc: "NNTUS E-Commerce — Managing accounts and systems.", icon: Briefcase },
    { year: "2021", label: "-25", title: "Project Manager", desc: "ZK Construction — Managing projects and internal systems.", icon: HardHat },
    { year: "2025", label: "JUL", title: "The Seafarer", desc: "Explored a career as a seafarer.", icon: Anchor },
    { year: "NOW", label: "DEV", title: "Full-Stack Dev", desc: "Building digital products that reach people globally.", icon: Code2 }
  ];

  const socials = [
    { name: "GITHUB", url: "https://github.com/RahulBiswas1704" },
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/rahul-biswas1704/" },
    { name: "X (TWITTER)", url: "https://x.com/rahulbiswas1704" },
    { name: "EMAIL", url: "mailto:rahul.biswas1704@gmail.com" },
  ];

  return (
    <section id="me" className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5 relative">
            <header className="sticky top-32 pb-8 z-20">
              <h1 className="text-6xl sm:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] mb-8 break-all sm:break-normal text-stroke-2 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-default">
                About<br />Me
              </h1>
              <p className="text-xl md:text-2xl font-bold max-w-sm uppercase opacity-80">
                Curious dropout. Self-taught dev. Lifelong learner.
              </p>
            </header>
          </div>

          <div className="lg:col-span-7 flex flex-col pt-4 md:pt-16 z-10">
            <div className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-[-0.04em] leading-[0.85] text-stroke-2 mb-16 cursor-default transition-all duration-300 hover:text-[#CCFF00] dark:hover:text-[#CCFF00]">
              <p className="mb-8">I BUILD</p>
              <p className="mb-8 italic">STUFF</p>
              <p className="mb-8">THAT</p>
              <p className="mb-8 italic">WORKS.</p>
            </div>

            {/* Playful Quirky Cards Bio */}
            <div className="flex flex-col space-y-6 sm:space-y-12 my-12">
              <div className="transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 bg-black text-white dark:bg-white dark:text-black border border-black/10 dark:border-white/10 p-6 sm:p-10 shadow-[8px_8px_0_0_#CCFF00] relative w-full sm:w-[90%] self-start group cursor-default">
                <span className="text-6xl float-left mr-4 mt-1 font-black leading-none text-[#CCFF00] group-hover:animate-pulse">H</span>
                <p className="text-lg md:text-2xl font-bold uppercase leading-snug">
                  ey! I'm Rahul. Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me.
                </p>
              </div>

              <div className="transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 bg-[#F0F0F0] text-black dark:bg-[#111111] dark:text-white border-2 border-black dark:border-white p-6 sm:p-10 shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:shadow-[12px_12px_0_0_#CCFF00] dark:hover:shadow-[12px_12px_0_0_#CCFF00] relative w-full sm:w-[95%] self-end cursor-default">
                <p className="text-lg md:text-2xl font-bold uppercase leading-snug opacity-90">
                  My journey hasn't been a straight line—from dropping out of engineering, to working as a System and Project Manager, to chasing the dream of being a Seafarer, and ultimately teaching myself to build full-stack web applications.
                </p>
              </div>

              <div className="transform -rotate-1 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 bg-black text-[#CCFF00] dark:bg-white dark:text-black border border-black dark:border-white p-6 sm:p-10 shadow-xl relative w-full sm:w-[85%] self-center cursor-default">
                <p className="text-lg md:text-2xl font-bold uppercase leading-snug">
                  Whether it's managing unexpected challenges in a corporate project or architecting new digital products from scratch, I thrive on continuous growth.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Playful Horizontal Timeline Marquee / Grid */}
      <div className="w-full border-y border-black/20 dark:border-white/20 bg-black text-[#CCFF00] py-8 overflow-hidden relative group">
        <h2 className="text-center font-black text-4xl tracking-widest uppercase mb-12">Timeline</h2>

        <div className="flex flex-nowrap overflow-x-auto gap-8 px-8 pb-12 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {events.map((event, i) => (
            <div key={i} className="snap-center shrink-0 w-[300px] h-[300px] border-2 border-[#CCFF00] p-6 flex flex-col justify-between hover:bg-[#CCFF00] hover:text-black transition-colors duration-300 group/card relative overflow-hidden">
              <div className="absolute -right-8 -bottom-12 text-[10rem] font-black opacity-20 group-hover/card:opacity-40 transition-opacity duration-300 leading-none">
                {event.year}
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono font-bold text-xl px-2 py-1 bg-[#CCFF00] text-black group-hover/card:bg-black group-hover/card:text-[#CCFF00] transition-colors">
                  {event.label}
                </span>
                <event.icon className="w-8 h-8 opacity-80" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                  {event.title}
                </h3>
                <p className="font-bold opacity-80 text-sm uppercase leading-tight">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Massive Social Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 flex flex-col gap-4">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-b border-black/20 dark:border-white/20 pb-4 transition-all duration-300 hover:pl-8"
          >
            <span className="text-5xl sm:text-7xl md:text-[6rem] font-black uppercase tracking-tighter text-stroke-2 hover-fill transition-all duration-300">
              {social.name}
            </span>
            <ArrowUpRight className="w-12 h-12 sm:w-16 sm:h-16 opacity-50 group-hover:opacity-100 group-hover:text-[#CCFF00] transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
          </a>
        ))}
      </div>

    </section>
  );
}
