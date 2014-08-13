var marvinize = (function () {
	var visible = false;
	var flipped = false;

	var getMessage = function() {
		$.get("/marvinize/facts.txt", function(data) {
			var facts = data.replace("\r", "").split("\n");
			console.log(facts);
			
			var max = facts.length;
			console.log(max);
			
			var random = Math.floor(Math.random() * max);
			console.log(random);
			
			var theword = facts[random];
			console.log(theword);
			
			return theword; //facts[random];
		});
	};


	// ivar msg = getMessage();

	var toggle = function() {
		if (!flipped) { // right side up
			if (!visible) {
				$("#marvin").stop(true).animate({ 'margin-bottom': 600 }, { queue: false, duration: 1000 });
				addQuote();
				visible = true;
			}
			else {
				$('#marvin').stop(true).animate({ 'margin-bottom': 125 }, { queue: false, duration: 1000 });
				removeQuote();
				visible = false;
			}
		}
		else { // upside down
			if (!visible) {
				$("#marvin").stop(true).animate({ 'margin-bottom': -700 }, { queue: false, duration: 1000 });
				addQuote();
				visible = true;
			}
			else {
				$('#marvin').stop(true).animate({ 'margin-bottom': -225 }, { queue: false, duration: 1000 });
				removeQuote();
				visible = false;
			}
		}
	};
	
	var addQuote = function () {
		$("#marvin").prepend("<div class='marvinize-quote' style='display: none'><p>" + msg + "</p></div>");
		
		$('.marvinize-quote').css({ top: '170px', left: '375px' });
		$('.marvinize-quote').show();
		
		// flip the text so it's not upside down if the entire thing is flipped
		if (flipped) {
			$('.marvinize-quote p').addClass('flipped');
		}
	};
	
	var removeQuote = function () { 
		$(".marvinize-quote").remove();
	};
	
	var automate = function() { 
		setTimeout(function() {
			toggle();
		}, 1000);

		setTimeout(function() {
			if (visible) {
				toggle();
			}
		}, 5000);
	};

	var go = function (message, flip) {
		msg = message || getMessage();
		
		// flipped = flip || Math.random() > .5; // 30% chance
		flipped = false;
		$("body").append("<div id='marvin' class='marvin'><img src='marvinize/images/marvin.png' /></div>");
		
		if (flipped) {
			$("#marvin").addClass('flipped');
			$("#marvin").css({ bottom: '800px' });
		}
		
		automate();
		
		$("#marvin").hover(function() {
			if (!visible) {
				toggle();
			}
		});
		
		$("#marvin").mouseleave(function() {
			if (visible) {
				toggle();
			}
		});
	};

	return {
		go: go
	};
})();
