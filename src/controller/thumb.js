const ffmpeg = require('fluent-ffmpeg');




const thumbnailGenerate = (req,res)=>{
    ffmpeg({source:'./test.mp4'})
    .on('filenames',(filenames)=>{
        console.log('created file names',filenames)
    })
    .on('error',(err) =>{
        console.log('Error',err)
    })
    .screenshot({
        filename: 'untitled.jpeg',
        count: 1 ,
        folder:'src/thumbnails',
        size:'320x240'
    });
    res.status(200).send('All good')
}


module.exports = {thumbnailGenerate}