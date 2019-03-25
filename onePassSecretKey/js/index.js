//main
//
log("*** Alice crée son message en clair. ***");
// text to be ciphered
var plainTxt="Help me !"; // "Toujours avec le principe de substitution, le bon vieux César y a mis sa patte";//"Help me !"; // 9 chars
log("Texte clair : <b>"+plainTxt+"</b>");
log();
log("*** Création de la clé (de même longueur que le message) par Alice qu'elle enverra à Bob ***");
// Number of bytes per bloc
const by=4; // 32bits 
//
// key creation
// var key="$^ù*)=}|a"; // OR
var o=createKey (plainTxt.length);
var key=o.key;
var binKey=o.binKey; 
log("Clé affichée en binaire : "+binKey);
log("Clé utilisée : "+key);
log();
//
breakPoint();
// 
// Convert plain text to array of 4 bytes elements
var arrBy= stringToArrayBy(plainTxt,by);
log("*** Alice regroupe les caractères "+by+" par "+by+" ("+by*8+" bits) dans un tableau");
logArr(arrBy);
//
// Convert key to array of 4 bytes elements
var keyBy=stringToArrayBy(key,by);
log("Les caractères de la clé sont aussi regroupés par "+by);
logArr(keyBy);
//
// Ciphering
var cipherArr=cipher (arrBy,keyBy);
log("Le tableau est chiffré : ");
logArr(cipherArr);
log();
//
breakPoint();
// 
//
// Alice has given key to Bob
//
log("*** Bob  reçoit le message et le déchiffre avec la même clé ***"); 
// Unciphering
uncipherArr=uncipher(cipherArr,keyBy);
log("Tableau déchiffré (doit être égal au tableau 'avant chiffrement' ci-dessus)  : ");
logArr(uncipherArr);
// Uncipher array to string
var unciphText=arrayByToString (uncipherArr,by) ;
log("Text déchiffré (doit être égal au texte initial d'Alice ci-dessus) : <b>"+unciphText+"</b>");
//functions
/**
* Random key creation
* @param  len 			Length of plain text
* @return object with 
* 				key 	Created key
*				binKey 	binary string of key (only to display it)
*/
function createKey (len) {
	//TODO
}
function random () {
	//TODO
};

/**
* Creation of an array of 4 bytes (32 bits) elements
* @param  str 		A text string (message or key)
* @param  by		Number of  bytes (by=4) 					
* @return An array of 32 bits elements
*/
function stringToArrayBy (str,by) {
	var arrOut=[]; var c=0;	
	for (i=0;i<str.length;i++) {
		c=c*256+str.substr(i,1).charCodeAt(0) ;
		if (i%by==(by-1)) {
			arrOut.push(c);	c=0;
		}		
	}
	if (c!=0) arrOut.push(c);	
	return arrOut;	
}
/**
* Ciphering 
* @param  msgArr 			Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array					
* @return Ciphered message in 32 bits elements array
*/
function cipher (msgArr,keyArr) {
	//TODO
}
/**
* Unciphering 
* @param  cipherArr 		Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array					
* @return Unciphered message in 32 bits elements array
*/
function uncipher (cipherArr,keyArr) {
	//TODO
}
/**
* Reconstruction of plain text
* @param  arr 		Unciphered array
* @param  by		Number of  bytes (by=4) 					
* @return Original text reconstituted
*/
function arrayByToString (arr,by) {
	var str=""; var strBy=""; var c;
	for (var i=0;i<arr.length;i++) {
		var nBy=arr[i];	
		for (var j=0;j<by;j++) {
			c=nBy%256; 								// extract current right byte value
			if (c!=0) {  
				strBy=String.fromCharCode(c)+strBy; // put char at the left of tmp string
				nBy=Math.floor(nBy/256);			// suppress right byte
			 }
		}
		str+=strBy;strBy="";
	}
	return str;
}
//util func
function log (o="") {
	$("info").innerHTML+=o+"<br/>";
}
function logArr (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log(" ["+arr[i]+"]");
	}	
}
function $ (id) { 
	return document.getElementById(id);
}
function breakPoint () {
	var str="Break point";
	log(str);
	throw(str);
}


