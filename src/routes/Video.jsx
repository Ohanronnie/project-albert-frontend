import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from '../utils/axios';
export default function VideoPage() {
    const { id } = useParams();
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(function () {
        axios.get(`/product/saved/video/${id}`).then(({ data }) => {
            setVideoSrc(data.src)
        }).catch(console.error)
    }, []);
    return videoSrc && (
        <>
            <video src={videoSrc}  controls />
        </>
    )
}
;