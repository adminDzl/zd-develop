 
 
var DEFAULT_STORAGE = 'session'
var Cache = function(storage){
    this.hash = {};
    this.length = 0;
    this.storage = storage||DEFAULT_STORAGE;
    return this;
};
Cache.prototype.init = function(storage){
    this.storage = storage;
    return this;
}
Cache.prototype.put = function(key,value){
    // if(this.hash[key]){
    //     return false;
    // }
    this.hash[key] = value;
    this.length ++;
    this._setStorage(key,value);
    return this;
};
Cache.prototype.get = function(key){
    if(this.hash[key]){
        return this.hash[key];
    }else {
        var myStorage;
        if(this.storage=='session'){
            myStorage =  JSON.parse(window.sessionStorage.getItem(key)); 
            return myStorage;
        }
        if(this.storage=='local' ){
            myStorage =  JSON.parse(window.localStorage.getItem(key));
            
            return myStorage;
        }
    }
};
Cache.prototype._setStorage = function(key,value){
    if(!this.storage)return false;
    if(this.storage=='session'){            
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }else if(this.storage =='local'){            
        window.localStorage.setItem(key,JSON.stringify(value));
    }			 
};
Cache.prototype._delFromStorage = function(key){
    if(!this.storage)return false;
    if(this.storage=='session'){
       
        window.sessionStorage.removeItem(key);
    }else if(this.storage =='local'){
        
        window.localStorage.removeItem(key);
    }			 
}
Cache.prototype.del =function(key){
    if(this.hash[key]){
        this.length --;
        this.hash[key] = null;
        delete this.hash[key];
    }
    this._delFromStorage(key);
};
Cache.prototype.update = function(key,value){
    if(this.hash[key]){
        this.hash[key] = value;
    }
    this._setStorage(key,value);
};
export default new Cache('session');