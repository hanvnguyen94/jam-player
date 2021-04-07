import React, { useState, useRef } from 'react'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import Nav from './components/Nav'

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
		animationPercentage: 0,
	})
	const [libraryStatus, setLibraryStatus] = useState(false)

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime
		const duration = e.target.duration
		// calculate percentage
		const roundedCurrent = Math.round(current)
		const roundedDuration = Math.round(duration)
		const animationPercentage = Math.round(
			(roundedCurrent / roundedDuration) * 100
		)

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage,
		})
	}

	return (
		<div className='App'>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
				isPlaying={isPlaying}
				libraryStatus={libraryStatus}
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
