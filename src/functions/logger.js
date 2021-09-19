export function log(debug, message, data) {

    if (debug) {
        if(data){
            console.log(`%s: %o`, message, data);
        }else{
            console.log(`%s`, message);
        }

    }

}
