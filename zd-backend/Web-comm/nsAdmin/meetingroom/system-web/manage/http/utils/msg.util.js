
import jQuery  from 'jquery';
 
const Msg = {};
let times = 0;
Msg.instance = null;
Msg._init = function(){
    if(!this.instance){
        this.instance = $('#toast')
    }
    this.instance.show();
}
Msg._set = function(msg){
    Msg._init();    
    this.instance.find('.c-panel').html(msg);
    times = setTimeout(function(){
        Msg.hide();
    },3000);
}
Msg.setMsg = function(msg){
  this._set(msg)
}
Msg.setText = function(msg){
    this._set(msg)
  };
Msg.hide = function(){
    this.instance.hide().find('.c-panel').html('');
    clearTimeout(times)
}
export default Msg;