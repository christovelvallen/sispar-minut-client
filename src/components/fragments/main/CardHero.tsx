import Image from 'next/image';

interface PropsType {
  title: string;
  description: string;
  imgUrl: string;
}

export default function CardHero({ title, description, imgUrl }: PropsType) {
  return (
    <div className="flex p-3 border lg:p-6 bg-secondary rounded-xl">
      <div className="flex flex-col justify-center flex-1 gap-2">
        <h1 className="text-3xl font-semibold leading-none lg:text-6xl">
          {title}
        </h1>
        <p className="lg:text-lg">{description}</p>
      </div>

      <div className="flex items-center justify-center flex-1 max-lg:hidden">
        <Image src={imgUrl} alt="" width={300} height={300} priority />
      </div>
    </div>
  );
}
