import { BookOpen, Monitor, GraduationCap, Rocket, Briefcase, HardHat, Anchor, Code2, AlertTriangle, Baby } from "lucide-react";

export default function JourneyTimeline() {
  const events = [
    {
      year: "Apr 2003",
      title: "Hello World",
      description: "Born in Krishnanagar, West Bengal.",
      icon: Baby,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      year: "Jan 2013 – Feb 2019",
      title: "Krishnanagar A.V. High School",
      description: "Completed Secondary Exam with Marks of 310.",
      icon: BookOpen,
      color: "text-zinc-500 dark:text-zinc-400",
      bgColor: "bg-zinc-100 dark:bg-zinc-900",
    },
    {
      year: "Mar 2019 – Feb 2020",
      title: "Diploma In Information Technology",
      description: "Krishnanagar Jawaharlal Nehru National Youth Computer Centre. Completed with 92.5% grades [370 out of 400].",
      icon: Monitor,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      year: "2019",
      title: "The Engineering Route",
      description: "Finished schooling at Krishnanagar AV High School and enrolled in a Diploma in Electrical Engineering at MIET.",
      icon: GraduationCap,
      color: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
    {
      year: "Aug 2019 – Dropped out",
      title: "Modern Institute of Engineering & Technology",
      description: "Diploma In Electrical Engineering. 1st Sem completed with a cumulative GPA of 4.5. 2nd Sem completed with a cumulative GPA of 6.9.",
      icon: AlertTriangle,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
    {
      year: "2020",
      title: "The Pivot (Lockdown)",
      description: "Dropped out after the third semester to take control of my own education. Realized a piece of paper isn't everything.",
      icon: Rocket,
      color: "text-rose-500 dark:text-rose-400",
      bgColor: "bg-rose-100 dark:bg-rose-950",
    },
    {
      year: "Mar 2020 – Oct 2021",
      title: "System Manager",
      description: "Unique Star (NNTUS E-Commerce India Pvt. Ltd.) — Managing accounts, controlling the admin panel, creating marketing-related graphics, and designing high-quality presentations.",
      icon: Briefcase,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-950",
    },
    {
      year: "Nov 2021 – Apr 2025",
      title: "Project Manager",
      description: "ZK Construction (ZK Construction Project Pvt. Ltd.) — Managing projects, organizing the company's profile, executing planning, and improving internal systems.",
      icon: HardHat,
      color: "text-amber-600 dark:text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      year: "Jul 2025",
      title: "The Seafarer Dream",
      description: "Explored a career as a seafarer, lured by the promise of high pay and traveling the world.",
      icon: Anchor,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-950",
    },
    {
      year: "2019 – Present",
      title: "Self-Taught Full-Stack Dev",
      description: "Building digital products that reach people globally. Everything I know, I learned myself through the web.",
      icon: Code2,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    }
  ];

  return (
    <div className="relative border-l-2 border-dashed border-border/60 ml-4 md:ml-6 space-y-14 my-16 pb-4">
      {events.map((event, i) => (
        <div key={i} className="relative pl-10 md:pl-12 group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
          {/* Timeline Dot */}
          <div className={`absolute -left-[18px] top-4 w-9 h-9 rounded-full ${event.bgColor} flex items-center justify-center ring-8 ring-background transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-md z-10`}>
            <event.icon className={`w-4 h-4 ${event.color} transition-transform duration-300 group-hover:scale-110`} />
          </div>
          
          {/* Content Card */}
          <div className="flex flex-col gap-2 p-5 rounded-2xl border-2 border-transparent hover:border-border/60 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-all duration-300 hover:shadow-sm -translate-y-2 group-hover:-translate-y-4">
            <span className="inline-block px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-border/50 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 w-fit transform group-hover:-rotate-2 transition-transform duration-300 shadow-sm">
              {event.year}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors mt-2 font-serif">
              {event.title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mt-1 max-w-xl group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
