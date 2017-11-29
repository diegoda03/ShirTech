function nuevoAjax(){
        var xmlhttp=false;
        if(typeof XMLHttpRequest!='undefined'){
                xmlhttp = new XMLHttpRequest();
        }else{
                try {
                        this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                        try {
                                        this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (E) {
                                xmlhttp = false;
                        }
                }
        }
        return xmlhttp;
}

