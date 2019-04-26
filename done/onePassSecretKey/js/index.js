//main
//
log("*** Alice crée son message en clair. ***");
// text to be ciphered
var plainTxt="Please Help me !" ;
//var plainTxt=toUnicode("Plœase Help me !") ; // œ // &#339; // "Toujours avec le principe de substitution, le bon vieux César y a mis sa patte";//"Help me !"; // 9 chars
log("Texte clair : <b>"+plainTxt+"</b>");
log();
log("*** Création de la clé (de même longueur que le message) par Alice qu'elle enverra à Bob ***");
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
// breakPoint();
//
// Convert plain text to array of 4 bytes elements
var arrBy= stringToArray(plainTxt);
log("*** Alice regroupe les caractères 4 par 4 (32 bits) dans un tableau");
logArr(arrBy);
//
// Convert key to array of 4 bytes elements
var keyBy=stringToArray(key);
log("Les caractères de la clé sont aussi regroupés par 4");
logArr(keyBy);
//
// Ciphering
var cipherArr=cipher (arrBy,keyBy);
log("Le tableau est chiffré : ");
logArr(cipherArr);
log();
//
//breakPoint();
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
var unciphText=arrayToString (uncipherArr) ;
log("Text déchiffré (doit être égal au texte initial d'Alice ci-dessus) : <b>"+unciphText+"</b>");
//

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
	var key="";var binKey8=""; var binKey=""; var k=0;
	for (i=0;i<len*8;i++) {
		var bit=random();
		var k=k+bit;
		binKey8+= bit.toString() ; // binKey8+=""+bit; // binkey+=String(bit);
		if ( i%8==7) {
			key+=String.fromCharCode(k);
			binKey+=binKey8+"."; binKey8="";
			k=0;
		}
		k=k<<1; // k*=2;
	}
	return {binKey:binKey,key:key};
}

function random () {
	//TODO
	return Math.floor(Math.random() * 2);
};

/**
* Creation of an array of 4 bytes (32 bits) elements
* @param  str 		A text string (message or key)
* @return An array of 32 bits elements
*/
function stringToArray (str) {
	// To explain
	var arrOut=[];
	for (i=0;i<str.length;i+=4) {
		newByte = compact(
			str.charCodeAt(i),
			str.charCodeAt(i + 1), // Note: .charCodeAt(j) returns NaN if j
			str.charCodeAt(i + 2), // is out of bound, which is not an issue
			str.charCodeAt(i + 3)  // since "NaN << x === 0".
		);
		arrOut.push(newByte);
	}
	return arrOut;
}


/**
* Compact four bytes (i.e., ints below 256) in an int of 4 bytes.
* @param a, b, c, d 	fours 8-bits ints. If they are NaN, they
*						will be considered as 0.
* @return A 32-bits int
*/
function compact (a, b, c, d) {
	if(a > 255 || b > 255 || c > 255 || d > 255){
		error("Use of unicode 16 bits chars is not allowed!");
	}

	// the "<< 0" if hack to coerce d into 0 if d is NaN.
	return a << 24 | b << 16 | c << 8 | d << 0;
}



/**
* Ciphering
* @param  msgArr 			Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array
* @return Ciphered message in 32 bits elements array
*/
function cipher (msgArr,keyArr) {
	// TODO
	var arrOut=[]; var j=0;
	for (var i in msgArr) {
		if (j>keyArr.length-1) j=0 ;
		arrOut.push((msgArr[i] ^ keyArr[j]));
		j++;
	}
	return arrOut;
}
/**
* Unciphering
* @param  cipherArr 		Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array
* @return Unciphered message in 32 bits elements array
*/
function uncipher (cipherArr,keyArr) {
	//TODO
	return cipher (cipherArr,keyArr) ;
}

/**
* Reconstruction of plain text
* @param  arr 		Unciphered array
* @param  by		Number of  bytes (by=4)
* @return Original text reconstituted
*/
function arrayToString (arr) {
	var str="";
	for (var i=0;i<arr.length;i++) {
		str += unpack(arr[i]);
	}
	return str;
}

/**
* Interprete an 32-bits int as a string of 4 chars,
* 8 bits by char. The bytes containing only "0" are truned into the empty
* string.
* @param n 		an integer
* @return       a string.
*/
function unpack (n) {
	var mask = 0b11111111; // eight "1", mask == 255

	var d = n & mask;
	var c = (n >> 8) & mask;
	var b = (n >> 16) & mask;
	var a = (n >> 24) & mask;
	return (
		(a !== 0 ? String.fromCharCode(a): "")
		+ (b !== 0 ? String.fromCharCode(b): "")
		+ (c !== 0 ? String.fromCharCode(c): "")
		+ (d !== 0 ? String.fromCharCode(d): "")
	);
}
function toUnicode(str) {
	var nc; var utf;
	for (i=0;i<str.length;i++) {
		nc=str.substr(i,1).charCodeAt(0);
		if (nc>255) {
			str=str.substr(0,i)+"&#"+nc+";"+str.substr(i+1);
		}
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
function error (str) {
	log("Fatal error. "+str);
	throw(str);
}


