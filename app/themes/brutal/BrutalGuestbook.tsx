import GuestbookClient from "@/app/guestbook/GuestbookClient";
import DoNotTapButton from "@/components/DoNotTapButton";
import { FormInput, FileWarning } from "lucide-react";

export default function BrutalGuestbook() {
  return (
    <div className="space-y-16 pb-10 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen">
      
      {/* Header */}
      <div className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow relative">
        <div className="flex items-center gap-4 mb-4">
          <FormInput className="w-12 h-12" strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
            DATA_ENTRY_FORM
          </h1>
        </div>
        <div className="bg-black text-[#f4f4f0] p-4 font-bold uppercase tracking-widest inline-block mt-4">
          RECORD_SUBMISSION_PORTAL
        </div>
      </div>
      
      <div className="border-8 border-black p-6 sm:p-10 bg-[#f4f4f0] brutal-shadow">
        <div className="flex items-center gap-3 mb-8 border-b-8 border-black pb-4">
          <FileWarning className="w-8 h-8" strokeWidth={2} />
          <h2 className="text-2xl font-black uppercase tracking-tighter">PUBLIC_RECORDS</h2>
        </div>
        
        {/* We use a specific container class to apply brutal CSS to the guestbook components if needed */}
        <div className="brutal-guestbook-container">
          <GuestbookClient />
        </div>
      </div>

      <div className="pt-20 flex justify-center">
        <div className="border-8 border-black p-6 bg-black brutal-shadow text-[#f4f4f0] relative">
          <div className="absolute -top-4 -left-4 bg-red-600 text-white font-black px-2 py-1 transform -rotate-12 border-4 border-black">
            DANGER
          </div>
          <DoNotTapButton />
        </div>
      </div>
      
      {/* Global CSS for guestbook text overrides to fit the brutal theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .brutal-guestbook-container input,
        .brutal-guestbook-container textarea,
        .brutal-guestbook-container button {
          font-family: inherit;
          border-width: 4px;
          border-color: black;
          border-radius: 0;
          font-weight: bold;
          text-transform: uppercase;
        }
        .brutal-guestbook-container button {
          background-color: black;
          color: #f4f4f0;
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
          transition: all 0.1s;
        }
        .brutal-guestbook-container button:active {
          box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
          transform: translate(4px, 4px);
        }
      `}} />
    </div>
  );
}
