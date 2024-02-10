import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { axios } from "../utils/axios.js";
import ReactPlayer from "react-player";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(src, {
          responseType: "blob",
          headers: { Range: "bytes=0-" }, // Requesting the full file initially
        });

        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);
        if (videoRef.current) {
          videoRef.current.src = videoURL;
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [src]);

  return <video ref={videoRef} controls width="100%" height="100%" />;
};

export default function Watermark() {
  const [watermark, setWatermark] = useState("image");
  const [insertVideo, setInsertVideo] = useState(null);
  const [details, setDetails] = useState({});
  const [preview, setPreview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [output, setOutput] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState({ s: 0, m: 0, total:0});
  const videoAdvancedRef = useRef(null);
  const [checkedRef,setChecked] = useState(false);
  const handleChange = (e) => setWatermark(e.target.value.toLowerCase());
  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setDetails((curr) => ({ ...curr, [name]: file }));
    setPreview((curr) => ({ ...curr, [name]: URL.createObjectURL(file) }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDone(false);
    const formData = new FormData();
    formData.append("video", details.video);
    formData.append("watermark", details.watermark);
    formData.append("type", watermark);
    if(checkedRef && insertVideo){
      formData.append('insertVideo', insertVideo);
      formData.append('insertTime', currentTime.total)
    }
    axios
      .post("/product/watermark", formData)
      .then((res) => {
        setOutput(import.meta.env.VITE_BACKEND_URL + "/video?path=" + res.data.path);
        setIsDone(true);
      })
      .finally(() => setIsLoading(false));
  };
  const handleDownload = async (src) => {
    const element = document.createElement("a");
    element.setAttribute("download", Date.now().toString(32) + ".mp4");
    try {
      const response = await axios.get(src, {
        responseType: "blob",
        headers: { Range: "bytes=0-" }, // Requesting the full file initially
      });
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const videoURL = URL.createObjectURL(videoBlob);
      element.setAttribute("href", output);
      document.body.appendChild(element);
      element.click();
      element.remove();
    } catch (err) {
      console.error(err);
    }
  };
  const handleProgress = (evt) => {
    const event = evt.target;
    const currentTime = event.currentTime;
    const duration = event.duration;
    setTotalTime(duration);
    setCurrentTime(
      currentTime < 60
        ? { m: 0, s: currentTime, total: currentTime }
        : { s: currentTime % 60, m: currentTime / 60, total: currentTime },
    );
  };
  const addLeadingZero = (num) => {
    return num <= 9 ? '0' + num : num
  }

  return (
    <>
      <nav>
        <Header />
      </nav>
      <section className="px-4 py-4">
        <h1 className="md:text-2xl">Watermark Adder</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Video</span>
            </label>
            <input
              type="file"
              className="file-input md:h-12 h-8 file-input-bordered w-full"
              accept="video/*"
              name="video"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text text-lg">Video Preview</span>
            </label>
            <ReactPlayer
              url={preview.video}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div className="form-control mt-4">
            <label>Choose your type of watermark</label>
            <select
              className="select select-bordered w-full"
              onChange={handleChange}
            >
              <option>Image</option>
              <option>Video</option>
            </select>
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text text-lg capitalize">
                Watermark {watermark}
              </span>
            </label>
            <input
              type="file"
              className="file-input h-8 file-input-bordered md:h-12 w-full"
              accept={`${watermark}/*`}
              name="watermark"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text capitalize text-lg">
                {watermark} Preview
              </span>
            </label>
            {watermark === "image" ? (
              <img src={preview.watermark} width="100%" height="100%" />
            ) : (
              <ReactPlayer
                url={preview.watermark}
                width="100%"
                height="100%"
                controls
              />
            )}
          </div>
          <div className="">
            {preview.video && (
              <>
                <h2 className="">Advanced</h2>
                <div>
                  <video
                    src={preview.video}
                    ref={videoAdvancedRef}
                    controls
                    onTimeUpdate={handleProgress}
                  />
                  <div className="">
                    <div className="flex w-full items-center justify-around h-2 mt-4 mb-4">
                      <div>
                        <span className="">
                          {addLeadingZero(Math.round(currentTime.m))}
                        </span>
                        :
                        <span>{addLeadingZero(Math.round(currentTime.s))}</span>
                      </div>
                      <input
                        type="range"
                        value={currentTime.total || 0}
                        min={0}
                        max={totalTime}
                        onChange={(e) => {
                          if (videoAdvancedRef.current)
                            videoAdvancedRef.current.currentTime =
                              e.target.value
                        }}
                        className="range w-10/12 range-xs"
                      />
                      {videoAdvancedRef.current?.paused ||
                      videoAdvancedRef.current?.ended ? (
                        <PlayIcon
                          onClick={() => videoAdvancedRef.current.play()}
                          className="h-6 w-6 bg-white text-slate-700 rounded-full "
                        />
                      ) : (
                        <PauseIcon
                          onClick={() => videoAdvancedRef.current.pause()}
                          className="h-6 w-6 bg-white text-slate-700 rounded-full "
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mt-6">
              <div className="flex justify-between ">
                <h2 className="flex">
                  Insert a video here
                  <p className="ml-2">
                    <span className="">
                      {addLeadingZero(Math.round(currentTime.m))}
                    </span>
                    :<span>{addLeadingZero(Math.round(currentTime.s))}</span>
                  </p>
                </h2>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={(e) => setChecked(e.target.checked)}
                />
              </div>
              <div className="mt-4">
                {checkedRef && (
                  <input
                    type="file"
                    accept="video/*"
                    className="file-input h-10"
                    onChange={(e) => setInsertVideo(e.target.files[0])}
                  />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="mt-4 btn btn-block">
            {!isLoading ? (
              "Add Watermark"
            ) : (
              <>
                <span className="loading loading-spinner"></span>
                Loading
              </>
            )}
          </button>
        </form>
        {isDone && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Output</span>
            </label>
            <video src={output} controls/>
            <button
              className="btn btn-block mt-2"
              onClick={handleDownload.bind({}, output)}
            >
              Download
            </button>
          </div>
        )}
      </section>
    </>
  )
}
