import { createCommentItem } from './create-comment.js';
import { isEscapeKey } from './util.js';

//!!! Все данные для renderComments
const VISIBLE_COMMENTS = 5;
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');

let shownComments = 0;
// const comments = [];
//!!! Функция загрузки комментов
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
  //??? Если я тут вызываю событие, первый клик комменты открываются по 5 штук, далее по +10??
  commentsLoader.addEventListener('click', () => {
    renderComments(data);
  });

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.innerHTML = `${shownComments} из <span class="comments-count">${data.comments.length}</span>`;
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
    //??? Если я сразу вызываю renderComments(data), то при открытии фотографии сразу загружаются 5 комментов, но каждый раз при открытии и закрытии фотографии они прибавляются
    renderComments(data);
    //??? Если я делаю через событие, тогда комменты сразу не показываются и ломается счётчик
    // commentsLoader.addEventListener('click', () => {
    //   renderComments(data);
    // });
  });
};

const closeFullImage = (data) => {
  const closeButton = document.querySelector('.big-picture__cancel');
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      //??? Как обновить весь список комментов при закрытии фотографии?
      commentsLoader.removeEventListener('click', () => {
        renderComments(data);
      });
    }
  });
  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    //??? Как обновить весь список комментов при закрытии фотографии?
    commentsLoader.removeEventListener('click', () => {
      renderComments(data);
    });
  });
};

export { openFullImage, closeFullImage };
