'use strict';

document.addEventListener('DOMContentLoaded', function(){


	var cards = {

		width: 74,
		height: 98,
		margin: 5,
		cards: [],
		myCards: [],
		buttons: {
			shuffle: document.getElementById('shuffle'),
			deal: document.getElementById('deal'),
			reset: document.getElementById('reset')		
		},
		flipped: false,

		flipCards: function(showFace, callback){

			var self = this;
			var delay = 40;
			var timeout = 0;
			var rotation = showFace ? 180 : 0;
			var i = 0;

			if (self.flipped){

				callback();

			} else {

				self.myCards.forEach(function(cardElement, k){
				
					setTimeout(function(){
						
						i++;
						cardElement.style.webkitTransform += ' ' + 'rotateY(' + rotation + 'deg)';

						i === self.myCards.length ? setTimeout(function(){ callback() }, 400) : null;

					}, timeout);

					timeout += delay;

				});

			}

			self.flipped = showFace;


		},

		reset: function(){

			var self = this;
			
			console.log("reset");
			console.log(self.cards);

			self.myCards = self.cards.slice();

			self.myCards.forEach(function(cardElement, k){
				self.positionCard(cardElement, k);
			});

		},

		cardsToArray: function(){

			var self = this;
			var cards = document.getElementsByClassName('card');

			for (var i = 0; i < cards.length; i++){
				self.myCards.push(cards.item(i));
			}

			self.cards = self.myCards.slice(0); // original data, copy by value

		},

		shuffleCards: function(){

			var self = this;

			var run = function(){

				self.myCards = self.shuffleArray(self.myCards);

				self.myCards.forEach(function(cardElement, k){
					self.positionCard(cardElement, k);
				});

			};

			self.flipCards(true, run.bind(this));

		},

		shuffleArray: function(array) {
		    for (var i = array.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var temp = array[i];
		        array[i] = array[j];
		        array[j] = temp;
		    }
		    return array;
		},

		createCard: function(index){

			var container = document.createElement('container');
			container.className = 'container';

			var card = document.createElement('div');
			card.className = 'card card-' + index;

			var faceFront = document.createElement('div');
			faceFront.className = 'face front';

			var faceBack = document.createElement('div');
			faceBack.className = 'face back';

			card.appendChild(faceFront);
			card.appendChild(faceBack);

			container.appendChild(card);

			document.getElementById('table').appendChild(container);

		},

		positionCard: function(element, index){

			var self = this;
			var row = parseInt(index / 13);
			var posX = (index % 13) * (self.width + self.margin) + 'px';
			var posY = (row * (self.height + self.margin)) + 'px';

			element.style.webkitTransform = 'translate(' + posX + ', ' + posY + ')';
			self.flipped ? element.style.webkitTransform += ' ' + 'rotateY(180deg)' : null;
			console.log(self.flipped);

		},

		generateCards: function(){

			var self = this;

			for (var i = 1; i <= 52; i++){

				self.createCard(i);

			}

		},

		init: function(){

			var self = this;

			// Create cards and set default position
			self.generateCards();
			self.cardsToArray();

			self.myCards.forEach(function(cardElement, k){
				self.positionCard(cardElement, k);
			});

			// Set listeners
			self.buttons.shuffle.addEventListener('click', self.shuffleCards.bind(self));
			self.buttons.reset.addEventListener('click', self.reset.bind(self));

		}

	};
	
	cards.init();


}, false);