"use client";

import { useEffect } from "react";

import ResumeThemeRouter from "@/components/ResumeThemeRouter";

export default function ResumePage() {
  return (
    <>
      <ResumeThemeRouter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2024-01-01T00:00:00Z",
            "dateModified": "2024-05-01T00:00:00Z",
            "mainEntity": {
              "@type": "Person",
              "name": "Rahul Biswas",
              "jobTitle": "System & Project Manager",
              "hasOccupation": {
                "@type": "Occupation",
                "name": "System and Project Manager",
                "estimatedSalary": []
              }
            }
          })
        }}
      />
    </>
  );
}
