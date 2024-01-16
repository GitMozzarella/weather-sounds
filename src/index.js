import './style.scss'
import summerAudio from '../assets/sounds/summer.mp3'
import rainAudio from '../assets/sounds/rain.mp3'
import snowAudio from '../assets/sounds/winter.mp3'

const summerSound = new Audio(summerAudio)
const rainSound = new Audio(rainAudio)
const snowSound = new Audio(snowAudio)

const audioList = {
	summer: summerSound,
	rain: rainSound,
	snow: snowSound
}

const icons = {
	sunIcon: document.querySelector('.sunIcon'),
	rainIcon: document.querySelector('.rainIcon'),
	snowIcon: document.querySelector('.snowIcon'),
	pauseIcon: document.querySelectorAll('.pauseIcon')
}

const elements = {
	sun: document.querySelector('.sun'),
	rain: document.querySelector('.rain'),
	snow: document.querySelector('.snow'),
	backgroundContainer: document.querySelector('.container'),
	header: document.querySelector('header'),
	volumeControl: document.querySelector('.volume')
}

function playSound(audio) {
	audio.play()
}


function pauseSound(audio) {
	audio.pause()
}


function setVolume(audio, volume) {
	audio.volume = volume
}

function resetAllIcons() {
	['sunIcon', 'rainIcon', 'snowIcon'].forEach(
		icon => (icons[icon].style.display = 'inline-block')
	)
	icons.pauseIcon.forEach(pauseIcon => (pauseIcon.style.display = 'none'))
}


function changeBackgroundImage(audio) {
	elements.backgroundContainer.classList.remove(
		'summer-bg',
		'rainy-bg',
		'winter-bg'
	)
	if (audio === audioList.summer) {
		elements.backgroundContainer.classList.add('summer-bg')
		elements.header.style.color = '#ee7235'
	}
	if (audio === audioList.rain) {
		elements.backgroundContainer.classList.add('rainy-bg')
		elements.header.style.color = '#a435ee'
	}
	if (audio === audioList.snow) {
		elements.backgroundContainer.classList.add('winter-bg')
		elements.header.style.color = '#e1fcff'
	}
}

function WeatherClick(soundWeather, iconPauseIndex, iconWeather) {
	resetAllIcons()

	if (soundWeather.paused) {
		playSound(soundWeather)
		Object.values(audioList).forEach(
			sound => sound !== soundWeather && pauseSound(sound)
		)
		icons[iconWeather].style.display = 'none'
		icons.pauseIcon[iconPauseIndex].style.display = 'inline-block'
		changeBackgroundImage(soundWeather)
	} else {
		pauseSound(soundWeather)
		icons[iconWeather].style.display = 'inline-block'
		icons.pauseIcon[iconPauseIndex].style.display = 'none'
	}
}

elements.volumeControl.addEventListener('input', () =>
	Object.values(audioList).forEach(audio =>
		setVolume(audio, elements.volumeControl.value / 100)
	)
)

elements.sun.addEventListener('click', () =>
	WeatherClick(audioList.summer, 0, 'sunIcon', '#ee7235')
)
elements.rain.addEventListener('click', () =>
	WeatherClick(audioList.rain, 1, 'rainIcon', '#a435ee')
)
elements.snow.addEventListener('click', () =>
	WeatherClick(audioList.snow, 2, 'snowIcon', '#e1fcff')
)
