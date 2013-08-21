/* CODEKIT APPENDS/PREPENDS
 * @codekit-prepend "vendor/jquery-1.10.2.min.js", "vendor/modernizr.min.js";
 * @codekit-append "lib/swipe.js";
*/

var jq = jQuery;
var windowWidth = 0;
var url = 'http://private-9c16-themoviedb.apiary.io/3/search/movie?query=';
var input = '';
var movieName = '';
var key = '&api_key=d703360f23b73e0e039a3909f417c0ca';
var queryKey = '?api_key=d703360f23b73e0e039a3909f417c0ca';
var imgUrl = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185/';
var poster = '';

jq(document).ready(function(){
	
	jq(window).resize(function() {
		windowWidth = jq(window).width();
	}).resize();

	jq('form').submit(function () {
		input = jq('#movie-input').val();
        movieName = encodeURI(input);
        movieRequest(movieName);
		return false;
	});

    jq('.submit-button').click(function() {
        input = jq('#movie-input').val();
        movieName = encodeURI(input);
        movieRequest(movieName);
        console.log(url + movieName + key);						
    });

    

	function movieRequest(movie){
		jq.getJSON(url + movieName + key, function(){
        	console.log("Success");
        	console.log(url + movieName + key);	
        })
        .done(function(data){
        	console.log(data.results[0]);
        	jq.each( data.results, function(i, item ){
        		console.log(item.poster_path);
       			if (item.poster_path == null) {
       				poster = "http://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffd/images/no-poster-w185.jpg";
       			} else {
       				poster = imgUrl + item.poster_path;
       			}

        		content = "<div class='movie-container'>";
        			content += "<div class='flipper'>";
        				content += "<div class='front'>";
        					content += "<img alt='movie poster' width='185px' height='278px' class='movie-poster' src='" + poster + "' />";
        				content += "</div>";
        				content += "<div class='back'>";
        					content += "<p>" + item.title + "</p>";
        				content += "</div>";
        			content += "</div>";
        		content += "</div>";
        		jq(content).prependTo(".outer-container");

        		if ( i === 3 ) {
			    	return false;
			    }
        	});
        })
        .fail(function() { 
        	console.log( "error" ); 
        })
		.always(function() { 
			console.log( "complete" ); 
		});
	}
	/*
	function imageRequest(path){
		jq.getJSON(configuration + queryKey, function(){
        	console.log("Success");
        })
        .done(function(data){
        	console.log(path);
        	imageUrl = data.images.base_url + data.images.poster_sizes[1] + path;
        	console.log(imageUrl);
        	return imageUrl;
    	})
    	.always(function() { 
			console.log( "complete" ); 
		});
	}
	*/
	

});