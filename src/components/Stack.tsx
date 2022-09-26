import { useEffect, useState } from "react";
import ReactIcon from "~icons/akar-icons/react-fill";
import ElectronIcon from "~icons/logos/electron";
import TypescriptIcon from "~icons/vscode-icons/file-type-typescript-official";
import NodeIcon from "~icons/vscode-icons/file-type-node";
import MongoIcon from "~icons/vscode-icons/file-type-mongo";
import PostgresIcon from "~icons/logos/postgresql";

const technologies = [
  { name: "React", icon: ReactIcon },
  { name: "Node", icon: NodeIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "Electron", icon: ElectronIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
];

const shuffleArray = function <T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function Card({
  name,
  icon: Icon,
  flipped,
  onClick,
}: {
  name: string;
  icon: typeof ReactIcon;
  flipped: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`h-32 w-20 md:h-24 md:w-16  lg:h-36 lg:w-24 ${
        flipped ? "" : "cursor-pointer"
      } rounded relative`}
      style={{ perspective: "500px" }}
    >
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

export default function Stack() {
  const [stackOfTechnologies, setStackOfTechnologies] = useState([
    ...technologies,
    ...technologies,
  ]);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    setStackOfTechnologies(shuffleArray(stackOfTechnologies));
  }, []);

  useEffect(() => {
    const single = flipped.filter((i) => {
      const pairFound = flipped.find(
        (j) =>
          i !== j && stackOfTechnologies[i].name === stackOfTechnologies[j].name
      );
      return !pairFound;
    });

    if (single.length >= 2) {
      setTimeout(() => {
        setFlipped(flipped.filter((i) => !single.includes(i)));
      }, 400);
    }
  }, [flipped]);

  function onClick(i: number) {
    setFlipped([...flipped, i]);
  }

  return (
    <div className="flex flex-wrap gap-4 lg:gap-5 mt-8 justify-center md:justify-start">
      {stackOfTechnologies.map((technology, i) => {
        const flip = flipped.includes(i);
        return (
          <Card
            icon={technology.icon}
            key={i}
            name={technology.name}
            flipped={flip}
            onClick={flip ? undefined : () => onClick(i)}
          />
        );
      })}
    </div>
  );
}
