const client = require('https')

var fs = require('fs');

const ThumbnailGenerator = require('video-thumbnail-generator').default;

const thumbnailGenerate = (req, res) => {
    const dateTime = new Date()

    const {url, filename} = req.body
    let TempVideoName =  Math.floor(dateTime.getTime() / 1000)+filename
    let file;
    var download = function (url, TempVideoName, callback) {
        file = fs.createWriteStream(TempVideoName)
        client.get(url, function (response) {
            console.log('content-type:', response.headers['content-type']);
            console.log('content-length:', response.headers['content-length']);

            response.pipe(file)
            file.on('finish', callback);
        });
    };

    download(url, TempVideoName, async function () {
            const ThumbnailFilename = Math.floor(dateTime.getTime() / 1000) + "-thumbnail.png"

            const tg = new ThumbnailGenerator({
                sourcePath: TempVideoName,
                thumbnailPath: '/home/remotex/Thumbnail/thumbnail',
            });

            await tg.generate({
                count: 1,
                filename: ThumbnailFilename
            }).then(console.log)
            const data = fs.readFileSync('/home/remotex/Thumbnail/thumbnail/' + ThumbnailFilename, 'base64')

            res.status(200).sendfile('/home/remotex/Thumbnail/thumbnail/' + ThumbnailFilename)
        }
    )

};


module.exports = {thumbnailGenerate}




