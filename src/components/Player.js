import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
	audioRef,
	currentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	songs,
	setCurrentSong,
}) => {
	// event handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause()
			setIsPlaying(!isPlaying)
		} else {
			audioRef.current.play()
			setIsPlaying(!isPlaying)
		}
	}

	const getTime = (time) => {
		return (
			// format in minute
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		)
	}

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value
		setSongInfo({ ...songInfo, currentTime: e.target.value })
	}

	const skipSongHandler = (direction) => {
		// find the index of current song
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

		if (direction === 'skip-forward') {
			// reset the current index to 0
			// when current index hit  songs array's length
			// it will reset current Index to 0
			// eg. 1++ => 8 / 8 === 0
			setCurrentSong(songs[(currentIndex + 1) % songs.length])
		} else if (direction === 'skip-back') {
			setCurrentSong(songs[currentIndex - 1])
		}
	}

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					type='range'
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon
					onClick={() => skipSongHandler('skip-back')}
					className='skip-back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipSongHandler('skip-forward')}
					className='skip-forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
		</div>
	)
}

export default Player
