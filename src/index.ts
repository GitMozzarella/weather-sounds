import './style.scss'
import summerAudio from '../assets/sounds/summer.mp3'
import rainAudio from '../assets/sounds/rain.mp3'
import snowAudio from '../assets/sounds/winter.mp3'

const summerSound = new Audio(summerAudio) as HTMLAudioElement
const rainSound = new Audio(rainAudio) as HTMLAudioElement
const snowSound = new Audio(snowAudio) as HTMLAudioElement

interface AudioList {
	summer: HTMLAudioElement
	rain: HTMLAudioElement
	snow: HTMLAudioElement
}

interface IconsMap {
	sunIcon: SVGSVGElement
	rainIcon: SVGSVGElement
	snowIcon: SVGSVGElement
	pauseIcon: SVGSVGElement[]
}

interface Elements {
	sun: HTMLDivElement
	rain: HTMLDivElement
	snow: HTMLDivElement
	backgroundContainer: HTMLDivElement
	header: HTMLDivElement
	volumeControl: HTMLInputElement
}

const audioList: AudioList = {
	summer: summerSound,
	rain: rainSound,
	snow: snowSound
}

const icons: IconsMap = {
	sunIcon: document.querySelector('.sunIcon') as SVGSVGElement,
	rainIcon: document.querySelector('.rainIcon') as SVGSVGElement,
	snowIcon: document.querySelector('.snowIcon') as SVGSVGElement,
	pauseIcon: Array.from(
		document.querySelectorAll('.pauseIcon')
	) as SVGSVGElement[]
}

const elements: Elements = {
	sun: document.querySelector('.sun') as HTMLDivElement,
	rain: document.querySelector('.rain') as HTMLDivElement,
	snow: document.querySelector('.snow') as HTMLDivElement,
	backgroundContainer: document.querySelector('.container') as HTMLDivElement,
	header: document.querySelector('header') as HTMLDivElement,
	volumeControl: document.querySelector('.volume') as HTMLInputElement
}

function playSound(audio: HTMLAudioElement): void {
	audio.play()
}

function pauseSound(audio: HTMLAudioElement): void {
	audio.pause()
}

function setVolume(audio: HTMLAudioElement, volume: number): void {
	audio.volume = volume
}

function resetAllIcons(icons: IconsMap): void {
	icons.sunIcon.style.display = 'inline-block'
	icons.rainIcon.style.display = 'inline-block'
	icons.snowIcon.style.display = 'inline-block'
	icons.pauseIcon.forEach(pauseIcon => (pauseIcon.style.display = 'none'))
}

function changeBackgroundImage(audio: HTMLAudioElement): void {
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

function WeatherClick(
	soundWeather: HTMLAudioElement,
	iconPauseIndex: number,
	iconWeather: SVGSVGElement
): void {
	resetAllIcons(icons)

	if (soundWeather.paused) {
		playSound(soundWeather)
		Object.values(audioList).forEach(
			sound => sound !== soundWeather && pauseSound(sound)
		)
		iconWeather.style.display = 'none'
		icons.pauseIcon[iconPauseIndex].style.display = 'inline-block'
		changeBackgroundImage(soundWeather)
	} else {
		pauseSound(soundWeather)
		iconWeather.style.display = 'inline-block'
		icons.pauseIcon[iconPauseIndex].style.display = 'none'
	}
}

elements.volumeControl.addEventListener('input', () => {
	const volumeValue: number = Number(elements.volumeControl.value)
	Object.values(audioList).forEach(audio => {
		setVolume(audio, volumeValue / 100)
	})
})

elements.sun.addEventListener('click', () =>
	WeatherClick(audioList.summer, 0, icons.sunIcon)
)
elements.rain.addEventListener('click', () =>
	WeatherClick(audioList.rain, 1, icons.rainIcon)
)
elements.snow.addEventListener('click', () =>
	WeatherClick(audioList.snow, 2, icons.snowIcon)
)
