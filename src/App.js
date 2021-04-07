import React, { useState, useRef } from 'react'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'

import './styles/app.scss'
import data from './songsData'

function App() {
	// ref
	const audioRef = useRef(null)

	// state
	const [songs, setSongs] = useState(data())
	const [currentSong, setCurrentSong] = useState(songs[1])
	const [isPlaying, setIsPlaying] = useState(false)

	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	})

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime
		const duration = e.target.duration
		setSongInfo({ ...songInfo, currentTime: current, duration })
	}

	return (
		<div className='App'>
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				// appear right away when page loaded
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	)
}

export default App
