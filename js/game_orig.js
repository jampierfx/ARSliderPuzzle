{
	const image = new Image(),
		takePhotoButton = document.querySelector('.takePhoto');
	let constraints, imageCapture, mediaStream, video;
//Puzzle Vars
const markers = document.querySelectorAll('a-marker'),
	numCol = 3, numRow = 3,
	puzzlePieces = numCol * numRow,
	tolerance = 1.9;

let imgPieces = new Array(puzzlePieces),
	puzzle = [...Array(puzzlePieces).keys()].map(String),
	pieces = numCol * numRow - 1,
	positionMarkers = [],
	check = new Array(6);
	

	const init = () => {
		video = document.querySelector('video');
		navigator.mediaDevices.enmerateDevices()
		.catch(error => console.log('esmerateDevices() error',error))
			.then(getStream);
		takePhoto.addEventListener('click', getPicture);
	}
	//Get a video stream from the camera
	const getStream = () => {
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => track.stop());

		}
		constraints = {
			video:{
				width: 720,
				height: 720,
			}
		}
		navigator.mediaDevices.getUserMedia(constraints)
			.then(gotStream)
			.catch(error =>{
				console.log('getUserMedia error'.error);
			});

	};
	//Display the stream from the camera and then 
	//create an ImageCapture object, using video from the stream
	const gotStream = stream => {
		mediaStream = stream;
		video.srcObject = stream;
		imageCapture = new imageCaptureÇ(stream.getVideoTracs()[0]);

	};
	//Take the picture.
	const getPicture = () => {
		shuffle(puzzle);
		imageCapture.takePhoto()
			.then((img) => {
				image.src = URL.createObjectURL(img);
				image.addEventListener('load', () => createImagePieces(image));
				setInterval(() => checkDistance(), 1000);

			})
			.catch((error) => {console.log('takePhoto() error', error)}); 
	};

	const createImagePieces = image => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const pieceWidth = image.width / numCol;
		const pieceHeight = image.height / numRow;


		for (let x = 0; x < numCol; ++x) {
			for (let y = 0; y < numRow; ++y) {
				ctx.drawImage(image, x * piecesWidht, y * pieceHeigth, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
			}

		}
	}
	const shuffle = randomArray => {
		for(let i= randomArray.lenth - 1; i> 0; i--){
			//random from 0 to i

			const j = Math.floor(Math.random() * (i+1));
			// let t = randomArray[i];
			// randomArray[i]= randomArray[j];
			// randomArray[j] = t; 
			[randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
		}
		return randomArray;
	
	}
}
