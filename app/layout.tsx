import type { Metadata, Viewport } from "next";
import { Anton, Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPAMMA — Central PA MMA // The Fighter System",
  description:
    "Central PA MMA, State College. Brazilian Jiu-Jitsu, Muay Thai & Boxing, MMA, Youth Martial Arts. 70+ hours of training a week. $0 startup, no contracts. Up to 1 month free.",
};

export const viewport: Viewport = {
  themeColor: "#060507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-void">
      <body
        className={`${anton.variable} ${rajdhani.variable} ${inter.variable} ${jetbrains.variable} bg-void text-bone font-body antialiased`}
      >
        {children}
        {/* pre-paint deep link: /?at=<section-id> lands the first frame there;
            &mode=shift translates the body instead of scrolling (screenshot rigs) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search);if(q.has("noboot"))sessionStorage.setItem("cpamma-booted","1");var a=q.get("at");if(!a)return;var e=document.getElementById(a);if(!e)return;var m=q.get("mode");if(m==="solo"){var p=e;while(p.parentElement&&p.parentElement.tagName!=="MAIN")p=p.parentElement;var sib=p.parentElement?[].slice.call(p.parentElement.children):[];for(var i=0;i<sib.length;i++){if(sib[i]===p)break;sib[i].style.display="none";}return;}var r=e.getBoundingClientRect();var t=Math.max(0,r.top+window.scrollY+r.height/2-innerHeight/2);if(m==="shift"){document.body.style.transform="translateY(-"+t+"px)";}else{window.scrollTo(0,t);}}catch(_){}})();`,
          }}
        />
      </body>
    </html>
  );
}
