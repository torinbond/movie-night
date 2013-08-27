<?php
	$decoded = base64_decode($_POST['json'])
	$jsonFile = fopen('myMovies.json','w+');
	fwrite($jsonFile,$decoded);
	fclose($jsonFile);
?>