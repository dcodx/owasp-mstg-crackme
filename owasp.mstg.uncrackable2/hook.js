function rootDetectionBypass(){

	console.log("[*] Start removing root detection");
	/*

		Dirty way of bypassing the root detection, avoiding the app to close.

	*/

	Java.perform(function() {
   
   
	    console.log("[*] Hijacking the onClick button")
	    var clazz_main = Java.use('sg.vantagepoint.uncrackable2.MainActivity$1')

	 	 clazz_main.onClick.implementation = function () {
			console.log('[*] onCLick has been replaced ');
			
		};
   	
	});

console.log("[*] End root detection removed, you can safely click OK");

}




function extractSecret(){

	/*
	
		To use this function, we need to pass in input an argument with 23 chars. We chose: I want your secret asap

	*/

	console.log()
	console.log('[*] ACTION NEEDED: Insert the string "I want your secret asap" as input')
	console.log()
	setTimeout(function(){
		Interceptor.attach(Module.findExportByName('libfoo.so', 'strncmp'),{

			onEnter: function(args){

				if( Memory.readUtf8String(args[1]).length == 23 && Memory.readUtf8String(args[0]).includes("I want your secret asap")){
					console.log()
					console.log()
					console.log("*******SECRET********")
					console.log(Memory.readUtf8String(args[1]))
					console.log("*******SECRET********")
					console.log()
					console.log()
				}

			},

			onLeave: function(retval){

			}

		});
	},2000);
}


//calling directly the root detection bypass, executed when Frida runs

rootDetectionBypass()
extractSecret()

