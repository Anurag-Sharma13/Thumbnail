const client = require('https')

var fs = require('fs');

const ThumbnailGenerator = require('video-thumbnail-generator').default;

const thumbnailGenerate = (req, res) => {
    const dateTime = new Date()

    const {url, filename} = req.body
    const TempVideoName =  Math.floor(dateTime.getTime() / 1000)+filename
    let file;
    var download = function (url, TempVideoName, callback) {
        try{
            file = fs.createWriteStream(TempVideoName)
            client.get(url, function (response) {
            // console.log('content-type:', response.headers['content-type']);
            // console.log('content-length:', response.headers['content-length']);

            response.pipe(file)
            file.on('finish', callback);
        });
        }
        catch(err){
            res.status(400).json({err:err.message})
        }
        
    };

    download(url, TempVideoName, async function () {
        
        try{
            const ThumbnailFilename = Math.floor(dateTime.getTime() / 1000) + "-thumbnail.png"

            const tg = new ThumbnailGenerator({
                sourcePath: TempVideoName,
                thumbnailPath: 'thumbnail/',
            });

            await tg.generate({
                count: 1,
                filename: ThumbnailFilename
            }).catch(console.log)
            const data = fs.readFileSync('thumbnail/' + ThumbnailFilename)
            const stat = fs.statSync('thumbnail/' + ThumbnailFilename)    
            
    //Deleting the files        
    function deleteFiles(files, callback){
        var i = files.length;
        files.forEach(function(filepath){
          fs.unlink(filepath, function(err) {
            i--;
            if (err) {
              callback(err);
              return;
            } else if (i <= 0) {
              callback(null);
            }
          });
        });
      }
      
      var files = [TempVideoName,'thumbnail/' + ThumbnailFilename]
      
      deleteFiles(files, function(err) {
        if (err) {
          console.log(err);
        } else {
        //   console.log('all files removed');
        }
      });
            res.set('Content-Type', 'image/jpeg')
            res.set('Content-Length', stat.size)
            res.send(data)
            // res.status(200).sendFile('/home/remotex/thumbnail/thumbnail/' + ThumbnailFilename)
            // return res


            
            
        }
        catch(err){
            res.status(500).json({err:err.message})
        }
            

            
        }
    )

};


module.exports = {thumbnailGenerate}




