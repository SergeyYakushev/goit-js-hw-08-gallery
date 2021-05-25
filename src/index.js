import gelleryItems from './gallery-items.js';

const refs = {
  gelleryItemsEl: document.querySelector('.js-gallery'),
  overlayEl: document.querySelector('.lightbox__overlay'),
  modalEl: document.querySelector('.js-lightbox'),
  modalImgEl: document.querySelector('.lightbox__image'),
  buttonCloseEl: document.querySelector('.lightbox__button'),
};

let arr = [];

const imagesItems = gelleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a
        class="gallery__link"
        href='${original}'
    >
        <img
            class="gallery__image"
            src='${preview}'
            data-source='${original}'
            alt='${description}'
        />
    </a>
</li>`;
  })
  .join('');


refs.gelleryItemsEl.insertAdjacentHTML('beforeend', imagesItems);

refs.gelleryItemsEl.addEventListener('click', modalOpenClick);

function modalOpenClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {

    return;
  }

  addOpenModalClass(refs.modalEl);

  refs.modalImgEl.src = e.target.dataset.source;
  refs.modalImgEl.alt = e.target.alt;



  closeModalByElementClick(refs.buttonCloseEl);
  closeModalByElementClick(refs.overlayEl);

  window.addEventListener('keydown', onKeyDownEsc);
  window.addEventListener('keydown', onKeyDownRight);
  window.addEventListener('keydown', onKeyDownLeft);

}

function addOpenModalClass(modal) {
  modal.classList.add('is-open');
}

function closeModalByElementClick(element) {
  element.addEventListener('click', removeClassModal);
}
function removeClassModal() {
  refs.modalEl.classList.remove('is-open');
  refs.modalImgEl.src = '';
  window.removeEventListener('keydown', onKeyDownEsc);
}

function onKeyDownEsc(e) {
  if (e.key === 'Escape') {
    removeClassModal();
  }



}


function makeArrSrcBigImg(items) {
  return items.map(element => element.original);

  //console.log(arr);
};




function onKeyDownRight(evt) {

  if (evt.key === 'ArrowRight') {
    arr = makeArrSrcBigImg(gelleryItems);

    const currentIndexUrl = arr.indexOf(refs.modalImgEl.src);

    if (currentIndexUrl < arr.length - 1) {

      refs.modalImgEl.src = arr[currentIndexUrl + 1];
    }

  };
};


function onKeyDownLeft(evt) {

  if (evt.key === 'ArrowLeft') {
    arr = makeArrSrcBigImg(gelleryItems);

    const currentIndexUrl = arr.indexOf(refs.modalImgEl.src);

    if (currentIndexUrl >= 1) {

      refs.modalImgEl.src = arr[currentIndexUrl - 1];
    }

  };
};


