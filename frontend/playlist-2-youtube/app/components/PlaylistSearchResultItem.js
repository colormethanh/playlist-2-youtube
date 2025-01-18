import React from 'react';
import Image from 'next/image';

export default function PlaylistSearchResultItem({thumbnailSrc, trackName, trackArtist}) {
  return (
    <div className='ps-3 my-4'>
      <div className='flex gap-4'>
        <Image src={thumbnailSrc} height={50} width={50} alt={`thumbnail for track ${trackName}`} />
        <div>
          <h2>
            {trackName}
          </h2>
          <span className="text-sm">
            {" "}
            {trackArtist}{" "}
          </span>
        </div>
      </div>
    </div>
  )
}
