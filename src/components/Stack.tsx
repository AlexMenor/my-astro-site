import ReactIcon from "~icons/logos/react";
import ElectronIcon from "~icons/logos/electron";
import TypescriptIcon from "~icons/vscode-icons/file-type-typescript-official";
import NodeIcon from "~icons/vscode-icons/file-type-node";
import MongoIcon from "~icons/vscode-icons/file-type-mongo";
import PostgresIcon from "~icons/logos/postgresql";
import DevIcon from "~icons/fa6-brands/dev";
import InternxtIcon from "~icons/emojione-monotone/letter-x";
import GithubIcon from "~icons/akar-icons/github-fill";
import PantalaIcon from "~icons/ph/butterfly";
import { useEffect, useRef, useState } from "react";

const technologies = [
  {
    name: "TypeScript",
    icon: TypescriptIcon,
    description:
      "TypeScript is a game changer. It allows you to move faster without losing confidence in your code. A sweet spot between static typed and dynamic languages.",
    link: {
      text: '"Do you really know TypeScript?", a post series to develop a better mental model for it',
      href: "https://dev.to/alexmenor/do-you-really-know-typescript-1-thinking-in-sets-55dm",
      icon: DevIcon,
    },
  },
  {
    name: "React",
    icon: ReactIcon,
    description: `Some might find React a boring choice in ${new Date().getFullYear()}, but I've never been so productive with it. It still has the best ecosystem of libraries and its flexibility makes it suitable for any project. I usually use it together with a metaframework such as Remix, Next or Astro.`,
    link: {
      text: "Internxt Send, an end-to-end alternative to WeTransfer",
      href: "https://send.internxt.com",
      icon: InternxtIcon,
    },
  },
  {
    name: "Node",
    icon: NodeIcon,
    description:
      "Node is very mature and an excellent backend runtime for most projects. Besides having a great community behind, being able to use TypeScript for your backend and your frontend is key for productiviy.",
    link: {
      text: "Flightradar24 chat, a chrome extension to chat about aviation",
      href: "https://github.com/AlexMenor/flightradar24-chat",
      icon: GithubIcon,
    },
  },
  {
    name: "Electron",
    icon: ElectronIcon,
    description:
      "Despite its flaws, Electron has enabled many small companies to develop cross-platform desktop applications using web technologies. I also like Tauri, that addresses many of Electron's issues.",
    link: {
      text: "Internxt Drive's desktop client, sync your local files with the cloud in real time",
      href: "https://drive.internxt.com",
      icon: InternxtIcon,
    },
  },

  {
    name: "PostgreSQL",
    icon: PostgresIcon,
    description:
      "It's hard to go wrong with Postgres. Works great paired with Prisma to have type safety.",
    link: {
      text: "Pantala, the first wardrobe-as-a-service in Spain",
      href: "https://pantala.es",
      icon: PantalaIcon,
    },
  },
  {
    name: "MongoDB",
    icon: MongoIcon,
    description:
      "MongoDB is great for problems that are not suited for the relational model, flexible and scalable.",
    link: {
      text: "Heroes, an app to get help from people nearby in an emergency",
      href: "https://github.com/alexmenor/heroes",
      icon: GithubIcon,
    },
  },
];

export default function Stack() {
  const [showCards, setShowCards] = useState(false);
  const [showCardsFinishedAnimation, setShowCardsFinishedAnimation] =
    useState(false);

  useEffect(() => {
    if (showCards) {
      const timeout = setTimeout(
        () => setShowCardsFinishedAnimation(true),
        300
      );
      return () => clearTimeout(timeout);
    }
  }, [showCards]);

  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setShowCards(true),
      { threshold: 0.75 }
    );

    if (stackRef.current) observer.observe(stackRef.current);

    return () => observer.disconnect();
  }, []);

  const [highlight, setHighlight] = useState(0);

  return (
    <div className="flex-1 md:pr-5 lg:px-5" ref={stackRef}>
      <div className="justify-between flex items-center">
        <h2 className="text-4xl font-display">What I like to use</h2>
      </div>
      <div className="flex flex-wrap gap-4 lg:gap-5 mt-8 justify-start ">
        {technologies.map((technology, i) => {
          const highlighted = i === highlight;
          return (
            <Card
              highlighted={highlighted && showCardsFinishedAnimation}
              icon={technology.icon}
              key={technology.name}
              flipped={showCards}
              onClick={highlighted ? undefined : () => setHighlight(i)}
            />
          );
        })}
      </div>
      {technologies.map((technology, i) => (
        <div
          className={`mt-5 text-lg text-slate-200/80 lg:pr-10 ${
            i !== highlight ? "hidden" : ""
          } ${
            showCards ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
          key={technology.name}
        >
          <p>{technology.description}</p>
          <h3 className="mt-6 text-xs text-slate-200/50 uppercase">
            If you want to know more
          </h3>
          <a
            href={technology.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 mt-2 text-sm hover:text-slate-200/80 flex items-center"
          >
            <technology.link.icon className="inline w-6 h-6 flex-shrink-0" />
            <p className="ml-2">{technology.link.text}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

function Card({
  icon: Icon,
  flipped,
  highlighted,
  onClick,
}: {
  icon: typeof ReactIcon;
  flipped: boolean;
  highlighted: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`h-36 w-24 md:h-28 md:w-20 lg:h-36 lg:w-24 xl:h-36 xl:w-24 ${
        highlighted ? "" : "cursor-pointer"
      } rounded relative`}
      style={{ perspective: "500px" }}
    >
      <div
        style={{
          opacity: highlighted && flipped ? 1 : 0,
          willChange: "filter",
        }}
        className="absolute -inset-1 rounded bg-cyan-500 blur-sm transition-opacity"
      ></div>
      <div
        className={`absolute card-back inset-0 rounded transition-all duration-300`}
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: flipped ? "rotateY(-180deg)" : "rotateY(0)",
        }}
      ></div>
      <div
        className={`absolute bg-white inset-0 rounded transition-all duration-300 flex items-center justify-center`}
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: flipped ? "rotateY(0)" : "rotateY(180deg)",
        }}
      >
        <Icon className="h-14 w-14 md:h-10 md:w-10 lg:w-16 lg:h-16" />
      </div>
    </div>
  );
}
