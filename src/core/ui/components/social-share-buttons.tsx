import { Facebook, Linkedin, Twitter } from "lucide-react"
import { cn } from "@/src/core/ui/lib/utils"

type SocialShareButtonsProps = {
  className?: string
}

const socialItems = [
  {
    label: "Compartir en Facebook",
    href: "https://www.facebook.com/sharer/sharer.php?u=https://nexus-academy.dev",
    Icon: Facebook,
  },
  {
    label: "Compartir en X",
    href: "https://twitter.com/intent/tweet?url=https://nexus-academy.dev&text=Descubre%20Nexus%20Academy",
    Icon: Twitter,
  },
  {
    label: "Compartir en LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://nexus-academy.dev",
    Icon: Linkedin,
  },
]

export function SocialShareButtons({ className }: SocialShareButtonsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {socialItems.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
