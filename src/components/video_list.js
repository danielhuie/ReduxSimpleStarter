import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = ({ videos, onVideoSelect }) => {
  const videoItems = videos.map((video) => {
    return (
      // we are adding a unique key to each object so that react doesn't complain in the console
      <VideoListItem
        // this is basically saying that whenever VideoListItem is clicked, we will update the state with this reference
        onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video} />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
