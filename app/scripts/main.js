'use strict';

document.addEventListener('DOMContentLoaded', function(){


	var cards = {

		width: 74,
		height: 98,
		margin: 5,
		cards: [],
		myCards: [],
		myRandomCards: [],
		buttons: {
			shuffle: document.getElementById('shuffle'),
			deal: document.getElementById('deal'),
			reset: document.getElementById('reset')		
		},
		flipped: false,

		dealFlip: function(){

			var self = this;
			var transform = Modernizr.prefixed('transform');

			self.shuffleCards();

			self.myRandomCards.forEach(function(cardElement, k){
				k = 2 + k;
				cardElement.style.transform = 'translate(' + (k * (self.width + self.margin)) + 'px, 51px)';
				cardElement.style.transform = cardElement.style.transform.replace('rotateY(180deg)', '');

			});

		},

		deal: function(){

			var self = this;
			var nrs = self.generateRandomNrs();

			self.getCardsByIndex(nrs);

			self.flipCards(true, self.dealFlip.bind(self));

		},

		getCardsByIndex: function(nrCollection){

			var self = this;
			self.myRandomCards = [];

			nrCollection.forEach(function(index){
				
				var el = document.getElementsByClassName('card-' + index)[0];
				self.myRandomCards.push(el);

			});

		},

		generateRandomNrs: function(){

			var self = this;
			var total = 5;
			var collection = [];

			// generate 5 random nrs
			while(collection.length < total){

			  var num = Math.ceil(Math.random()*(self.myCards.length - collection.length)), i;

			  for (i=0; i < collection.length; i++) {

			    if(collection[i] <= num){
				
					num++;
			    
			    } else {
				
					break;
			    }

			  };

			  collection.splice(i, 0, num);
			
			}

			return collection;

		},

		flipCards: function(showFace, callback){

			var self = this;
			var delay = 40;
			var timeout = 0;
			var rotation = showFace ? 180 : 0;
			var i = 0;
			var transform = Modernizr.prefixed('transform');

			if (self.flipped){

				callback();

			} else {

				self.myCards.forEach(function(cardElement, k){
				
					setTimeout(function(){
						
						i++;

						if (showFace) {
						
							cardElement.style.transform += ' ' + 'rotateY(' + rotation + 'deg)';
						
						} else {
						
							cardElement.style.transform = cardElement.style.transform.replace('rotateY(180deg)', '');
						
						}

						i === self.myCards.length ? setTimeout(function(){ typeof(callback) === "function" ? callback() : null }, 400) : null;

					}, timeout);

					timeout += delay;

				});

			}

			self.flipped = showFace;


		},

		reset: function(){

			var self = this;
			
			self.myCards = self.cards.slice();

			self.myCards.forEach(function(cardElement, k){
				self.positionCard(cardElement, k);
			});

			self.flipped = false;
			self.flipCards(false);

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

					self.positionCardOnDeck(cardElement, k);

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
		
		positionCardOnDeck: function(element, index){

			var self = this;
			var row = parseInt(index / 13);
			var posX = index + 'px';
			var posY = index + 'px';
			var transform = Modernizr.prefixed('transform');

			element.parentNode.style.zIndex = 52 - index;
			element.style.transform = 'translate(' + posX + ', ' + posY + ')';
			self.flipped ? element.style.transform += ' ' + 'rotateY(180deg)' : null;

		},

		positionCard: function(element, index){

			var self = this;
			var row = parseInt(index / 13);
			var posX = (index % 13) * (self.width + self.margin) + 'px';
			var posY = (row * (self.height + self.margin)) + 'px';
			var transform = Modernizr.prefixed('transform');

			element.style.transform = 'translate(' + posX + ', ' + posY + ')';
			self.flipped ? element.style.transform += ' ' + 'rotateY(180deg)' : null;

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
			self.buttons.deal.addEventListener('click', self.deal.bind(self));

		}

	};
	
	cards.init();


}, false);