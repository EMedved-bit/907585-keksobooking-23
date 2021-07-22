const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarFileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoChooser = document.querySelector('.ad-form__input');
const housePhotoPreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

housePhotoChooser.addEventListener('change', () => {
  const file = housePhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = housePhotoPreview.querySelector('img');
      if (image) {
        image.src = reader.result;
      } else {
        const img = new Image();
        img.src = reader.result;
        housePhotoPreview.appendChild(img);
      }
    });

    reader.readAsDataURL(file);
  }
});
