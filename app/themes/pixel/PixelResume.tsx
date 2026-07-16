import { Download } from "lucide-react";

export default function PixelResume() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black dark:border-white pb-8 gap-8">
          <div>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
              RESUME
            </h1>
            <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
              The Paper Trail.
            </p>
          </div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group shrink-0 inline-flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black border-2 border-transparent hover:bg-transparent hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white px-8 py-4 uppercase font-bold text-xl transition-colors">
            <Download className="w-6 h-6 group-hover:animate-bounce" /> Download PDF
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          <div className="md:col-span-4 border-t-8 border-black dark:border-white pt-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Experience</h2>
          </div>
          
          <div className="md:col-span-8 border-t-2 border-black dark:border-white pt-8 space-y-16">
            
            <div className="group">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2 border-b-2 border-black dark:border-white pb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all">Project Manager</h3>
                <span className="text-lg font-bold uppercase bg-black text-white dark:bg-white dark:text-black px-3 py-1 self-start md:self-auto">Nov 2021 - Present</span>
              </div>
              <p className="text-2xl font-bold uppercase mb-8">ZK Construction</p>
              <ul className="text-lg font-medium uppercase leading-relaxed space-y-4 list-none">
                <li className="flex gap-4"><span className="font-black">→</span> Managing Projects & Coordinating Operations</li>
                <li className="flex gap-4"><span className="font-black">→</span> Organizing Company's Profile & Documentation</li>
                <li className="flex gap-4"><span className="font-black">→</span> Executing and Planning Strategic Roadmaps</li>
                <li className="flex gap-4"><span className="font-black">→</span> Improving Internal Systems for Efficiency</li>
              </ul>
            </div>

            <div className="group">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2 border-b-2 border-black dark:border-white pb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all">System Manager</h3>
                <span className="text-lg font-bold uppercase bg-black text-white dark:bg-white dark:text-black px-3 py-1 self-start md:self-auto">Mar 2020 - Oct 2021</span>
              </div>
              <p className="text-2xl font-bold uppercase mb-8">Unique Star (NNTUS)</p>
              <ul className="text-lg font-medium uppercase leading-relaxed space-y-4 list-none">
                <li className="flex gap-4"><span className="font-black">→</span> Managing Accounts & Client Relations</li>
                <li className="flex gap-4"><span className="font-black">→</span> Control & Maintenance of the Admin Panel</li>
                <li className="flex gap-4"><span className="font-black">→</span> Create Marketing Related Graphics & Materials</li>
                <li className="flex gap-4"><span className="font-black">→</span> Create High Quality Executive Presentations</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mt-24">
          <div className="md:col-span-4 border-t-8 border-black dark:border-white pt-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Education</h2>
          </div>
          
          <div className="md:col-span-8 border-t-2 border-black dark:border-white pt-8 space-y-16">
            <div className="group">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2 border-b-2 border-black dark:border-white pb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all">Diploma In IT</h3>
                <span className="text-lg font-bold uppercase border-2 border-black dark:border-white px-3 py-1 self-start md:self-auto">Mar 2019 - Feb 2020</span>
              </div>
              <p className="text-2xl font-bold uppercase mb-2">Krishnanagar Youth Computer Centre</p>
              <p className="text-lg font-bold uppercase opacity-60">Completed With 92.5% Grades</p>
            </div>

            <div className="group">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2 border-b-2 border-black dark:border-white pb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all">Diploma In Electrical Engineering</h3>
                <span className="text-lg font-bold uppercase border-2 border-black dark:border-white px-3 py-1 self-start md:self-auto">Aug 2019 - Dropped out</span>
              </div>
              <p className="text-2xl font-bold uppercase mb-2">Modern Institute of Engineering & Technology</p>
            </div>
            
            <div className="group">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2 border-b-2 border-black dark:border-white pb-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:italic transition-all">Secondary Exam</h3>
                <span className="text-lg font-bold uppercase border-2 border-black dark:border-white px-3 py-1 self-start md:self-auto">Jan 2013 - Feb 2019</span>
              </div>
              <p className="text-2xl font-bold uppercase mb-2">Krishnanagar A.V. High School</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
