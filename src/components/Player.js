import React, { useEffect } from 'react'
import { playAudio } from '../utils'

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
	setSongs,
}) => {
	// use Effect
	useEffect(() => {
		// add active state
		const newSongs = songs.map((song) => {
			if (song.id === currentSong.id) {
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
	}, [currentSong])

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
			if ((currentIndex - 1) % songs.length === -1) {
				// set current song to the last song in the array
				setCurrentSong(songs[songs.length - 1])
				playAudio(isPlaying, audioRef)
				return
			}
			// will crash when songs length is equal to 0
			// then songs[(currentIndex - 1)] === songs[-1]
			// => not valid
			setCurrentSong(songs[(currentIndex - 1) % songs.length])
		}
	}

	// add styles
	const trackAnimation = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	}

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
					className='track'
				>
					<input
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={dragHandler}
						type='range'
					/>
					<div style={trackAnimation} className='animate-track'></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
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
