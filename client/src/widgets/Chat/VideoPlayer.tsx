import ReactPlayer from "react-player";


interface VideoPlayerInterfece{
    url:string;
}

const VideoPlayer:React.FC<VideoPlayerInterfece> = ({url}) => {
  return (
    <div>
      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="auto"
        playing={true}
      />
    </div>
  );
};

export default VideoPlayer;
