"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TogetherFooter() {
  return (
    <footer className="relative w-full bg-[#fbfbfb] text-black overflow-hidden pt-24 pb-8 flex flex-col items-center">
      {/* Dynamic styles for icon transition */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer_link .transition-icon {
          opacity: 0;
          transform: translateX(-50%);
          transition: all 0.3s ease;
        }
        .footer_link:hover .transition-icon {
          opacity: 1;
          transform: translateX(0%);
        }
      `}} />

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          loading="lazy"
          src="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69947589ea59a1ad48520a9b_footer-bg.avif"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] px-4 md:px-8 flex flex-col items-center">
        
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center mt-8 mb-20 lg:mb-28">
          <h2 className="text-[32px] md:text-4xl lg:text-[40px] font-semibold tracking-[-0.02em] mb-4 text-black">
            Start building on Softree Technology
          </h2>
          <div className="opacity-50 mb-7">
            <p className="text-[15px] font-medium max-w-2xl px-4">
              From enterprise solutions and custom development to large-scale production deployment
            </p>
          </div>
          <div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded text-[10px] uppercase font-bold tracking-[0.2em] hover:scale-[1.02] transition-transform duration-300"
            >
              Get Started now
            </a>
          </div>
        </div>

        {/* Footer Box */}
        <div className="w-full bg-white/90 backdrop-blur-3xl border border-white/60 rounded-[32px] md:rounded-[40px] p-8 md:p-14 lg:p-[72px_72px_48px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          {/* Main Layout: Logo on Left, 4 Columns on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-24 w-full">
            
            {/* Logo Column */}
            <div className="lg:col-span-3 pt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 43 40" fill="none">
                <path d="M41.5581 5.36307C38.5903 0.237447 32.0163 -1.51861 26.876 1.44026C23.5688 3.34406 21.6606 6.71038 21.5104 10.2524L32.252 10.2661L32.2507 11.1845H21.5098C21.579 12.8585 22.0431 14.5267 22.9414 16.0784C25.9092 21.204 32.4831 22.9601 37.6241 20.0006C42.7651 17.0417 44.5265 10.4874 41.5581 5.36177V5.36307Z" fill="#EF2CC1"></path>
                <path d="M1.44161 5.35989C-1.52614 10.4855 0.235183 17.0392 5.37553 19.9987C8.68275 21.9025 12.5612 21.8667 15.713 20.2258L10.3546 10.9444L11.153 10.4862L16.5232 19.7598C17.9424 18.8629 19.16 17.6282 20.0582 16.0765C23.026 10.9509 21.2647 4.39725 16.1243 1.43772C10.9827 -1.5218 4.40935 0.23426 1.44161 5.35989Z" fill="#CAAEF5"></path>
                <path d="M21.4978 40.0003C27.4339 40.0003 32.2459 35.2027 32.2459 29.2843C32.2459 25.4767 30.2757 22.1462 27.2747 20.245L21.8915 29.5128L21.0944 29.0526L26.4645 19.779C24.9761 19.0018 23.2944 18.5684 21.4972 18.5684C15.561 18.5684 10.749 23.3659 10.749 29.2843C10.749 35.2027 15.561 40.0003 21.4972 40.0003H21.4978Z" fill="#FC4C02"></path>
              </svg>
            </div>

            {/* Links Grid (4 Columns) */}
            <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 w-full">
              
              {/* Column 1: Services */}
              <div>
                <div className="border-t border-black/10 pt-3 mb-4">
                  <p className="text-[10px] text-black/40 font-semibold tracking-[0.1em] uppercase">Services</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    { name: "Full Stack Development", href: "/services" },
                    { name: "Mobile App Dev", href: "/services" },
                    { name: "SharePoint Solutions", href: "/services" },
                    { name: "Power Platform", href: "/services" },
                    { name: "Cloud & DevOps", href: "/services" },
                    { name: "AI & ML Solutions", href: "/services" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                        {link.name}
                        <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Technologies */}
              <div>
                <div className="border-t border-black/10 pt-3 mb-4">
                  <p className="text-[10px] text-black/40 font-semibold tracking-[0.1em] uppercase">Technologies</p>
                </div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/services" className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                      See all technologies
                      <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </li>
                  {[
                    { name: "React / Next.js", href: "/services" },
                    { name: "Flutter", href: "/services" },
                    { name: "Angular", href: "/services" },
                    { name: "Node.js", href: "/services" },
                    { name: ".NET / C#", href: "/services" },
                    { name: "Python", href: "/services" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                        {link.name}
                        <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Developers & Pricing stacked */}
              <div className="flex flex-col gap-10">
                {/* Developers */}
                <div>
                  <div className="border-t border-black/10 pt-3 mb-4">
                    <p className="text-[10px] text-black/40 font-semibold tracking-[0.1em] uppercase">Developers</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <a href="https://www.softreetechnology.com/blog" target="_blank" rel="noopener noreferrer" className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                        Blog
                        <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.softreetechnology.com" target="_blank" rel="noopener noreferrer" className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                        Docs
                        <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Pricing */}
                <div>
                  <div className="border-t border-black/10 pt-3 mb-4">
                    <p className="text-[10px] text-black/40 font-semibold tracking-[0.1em] uppercase">Pricing</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {[
                      { name: "Pricing overview", href: "https://www.softreetechnology.com/get-a-quote/", ext: true },
                      { name: "Dedicated Teams", href: "/services", ext: false },
                      { name: "Project Based", href: "/services", ext: false },
                      { name: "Enterprise", href: "/contact", ext: false }
                    ].map((link) => (
                      <li key={link.name}>
                        <a href={link.href} target={link.ext ? "_blank" : undefined} rel={link.ext ? "noopener noreferrer" : undefined} className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                          {link.name}
                          <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 4: Resources */}
              <div>
                <div className="border-t border-black/10 pt-3 mb-4">
                  <p className="text-[10px] text-black/40 font-semibold tracking-[0.1em] uppercase">Resources</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    { name: "Blog", href: "https://www.softreetechnology.com/blog", ext: true },
                    { name: "About us", href: "/about-us", ext: false },
                    { name: "Careers", href: "https://www.softreetechnology.com/careers/", ext: true },
                    { name: "Customer Stories", href: "/case-studies", ext: false },
                    { name: "Support", href: "/contact", ext: false }
                  ].map((link) => (
                    <li key={link.name}>
                      <a href={link.href} target={link.ext ? "_blank" : undefined} rel={link.ext ? "noopener noreferrer" : undefined} className="footer_link group flex items-center text-[13px] text-[#222] hover:text-black transition-colors font-medium">
                        {link.name}
                        <span className="hidden lg:block ml-2 text-black/30 transition-icon">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Giant Wordmark Logo */}
          <div className="w-full flex justify-center mt-auto mb-10 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 891 205" fill="none" className="max-w-[891px] w-full h-auto text-black mx-auto">
              <text
                x="0"
                y="175"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="200"
                fontWeight="800"
                letterSpacing="-8"
                fill="currentColor"
                fillOpacity="0.08"
              >
                softree.
              </text>
            </svg>
            {/* Accent dot */}
            <div className="absolute" style={{ bottom: "28%", right: "32%", width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FC4C02" }} />
          </div>

          {/* Meta Links & Copyright */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 w-full mt-2">
            
            {/* Copyright Label (Matches Logo Width) */}
            <div className="lg:col-span-3 flex items-end">
              <p className="text-[9px] text-[#777] font-mono tracking-widest uppercase leading-relaxed font-semibold">
                © {new Date().getFullYear()} Softree Technology.<br />All Rights Reserved.
              </p>
            </div>

            {/* Nav & Socials (Matches Links Width) */}
            <div className="lg:col-span-9 flex justify-between items-end w-full">
              <div className="flex items-center gap-6">
                <a href="https://www.softreetechnology.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-black/60 font-medium hover:text-black transition-colors">
                  Privacy Policy
                </a>
                <a href="https://www.softreetechnology.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-black/60 font-medium hover:text-black transition-colors">
                  Terms of service
                </a>
              </div>

              <div className="flex items-center gap-6 text-black">
                <a href="https://www.facebook.com/softreetechnology" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M16.9308 3.76368C15.6561 3.17878 14.2892 2.74785 12.8599 2.50104C12.8339 2.49627 12.8079 2.50818 12.7945 2.53198C12.6187 2.84466 12.4239 3.25258 12.2876 3.5732C10.7503 3.34306 9.22099 3.34306 7.71527 3.5732C7.57887 3.24545 7.37707 2.84466 7.20048 2.53198C7.18707 2.50897 7.16107 2.49707 7.13504 2.50104C5.70659 2.74706 4.33963 3.17799 3.06411 3.76368C3.05307 3.76844 3.04361 3.77638 3.03732 3.78669C0.444493 7.66033 -0.265792 11.4387 0.0826501 15.1703C0.0842267 15.1886 0.0944749 15.206 0.108665 15.2171C1.81934 16.4734 3.47642 17.2361 5.10273 17.7416C5.12876 17.7496 5.15634 17.74 5.1729 17.7186C5.55761 17.1933 5.90054 16.6393 6.19456 16.0568C6.21192 16.0227 6.19535 15.9822 6.15989 15.9687C5.61594 15.7624 5.098 15.5108 4.59977 15.2251C4.56037 15.2021 4.55721 15.1457 4.59347 15.1187C4.69831 15.0402 4.80318 14.9584 4.9033 14.8759C4.92141 14.8608 4.94665 14.8576 4.96794 14.8671C8.24107 16.3615 11.7846 16.3615 15.0191 14.8671C15.0404 14.8568 15.0657 14.86 15.0846 14.8751C15.1847 14.9576 15.2895 15.0402 15.3952 15.1187C15.4314 15.1457 15.4291 15.2021 15.3897 15.2251C14.8914 15.5163 14.3735 15.7624 13.8288 15.9679C13.7933 15.9814 13.7775 16.0227 13.7949 16.0568C14.0952 16.6385 14.4381 17.1924 14.8157 17.7178C14.8315 17.74 14.8599 17.7496 14.8859 17.7416C16.5201 17.2361 18.1772 16.4734 19.8879 15.2171C19.9028 15.206 19.9123 15.1894 19.9139 15.1711C20.3309 10.857 19.2154 7.10956 16.9568 3.78748C16.9513 3.77638 16.9419 3.76844 16.9308 3.76368ZM6.68335 12.8982C5.69792 12.8982 4.88594 11.9935 4.88594 10.8824C4.88594 9.77134 5.68217 8.86664 6.68335 8.86664C7.69239 8.86664 8.49651 9.77928 8.48073 10.8824C8.48073 11.9935 7.68451 12.8982 6.68335 12.8982ZM13.329 12.8982C12.3435 12.8982 11.5316 11.9935 11.5316 10.8824C11.5316 9.77134 12.3278 8.86664 13.329 8.86664C14.338 8.86664 15.1421 9.77928 15.1264 10.8824C15.1264 11.9935 14.338 12.8982 13.329 12.8982Z" />
                  </svg>
                </a>
                <a href="https://x.com/softreetechnology" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15.2706 1.66602H18.0818L11.9401 8.72584L19.1654 18.3327H13.5081L9.07706 12.5062L4.00699 18.3327H1.19406L7.76323 10.7814L0.832031 1.66602H6.63296L10.6382 6.99166L15.2706 1.66602ZM14.284 16.6404H15.8417L5.78653 3.26943H4.11492L14.284 16.6404Z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/softree-technology-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.8105 0.833984C18.5589 0.834053 19.165 1.42262 19.165 2.14746V17.8545C19.1649 18.5794 18.5588 19.1669 17.8105 19.167H2.18652C1.43872 19.1668 0.832039 18.5793 0.832031 17.8545V2.14746C0.832031 1.42273 1.43865 0.834223 2.18652 0.833984H17.8105ZM3.66211 16.1758H6.40527V7.92188H3.66211V16.1758ZM13.1396 7.72852C11.6844 7.72852 11.0316 8.52853 10.667 9.09082V7.92285H7.92383C7.95946 8.69649 7.92411 16.117 7.92383 16.1758H10.667V11.5674C10.667 11.321 10.6844 11.0734 10.7568 10.8975C10.9551 10.4044 11.4071 9.89453 12.165 9.89453C13.1573 9.89462 13.5547 10.6512 13.5547 11.7607V16.1758H16.2979V11.4434C16.2978 8.90836 14.9445 7.72856 13.1396 7.72852ZM5.05176 3.94336C4.11319 3.94354 3.50018 4.5594 3.5 5.36914C3.5 6.16109 4.09509 6.79475 5.01562 6.79492H5.03418C5.99055 6.79484 6.58594 6.16114 6.58594 5.36914C6.56784 4.55924 5.98989 3.94336 5.05176 3.94336Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
