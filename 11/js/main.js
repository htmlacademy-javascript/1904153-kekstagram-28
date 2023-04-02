import { renderThumbnails } from './show-thumbnails.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { onFormSubmit, hideModal, showFullSuccessMessage, showFullErrorMessage } from './edit-form.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
} catch (err) {
  showAlert(err.message);
}
