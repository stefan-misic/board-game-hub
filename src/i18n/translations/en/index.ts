import translationAuthentication from './containers/authentication';
import translationAuthorization from './containers/authorization';
import translationDesigners from './containers/designers';
import translationLayout from './containers/layout';
import translationPublishers from './containers/publishers';

import translationButtons from './global/buttons';
import translationDialogs from './global/dialogs';
import translationMessages from './global/messages';
import translationValidation from './global/validation';

export default {
  authentication: translationAuthentication,
  authorization: translationAuthorization,
  designers: translationDesigners,
  layout: translationLayout,
  publishers: translationPublishers,

  buttons: translationButtons,
  dialogs: translationDialogs,
  messages: translationMessages,
  validation: translationValidation
};
