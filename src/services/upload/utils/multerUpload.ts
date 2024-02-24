import multer from "multer";
import moment from "moment";
import fs from "fs";
const checkAndCreateDirectory = (path: string, success: () => void) => {
    fs.stat(path, (error) => {
      if (error)
        fs.mkdir(path, () => {
          success();
        });
      else success();
    });
  };
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      console.log("here in multer disk",_req.url)
      let folder;
      if(_req.url==="/upload/cover"){
        folder="Cover_Image"
      }
      else if(_req.url==="/upload"){
        folder="Profile_Picture"
      }
      else{
        folder="Other_image"
      }
      const year = moment(new Date()).format("YYYY"); //'2021'
      const month = moment(new Date()).format("MMDD"); //'1129'
      let path = `public/uploads/${folder}/${year}`;

      checkAndCreateDirectory(path, () => {
        path = `${path}/${month}`;
        checkAndCreateDirectory(path, () => {
          cb(null, path);
        });
      });
    },
    filename: (_req, file, cb) => cb(null, Date.now() + file.originalname),
  });
  const upload = multer({ storage: storage }).any();


export const multerUpload=function (req:any, res:any, next:() => void){
    upload(req, res, function (err) {
      //console.log('/////////',err);
      if (err instanceof multer.MulterError) {
        req.body = {
          result: false,
          message: err.toString(),
        };
      } else if (err) {
        req.body = {
          result: false,
          message: err.toString(),
        };
      } else {
        // console.log('-------------',req.files);
        if (req.files && req.files.length > 0) {
          const files = req.files.map((each:any) =>
              (each.path = `http://${
                req.feathers.headers.host
              }/${each.path.replace("public/uploads", "uploads")}`)
          );
          req.body = {
            result: true,
          };
          if (files.length === 1) req.body.path = files[0];
          else req.body.path = files;
        } else {
          req.body = {
            result: false,
            message: "Please Upload Some Files",
          };
        }
      }
      next();
    });
  }