const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


const pathImages = "C:/Users/User/Desktop/images/val/"
const newPathImages = "C:/Users/User/Desktop/imagesResize/val/"

const allImageStart = fs.readdirSync(pathImages)



async function getMetadata(img) {
    const metadata = await sharp(img).metadata();
    // console.log(metadata.width);
    return metadata.width
}

async function fullDo (oldImg,newImg){
const curWidth = await getMetadata(oldImg)
if(curWidth > 700){
    resizeImage(oldImg, newImg)
}else{
    fs.copyFile(oldImg, newImg, err => {
        if(err) throw err; 
        console.log(oldImg);
     });
}
console.log (curWidth)

}

async function resizeImage(oldImg, newImg) {
    try {
        await sharp(oldImg)
            .resize({
                width: 700
                
            })
            .toFile(newImg);
    } catch (error) {
        console.log(error);
    }
}

allImageStart.forEach((el) => {
   fullDo (pathImages + el,newPathImages + el )
   console.log (el) 
})




