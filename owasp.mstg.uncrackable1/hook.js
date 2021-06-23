setImmediate(function() {
    console.log("[*] Start");
    

    Java.perform(function() {
       
        console.log("[*] Loading Base64 class")
        var b64Def = Java.use('android.util.Base64');
       
        console.log("[*] Loading sg.vantagepoint.uncrackable1.a")
        var clazz_b = Java.use('sg.vantagepoint.uncrackable1.a');
        
        console.log("[*] Loading sg.vantagepoint.a.a")
        var clazz = Java.use('sg.vantagepoint.a.a');
        
        console.log("[*] Extracting the key ")
        var key = clazz_b.b("8d127684cbc37c17616d806cf50473cc")
        console.log("[*] Base64 decoding the secret ")
        var secret = b64Def.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0)
        console.log("[*] Decrypting the secret with the extracted key") 
        var buffer = clazz.a(key,secret)
        
        var result = ""
        for(var i = 0; i < buffer.length; ++i){
                result+= (String.fromCharCode(buffer[i]));
        }
        console.log()
        console.log("****** SECRET ******")
        console.log(result)
        console.log("****** SECRET ******")
        console.log()

    })
    
    console.log("[*] End");

})