const ffmpeg = require('fluent-ffmpeg');

const client = require('https')

var fs = require('fs');

    


const thumbnailGenerate = (req, res) => {
const uri = req.url.split("/thumbnail?url=")[1]
let file;
var download = function(uri, fileName, callback){
    file = fs.createWriteStream(fileName)
  client.get(uri, function(response){
    console.log('content-type:', response.headers['content-type']);
    console.log('content-length:', response.headers['content-length']);

    response.pipe(file)
    file.on('finish', callback);
  });
};

download(uri, 'video.mp4', function(){
    file.close()
    ffmpeg({source:'video.mp4'})
.on('filenames',(filenames)=>{
    const data = fs.readFileSync('src/thumbnails/thumbnail_1.jpeg', 'base64')
    res.status(200).json({data})
    console.log('created file names',filenames)
})
.on('error',(err) =>{
    res.status(404).json({err: err.message})
    console.log('Error',err)
})
.screenshot({
    filename: 'thumbnail_1.jpeg',
    count: 1 ,
    folder:'src/thumbnails',
    size:'320x240'
})

}
)

};






module.exports = { thumbnailGenerate }




