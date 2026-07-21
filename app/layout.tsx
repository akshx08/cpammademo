import type { Metadata, Viewport } from "next";
import { Anton, Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";
import SiteNav from "@/components/SiteNav";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://cpammademo.vercel.app"),
  title: {
    default: "CPAMMA | Martial Arts Gym in State College, PA",
    template: "%s | CPAMMA",
  },
  description:
    "Central PA MMA, State College. Brazilian Jiu-Jitsu, Muay Thai & Boxing, MMA, Youth Martial Arts, Women's Kickboxing. 70+ hours of training a week. $0 startup, no contracts. Up to 1 month free.",
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
        <Atmosphere />
        <SiteNav />
        <SmoothScroll>
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
        {/* pre-paint deep link: /?at=<section-id> lands the first frame there;
            &mode=shift translates the body, &mode=solo isolates the section (screenshot rigs) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search);if(q.has("noboot"))sessionStorage.setItem("cpamma-booted","1");var a=q.get("at");if(!a)return;var e=document.getElementById(a);if(!e)return;var m=q.get("mode");if(m==="solo"){var p=e;while(p.parentElement&&p.parentElement.tagName!=="MAIN")p=p.parentElement;var sib=p.parentElement?[].slice.call(p.parentElement.children):[];for(var i=0;i<sib.length;i++){if(sib[i]===p)break;sib[i].style.display="none";}return;}var r=e.getBoundingClientRect();var t=Math.max(0,r.top+window.scrollY+r.height/2-innerHeight/2);if(m==="shift"){document.body.style.transform="translateY(-"+t+"px)";}else{window.scrollTo(0,t);}}catch(_){}})();`,
          }}
        />
      </body>
    </html>
  );
}
