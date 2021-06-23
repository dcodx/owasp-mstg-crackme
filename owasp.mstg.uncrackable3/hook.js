function extractSecret(){

	setTimeout(function(){
		var base_address = Module.findBaseAddress('libfoo.so')
		var extract_secret_function = base_address.add(0xFA0)

		Interceptor.attach(extract_secret_function,{

			onEnter(args) {
				console.log('Base address libfoo.so: ' + base_address)
				console.log('Base address secret_function: ' + extract_secret_function)
				console.log('Reading buffer args[0]') 
				this.buf = args[0]
				console.log('Buffer reading completed')
	  		},

		  	onLeave(result) {
			    console.log('---------------------')
			    var numBytes = 24
		    	var buff = Memory.readByteArray(this.buf,numBytes)	   	
			    console.log('[*] Secret key hexdump')
			    console.log('---------------------')
			    console.log(hexdump(buff, { length: numBytes, ansi: true }));
			   	var secret_key = new Uint8Array(buff)
			    var str = "";
				for(var i = 0; i < secret_key.length; i++) {
				    str += (secret_key[i].toString(16) + " ");
				}
				console.log('---------------------')
				console.log('[*] Secret key ')
			    console.log('---------------------')
			    console.log(secret_key)
			   	console.log('---------------------')
			   	console.log('[*] XOR key ')
			   	console.log('---------------------')
			   	var xor_key = 'pizzapizzapizzapizzapizz';
			    console.log(xor_key);
			   	console.log('---------------------')
			   	console.log('[*] Plaintext secret')
			   	console.log('---------------------')
			   	var secret = []
			   	for (var i =0;i<numBytes;i++){
			   		secret[i] = String.fromCharCode(secret_key[i] ^ xor_key.charCodeAt(i));
			   	}
			   	console.log(secret.join(''))
			   	console.log('---------------------')
			}
		});
	},2000);
}

function rootAndTamperingDetectionBypass(){

	console.log("[*] Start removing root and tampering detection");

	var System = Java.use('java.lang.System');		
	System.exit.implementation = function(var0) {
    	
    	console.log("Ciao bella, I'm sorry but today you are not exiting");	
	};

	console.log("[*] fgets overloading to avoid Frida detection")
	var fgetsPtr = Module.findExportByName("libc.so", "fgets");
	var fgets = new NativeFunction(fgetsPtr, 'pointer', ['pointer', 'int', 'pointer']);
	
	Interceptor.replace(fgetsPtr, new NativeCallback(function (buffer, size, fp) {		
        var retval = fgets(buffer, size, fp);
        var bufstr = Memory.readUtf8String(buffer);
        if (bufstr.indexOf("frida") > -1) {
            Memory.writeUtf8String(buffer, "ByeByeFrida:\t0");
        }
        return retval;
    }, 'pointer', ['pointer', 'int', 'pointer']));

	console.log("[*] Root and tampering detection removed, you can safely click OK");	

}






//calling directly the root and tampering detection bypass, executed when Frida runs
rootAndTamperingDetectionBypass()
extractSecret()




