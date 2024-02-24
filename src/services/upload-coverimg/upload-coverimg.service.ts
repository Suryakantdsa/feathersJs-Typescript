// Initializes the `uploadCoverimg` service on path `/upload/cover`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UploadCoverimg } from './upload-coverimg.class';
import hooks from './upload-coverimg.hooks';
import OnCoverImgUploaded from './events/OnCoverImgUploaded';
import { multerUpload } from '../upload/utils/multerUpload';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'upload/cover': UploadCoverimg & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/upload/cover',multerUpload, new UploadCoverimg(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload/cover');

  service.on("created",OnCoverImgUploaded)

  service.hooks(hooks);
}
