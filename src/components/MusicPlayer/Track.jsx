import React from 'react';
import { replaceImageSize } from '../../utils';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={
          activeSong?.images?.coverart
          || replaceImageSize(
            activeSong?.artwork.url,
            activeSong?.artwork.width,
            activeSong?.artwork.height,
          )
        }
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : activeSong?.name}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle ? activeSong?.subtitle : activeSong?.artistName}
      </p>
    </div>
  </div>
);

export default Track;
