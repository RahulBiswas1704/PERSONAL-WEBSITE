export default function PixelUses({ uses }: { uses: any[] }) {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black dark:border-white pb-8 gap-8">
          <div>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
              USES
            </h1>
            <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
              The Gear.
            </p>
          </div>
        </header>

        <div className="space-y-32">
          {uses.map((category, idx) => (
            <section key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-16">
              
              <div className="md:col-span-4">
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter sticky top-24">
                  {category.category}
                </h2>
              </div>
              
              <div className="md:col-span-8 space-y-12 border-t-2 border-black dark:border-white pt-8">
                {category.items.map((item: any, itemIdx: number) => (
                  <div key={itemIdx} className="group">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 group-hover:italic transition-all">
                      {item.name}
                    </h3>
                    <p className="text-lg md:text-xl font-bold uppercase max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
