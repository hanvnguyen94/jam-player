export const playAudio = (isPlaying, audioRef) => {
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
