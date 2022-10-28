const speakers = [
  {
    img: 'imgs/speakers/Jose.jpg',
    name: 'José Palacios',
    title: 'CEO & founder',
    about: 'José is a Colombian author and associate professor at Northwest Missouri State University.',
  },
];

function speakerTemplate(speaker) {
  return `<li class="speaker row">
  <img src="${speaker.img}">
  <dl class="spk-content cell">
      <dt>
          <p class="name">${speaker.name}</p>
          <p>${speaker.title}</p>
      </dt>
      <dd><p>${speaker.about}</p></dd>
  </dl>
</li>`;
}

function navigate(hash) {
  if (hash === '#menu') {
    document.querySelector('.navbar-items-c').classList.add('active');
  } else {
    document.querySelector('.navbar-items-c').classList.remove('active');
  }
}

window.addEventListener('load', () => {
  navigate(window.location.hash);
  window.addEventListener('popstate', () => {
    navigate(window.location.hash);
  });
  document.getElementById('close-menu').addEventListener('click', () => { window.history.back(); });
  const speakersList = document.getElementById('speakers-list');
  if (speakersList) {
    speakersList.innerHTML = speakers.map((x) => speakerTemplate(x)).join('');
    let colapsedHeight = 0;
    let originalHeight = 0;
    const clacHeights = () => {
      colapsedHeight = -10;
      originalHeight = -10;
      document.querySelectorAll('#speakers-list > li').forEach((x, i) => {
        originalHeight += x.offsetHeight + 10;
        if (i < 2) colapsedHeight += x.offsetHeight + 10;
      });
      speakersList.style = '';
      speakersList.classList.remove('colapse');
    };
    clacHeights();
    window.addEventListener('resize', clacHeights);
    speakersList.style.maxHeight = `${colapsedHeight}px`;
    speakersList.classList.add('colapse');
    document.getElementById('more').addEventListener('click', () => {
      if (!speakersList.classList.contains('colapse')) {
        speakersList.classList.add('colapse');
        speakersList.style.maxHeight = `${colapsedHeight}px`;
      } else {
        speakersList.classList.remove('colapse');
        speakersList.style.maxHeight = `${originalHeight}px`;
      }
    });
  }
});