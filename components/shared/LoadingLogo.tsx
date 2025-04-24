import Image from 'next/image';

type Props = {
  size?: number;
}

const LoadingLogo = ({size = 100}: Props) => {
  return (
      <div
          className={"h-full w-full flex items-center justify-center"}
      >
        <Image
            src="/logo.svg"
            width={size}
            height={size}
            alt="Logo"
            className={'animate-pulse duration-700'}
        />
      </div>
  );
};
export default LoadingLogo;