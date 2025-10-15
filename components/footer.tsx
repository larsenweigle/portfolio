import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex gap-3 items-center absolute bottom-[calc(var(--inset)+0.8rem)] md:bottom-[calc(var(--inset)+1.5rem)] left-1/2 -translate-x-1/2">
      <Link target="_blank" className={buttonVariants({ size: "icon" })} href={socialLinks.linkedin}>
        <LinkedInLogoIcon className="size-4" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon" })} href={socialLinks.github}>
        <GitHubLogoIcon className="size-4" />
      </Link>
    </div>
  );
};
