// src/font-awesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faEnvelope, faTrash);

export default FontAwesomeIcon;
