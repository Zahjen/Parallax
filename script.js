const container = document.querySelector('.container');
const card = document.querySelectorAll('.card');
let siblings = [];

/**
 * @param  evt 
 * 
 * This function highlights the hovered card by scaling it and applies opacity for all others cards
*/
function mouseEnter(evt) {
  // The following loop takes all the cards (card[i]) except the hovered card and place them in the array called siblings
    for (var i = 0; i < card.length ; i++) {
      if (card[i] !== evt.target) {
        siblings.push(card[i]);
      }
    }

  // The following loop applies a specific effect to all cards that are not hovered
    for (var j = 0; j < siblings.length; j++) {
        if (siblings[j] !== evt.target) {
          siblings[j].classList.add('opacity');
        }
      }

  // Here we apply another specific effect only to the hovered card
    evt.target.style.transform = `scale(1.1)`;
  // We precise no transition when mouse enter in the card, otherwise all the parallax movement would be very slow the second time
    evt.target.style.transition = `none`;
}

/**
 * @param evt 
 * 
 * The following function tells to the targeted card to do a parallax on mouse movement
*/
function mouseMove(evt) {
  // To get the xAxis and yAxis, refer to sheme.pdf file.
    let xAxis = evt.target.offsetWidth / 2 + evt.target.offsetLeft + container.offsetLeft - evt.pageX;
    let yAxis = evt.target.offsetHeight / 2 + evt.target.offsetTop + container.offsetTop - evt.pageY;
  // We can easily change the following value. It will change the 'deepth' of the parallax. Smaller the value is, higher is the parallax. Let us just precise quotient is not the only factor. Persepective (see css file), xAxis and yAxis play a role too.
    let quotient = 35;

  // The targeted card will do a parallax on mouse movement
    evt.target.style.transform = `rotateX(${yAxis / quotient}deg) rotateY(${- xAxis / quotient}deg)`;

  // Title (here h1) of the targeted card will 'go out' of the card by translating 40px 
    evt.target.children[0].style.transform = `translateZ(40px)`;
}

/**
 * @param evt 
 * 
 * This function delete any effet applied to cards once mouse leaved the card
*/ 
function mouseLeave(evt) {
  // The following deletes effects apply to all cards that were not hovered once mouse leaved the hovered card
    siblings.forEach(e => { 
      e.classList.remove('opacity');
      e.style.transition = `all 0.3s linear`;
    });
  // Here we delete effect apply to the hovered card once mouse leaved that card 
    evt.target.style.transform = ``;
    evt.target.children[0].style.transform = `translateZ(0)`;

  // We just tell the card go back quietly to normal state
    evt.target.style.transition = `transform 0.3s ease-in`;
}

card.forEach(e => e.addEventListener('mouseenter', mouseEnter));
card.forEach(e => e.addEventListener('mouseleave', mouseLeave));
card.forEach(e => e.addEventListener('mousemove', mouseMove));
