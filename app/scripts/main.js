'use strict';

document.addEventListener('DOMContentLoaded', function(){


	var cards = {

		width: 74,
		height: 98,
		margin: 5,
		myCards: [],
		buttons: {
			shuffle: document.getElementById('shuffle')
		},

		cardsToArray: function(){

			var self = this;
			var cards = document.getElementsByClassName('card');

			for (var i = 0; i < cards.length; i++){
				self.myCards.push(cards.item(i));
			}

		},

		shuffleCards: function(){

			var self = this;

			console.log("my shuffleCards fn called!");
			console.log(self.myCards);

			self.myCards = self.shuffleArray(self.myCards)

			self.myCards.forEach(function(cardElement, k){
				self.positionCard(cardElement, k);
			});

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

			var div = document.createElement("div");
			div.className = 'card card-' + index;
			document.getElementById('table').appendChild(div);

		},

		positionCard: function(element, index){

			var self = this;
			var row = parseInt(index / 13);
			var posX = (index % 13) * (self.width + self.margin) + 'px';
			var posY = (row * (self.height + self.margin)) + 'px';

			element.style.webkitTransform = 'translate(' + posX + ', ' + posY + ')';

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
			var cards;

			self.generateCards();
			self.cardsToArray();

			self.myCards.forEach(function(cardElement, k){
				self.positionCard(cardElement, k);
			});

			// Set listener for shuffle btn
			self.buttons.shuffle.addEventListener('click', self.shuffleCards.bind(this));

		}

	};
	
	cards.init();


}, false);