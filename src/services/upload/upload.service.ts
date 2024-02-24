// Initializes the `upload` service on path `/upload`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Upload } from "./upload.class";
import hooks from "./upload.hooks";

// import {Request,Response,} from "express"
import OnProfilePicUploaded from "./events/OnProfilePicUploaded";
import { multerUpload } from "./utils/multerUpload";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    upload: Upload & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };
 
  app.use("/upload",multerUpload,new Upload(options, app));
  // Get our initialized service so that we can register hooks34wq `nb h
  const service = app.service("upload");

  service.on("created",OnProfilePicUploaded)

  service.hooks(hooks);
}
