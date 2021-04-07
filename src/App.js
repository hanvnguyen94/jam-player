import React, { useState } from 'react'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'

import './styles/app.scss'
import data from './songsData'

function App() {
	// state
	const [songs, setSongs] = useState(data())
	const [currentSong, setCurrentSong] = useState(songs[1])
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<div className='App'>
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
			<Library songs={songs} />
		</div>
	)
}

export default App
