import { GraduationCap, Anchor, Code2, Rocket } from "lucide-react";

export default function JourneyTimeline() {
  const events = [
    {
      year: "2019",
      title: "The Engineering Route",
      description: "Finished schooling at Krishnanagar AV High School and enrolled in a Diploma in Electrical Engineering at MIET.",
      icon: GraduationCap,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
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
      year: "2021",
      title: "The Seafarer Dream",
      description: "Explored a career as a seafarer, lured by the promise of high pay and traveling the world.",
      icon: Anchor,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-950",
    },
    {
      year: "Today",
      title: "Self-Taught Full-Stack Dev",
      description: "Building digital products that reach people globally. Everything I know, I learned myself through the web.",
      icon: Code2,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    }
  ];

  return (
    <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 my-10 pb-4">
      {events.map((event, i) => (
        <div key={i} className="relative pl-8 md:pl-10 group">
          {/* Timeline Dot */}
          <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full ${event.bgColor} flex items-center justify-center ring-4 ring-background transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
            <event.icon className={`w-4 h-4 ${event.color}`} />
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono font-bold tracking-widest text-muted-light">{event.year}</span>
            <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">{event.title}</h3>
            <p className="text-sm text-muted leading-relaxed mt-1 max-w-md">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
