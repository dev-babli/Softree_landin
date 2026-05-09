"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useState, type FormEvent, type ReactNode } from "react"

type Status = "idle" | "submitting" | "success" | "error"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const services = [
  "UI UX Design",
  "Web Development",
  "Brand Identity",
  "Growth Ops",
  "Content Strategy",
]

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/[0.055] text-white transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white hover:text-[#09090d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]/70"
    >
      <span className="h-[22px] w-[22px]">{children}</span>
    </a>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <path
        d="M16.6957 0H5.56522C2.49322 0 0 2.49322 0 5.56522V16.6957C0 19.7677 2.49322 22.2609 5.56522 22.2609H16.6957C19.7677 22.2609 22.2609 19.7677 22.2609 16.6957V5.56522C22.2609 2.49322 19.7677 0 16.6957 0ZM11.1304 16.6957C8.05844 16.6957 5.56522 14.2024 5.56522 11.1304C5.56522 8.05844 8.05844 5.56522 11.1304 5.56522C14.2024 5.56522 16.6957 8.05844 16.6957 11.1304C16.6957 14.2024 14.2024 16.6957 11.1304 16.6957ZM17.0852 6.2553C16.473 6.2553 15.9722 5.75444 15.9722 5.14226C15.9722 4.53009 16.473 4.02922 17.0852 4.02922C17.6974 4.02922 18.1983 4.53009 18.1983 5.14226C18.1983 5.75444 17.6974 6.2553 17.0852 6.2553Z"
        fill="currentColor"
      />
      <path
        d="M11.1301 14.4703C12.9743 14.4703 14.4693 12.9753 14.4693 11.1311C14.4693 9.28697 12.9743 7.79199 11.1301 7.79199C9.286 7.79199 7.79102 9.28697 7.79102 11.1311C7.79102 12.9753 9.286 14.4703 11.1301 14.4703Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <path
        d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z"
        fill="currentColor"
      />
      <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" fill="currentColor" />
      <path
        d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <path
        d="M12.8552 22.2601V12.1067H16.262L16.7731 8.14849H12.8552V5.62177C12.8552 4.47615 13.172 3.69542 14.8167 3.69542L16.911 3.69456V0.154237C16.5488 0.107172 15.3056 -0.000732422 13.8586 -0.000732422C10.8372 -0.000732422 8.76863 1.84354 8.76863 5.22976V8.14849H5.35156V12.1067H8.76863V22.2601H12.8552Z"
        fill="currentColor"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <path
        d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Field({
  id,
  name,
  type = "text",
  placeholder,
  required,
}: {
  id: string
  name: string
  type?: string
  placeholder: string
  required?: boolean
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="sr-only">{placeholder}</span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-[3.25rem] w-full rounded-none border-0 border-b border-white/14 bg-transparent px-0 text-[15px] font-medium text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-[#ff5812]"
      />
    </label>
  )
}

export default function LightContactSection() {
  const [status, setStatus] = useState<Status>("idle")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    window.setTimeout(() => setStatus("success"), 700)
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#f6f4f0] px-4 py-20 text-[#111] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:radial-gradient(#111_0.7px,transparent_0.7px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2
            aria-label="Let's Talk"
            className="text-[clamp(4.5rem,15vw,14rem)] font-semibold leading-[0.82] tracking-[-0.075em]"
          >
            Let's{" "}
            <span className="relative inline-block text-[#ff5812]">
              Talk
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-2 w-[82%] -translate-x-1/2 rounded-full bg-[#ff5812]/20"
              />
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 34, opacity: 0, scale: 0.985 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
          className="overflow-hidden rounded-[8px] bg-[#09090d] text-white shadow-[0_34px_100px_-50px_rgba(0,0,0,0.75)]"
        >
          <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[0.32fr_1.12fr_1fr]">
            <aside className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <p className="text-[13px] font-semibold tracking-[-0.01em] text-white">
                  Follow us
                </p>
                <div className="mt-5 flex flex-wrap gap-3 lg:flex-col">
                  <SocialIcon href="https://www.instagram.com/" label="Instagram">
                    <InstagramIcon />
                  </SocialIcon>
                  <SocialIcon href="https://linkedin.com/" label="LinkedIn">
                    <LinkedinIcon />
                  </SocialIcon>
                  <SocialIcon href="https://www.facebook.com" label="Facebook">
                    <FacebookIcon />
                  </SocialIcon>
                  <SocialIcon href="https://x.com/" label="X">
                    <XIcon />
                  </SocialIcon>
                </div>
              </div>

              <div className="mt-10 hidden h-px w-full bg-white/10 lg:block" />
            </aside>

            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="grid gap-6 xl:grid-cols-[0.86fr_1fr]">
                  <div className="relative min-h-[300px] overflow-hidden rounded-[6px] bg-white/8">
                    <Image
                      src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69ce260749d7110937223c7f_CTA%20Picture.webp"
                      alt="Person wearing a white hooded jacket and virtual reality headset against a shimmering abstract background."
                      fill
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(9,9,13,0.58)_100%)]"
                    />
                  </div>

                  <div>
                    <p className="text-[18px] font-medium tracking-[-0.02em]">
                      What we offer
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      {services.map((service) => (
                        <div
                          key={service}
                          className="group flex items-center gap-3 border-b border-white/10 py-3"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#ff5812] transition-transform duration-300 group-hover:scale-[1.45]" />
                          <span className="text-sm leading-none text-white/72 transition-colors group-hover:text-white">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[18px] font-medium tracking-[-0.02em]">
                      E-Mail
                    </p>
                    <a
                      href="mailto:contact@softreetechnology.com"
                      className="mt-2 block text-[14px] leading-6 text-white/58 transition-colors hover:text-[#ff5812]"
                    >
                      contact@softreetechnology.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium tracking-[-0.02em]">
                      Office
                    </p>
                    <p className="mt-2 text-[14px] leading-6 text-white/58">
                      Kolkata, West Bengal
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-[18px] font-medium tracking-[-0.02em]">
                    Got a question, challenge, or idea?
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/52">
                    Fill out the form. We&apos;ll get back to you shortly.
                  </p>
                </div>

                <div className="my-7 h-px w-full bg-white/10" />

                <form
                  id="email-form"
                  name="email-form"
                  aria-label="Email Form"
                  onSubmit={handleSubmit}
                  className="flex flex-1 flex-col"
                >
                  <div className="grid gap-5">
                    <Field id="CTA-Name" name="CTA-Name" placeholder="Full Name" />
                    <Field id="email" name="email" type="email" placeholder="E-Mail" required />
                    <Field id="company-name" name="company" placeholder="Company name" />
                    <label className="block" htmlFor="field">
                      <span className="sr-only">Test Message</span>
                      <textarea
                        id="field"
                        name="field"
                        placeholder="Test Message"
                        maxLength={5000}
                        className="min-h-[142px] w-full resize-none rounded-none border-0 border-b border-white/14 bg-transparent px-0 py-4 text-[15px] font-medium text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-[#ff5812]"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-8 inline-flex h-14 w-full items-center justify-between rounded-full bg-[#ff5812] px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    <span>{status === "submitting" ? "Please wait..." : "Submit"}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                      strokeWidth={2}
                    />
                  </button>

                  {status === "success" && (
                    <p
                      role="region"
                      aria-label="Email Form success"
                      className="mt-5 text-sm leading-6 text-white/68"
                    >
                      Thanks. Our team will get back to you within one business day.
                    </p>
                  )}

                  {status === "error" && (
                    <p
                      role="region"
                      aria-label="Email Form failure"
                      className="mt-5 text-sm leading-6 text-[#ff8c70]"
                    >
                      Submission failed. Please try again in a moment.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
