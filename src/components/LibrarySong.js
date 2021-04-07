import React from 'react'

const LibrarySong = ({
	song,
	songs,
	setCurrentSong,
	id,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = () => {
		// get the only song we click on
		// filter it out and returns an array of that song
		const selectedSong = songs.filter((stateSong) => stateSong.id === id)
		setCurrentSong(selectedSong[0])
		// add active state
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					// keep original song and modify active
					...song,
					active: true,
				}
			} else {
				return {
					...song,
					active: false,
				}
			}
		})
		setSongs(newSongs)

		// check if the song is playing
		if (isPlaying) {
			const playPromise = audioRef.current.play()
			// if the audio is hasn't loaded up yet
			// wait until its loaded
			if (playPromise !== undefined) {
				playPromise.then((audio) => {
					audioRef.current.play()
				})
			}
		}
	}

	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? 'selected' : ''}`}
		>
			<img alt={song.name} src={song.cover}></img>
			<div className='song-description'>
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	)
}

export default LibrarySong
