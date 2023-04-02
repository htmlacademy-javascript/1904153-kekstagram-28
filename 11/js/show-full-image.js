import { createCommentItem } from './create-comment.js';
import { isEscapeKey } from './util.js';

const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');

const VISIBLE_COMMENTS = 5;
let shownComments = 0;
let loadMoreComments = null;

const renderComments = (data) => {
  shownComments += VISIBLE_COMMENTS;
  if (shownComments >= data.comments.length) {
    commentsLoader.classList.add('hidden');
    shownComments = data.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < shownComments; i++) {
    const commentElement = createCommentItem(data.comments[i]);
    fragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.innerHTML = `${shownComments} из <span class="comments-count">${data.comments.length}</span> комментариев`;
};

const addSomeComments = (data) => {
  renderComments(data);
};

const openFullImage = (item, data) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture .big-picture__img img').setAttribute('src', data.url);
    document.querySelector('.big-picture .likes-count').textContent = data.likes;
    document.querySelector('.big-picture .comments-count').textContent = data.comments.length;
    document.querySelector('.big-picture .social__caption').textContent = data.description;
    document.querySelector('.social__comments').innerHTML = '';
    renderComments(data);
    loadMoreComments = addSomeComments.bind(null, data);
    commentsLoader.addEventListener('click', loadMoreComments);
  });
};

const closeFullImage = () => {
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      shownComments = 0;
      commentsLoader.removeEventListener('click', loadMoreComments);
    }
  });
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    shownComments = 0;
    commentsLoader.removeEventListener('click', loadMoreComments);
  });
};

export { openFullImage, closeFullImage };
