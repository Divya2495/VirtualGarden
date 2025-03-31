type Props = {
    isNight: boolean;
  };
  
  export default function GardenBackground({ isNight }: Props) {
    const videoSrc = isNight
      ? "/videos/NightBackground.mov"
      : "/videos/MorningBackground.mov";
  
    return (
      <video
        key={videoSrc} // 💡 this will force React to treat it as a new element
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }
  