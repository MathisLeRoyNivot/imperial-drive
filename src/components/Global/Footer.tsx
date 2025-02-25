import Link from "next/link";
import React from "react";
import { FaGlobe, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";

const SOCIALS = [
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/mathis-le-roy-nivot/",
		icon: (props) => <FaLinkedinIn {...props} />,
	},
	{
		name: "GitHub",
		url: "https://github.com/MathisLeRoyNivot",
		icon: (props) => <FaGithub {...props} />,
	},
	{
		name: "Portfolio",
		url: "https://mlrn-portfolio.vercel.app/",
		icon: (props) => <FaGlobe {...props} />,
	},
];

const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-center mt-20">
			<div className="container">
				<hr className="mx-auto h-[1px] border-none bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 dark:from-primary-foreground/0 dark:via-primary-foreground dark:to-primary-foreground/0" />
				<div className="mx-auto flex flex-col justify-center gap-2 space-y-5 py-6">
					<div className="hidden w-full justify-between md:flex">
						<div className="space-y-3">
							<div className="flex items-center">
								<Link href={"/"}>
									<Logo />
								</Link>
							</div>
						</div>

						{/* <div className="flex gap-2">
						{cvFilePath && (
							<Button variant={"outline"} asChild>
								<Link
									href={cvFilePath}
									target="_blank"
									rel="noopener noreferre">
									<FileBadge className="mr-2 size-4" />
									{t(
										"common:app.common.footer.download-resume"
									)}
								</Link>
							</Button>
						)}
						<LanguageSelector />
						<ModeToggle />
					</div> */}
					</div>

					<div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-0">
						<div className="flex-1">
							<p className="text-xs text-primary/40">
								&copy; {new Date().getFullYear()} Mathis LE
								ROY-NIVOT All Rights Reserved.
							</p>
						</div>

						<div className="hidden flex-1 text-center text-xs text-muted-foreground md:block">
							Designed & Made with ❤️ by{" "}
							<Link
								href={"https://mlrn-portfolio.vercel.app/"}
								target="_blank"
								className="font-medium transition-all hover:cursor hover:text-foreground hover:underline">
								@Mathis
							</Link>
							.
						</div>

						<div className="flex flex-1 justify-end gap-3">
							{SOCIALS.map((social, index) => (
								<Link
									href={social.url}
									key={index}
									target="_blank"
									title={social.name}>
									<social.icon className="size-4 text-primary/40 transition-all hover:scale-110 hover:text-primary" />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
