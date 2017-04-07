# Example Image Text Extract

Sample project that shows a fullstack application that extract text from image using:

 * Frontend: Ionic2 App.
 * Backend: Node.js, Express.js
 * Cloud image service, upload, storage: [Cloudinary](http://cloudinary.com/). 
 
 This project has been developed to practice my skills with the tech stack shown above. This project shows you how to:

	* Use Ionic Native to interface with the Cordova Camera plugin. We’ll use the native camera to take a picture or choose image from gallery and output that picture into our view.
	Upload image using our own nodejs cloudinary route and extract text using our own textract nodejs route.
	* Use Cloudinary image service to upload and storage images.
	* Use textract node.js module for extracting text from image.
	
## Extraction Requirements

	* PNG, JPG and GIF require tesseract to be available, [link](https://github.com/tesseract-ocr/tesseract). Images need to be pretty clear, high DPI and made almost entirely of just text for tesseract to be able to accurately extract the text.

## Configuration

The first step consists in Cloudinary register process [Register here](https://cloudinary.com/users/register/free).

1. SERVER: Modify your Account Details in server-textract: server-textract/config/setting.js 

	* Cloud name: my-cloud-name
	* API Key: my-apy-key
	* API Secret: my-apy-secret
	
2. IONIC APP: Modify src/environments/environments.ts

			case'LOCALHOST':
                this.url = "http://localhost";
                this.port = 3000;
                this.absoluteURL = this.url + ':' + this.port.toString() + '/';
                break;
            case'DEVELOPMENT':
                this.url = "http://ip";
                this.port = 3000;
                this.absoluteURL = this.url + ':' + this.port.toString() + '/';
                break;
                
    where `ip` is your local ip (accesible from mobile). Example: 192.168.1.36
	
3. Install dependencies and run server

	Before you go through this example, you should have at least a basic understanding of Node.js concepts. You must also already have Node.js installed on your machine.

	* Run npm install
	* Run npm start
	* Test your server: open http://localhost:3000 in your browser
	* Test extract-image-text service: open http://localhost:3000/extract-image-text?imageURL=http://localhost:3000/images/text.jpg in your browser

```
	git clone https://github.com/abritopach/image-textract
	cd image-textract/server-textract
	npm install
	npm start
```
	
4. Install dependencies and run Ionic App

	Before you go through this example, you should have at least a basic understanding of Ionic 2 concepts. You must also already have Ionic 2 installed on your machine.

	* Run npm install
	* Add Android Platform: ionic add platform android / Add iOS Platform: ionic add platform ios
	* Run: ionic run android / ionic run ios
	
```
	cd image-textract/ionic2-textract
	npm install
	ionic add platform android
	ionic run android
```

## License
MIT License.

Original work Copyright (c) 2017 Adrián Brito  


