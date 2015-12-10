window.five           = function(obj){
  this.wrap   = document.querySelector('[five-app=' + obj[0] + ']');
  this.view   = this.wrap.querySelector('[five-view]');
  var self    = this;
  var fv_href = this.wrap.querySelectorAll('[fv-href]');
  for(var i = 0; i < fv_href.length; i++){
    fv_href[i].removeEventListener('touchend');
    fv_href[i].addEventListener('touchend', function(){
      var href = this.getAttribute('fv-href');
      self.sethash(href)
    })
  }
}
window.five.prototype = {
  flag      : true,
  config    : function(router){
    router(this.router);
    var self            = this;
    this.sethash();
    window.onhashchange = function(){
      self.flag ? self.sethash() : ''
    }
  },
  path      : function(url, param){
    this.view.style.display = 'none';
    document.body.scrollTop = 0;
    var x                   = new XMLHttpRequest(), target, self = this;
    if(url == undefined){
      target = this.router.data['redirectTo'];
    }
    else{
      target = url
    }
    console.log(target)
    x.open('GET', this.router.data.link[target]['templateUrl'], true);
    x.send('bb');
    x.onreadystatechange    = function(s){
      if(x.readyState == 4){
        var r                   = x.response;
        self.view.innerHTML     = r;
        self.view.style.display = 'block';
        self.router.data.link[target]['controller'](param);
        self.route_bind()
      }
    };
  },
  sethash   : function(hash, param){
    if(hash == undefined){
      hash = location.hash;
      if(hash.length){
        var cache = hash.slice(1);
        if(cache.indexOf('?') > -1){
          var v = cache.slice(0, cache.indexOf('?'));
          if(this.router.data.link[v] == undefined){
            location.hash = '';
            this.path();
          }
          else{
            this.path(v, cache.slice(cache.indexOf('?') - 1 + 2));
          }
        }
        else{
          if(this.router.data.link[cache] == undefined){
            location.hash = '';
            this.path();
          }
          else{
            this.path(cache);
          }
        }
      }
      else{
        this.path()
      }
    }
    else{
      this.flag     = false
      location.hash = param ? hash + '?' + param : hash;
      this.path(hash, param)
    }
  },
  route_bind: function(){
    this.flag   = true
    var fv_href = this.view.querySelectorAll('[fv-href]');
    var self    = this;
    for(var i = 0; i < fv_href.length; i++){
      fv_href[i].addEventListener('touchend', function(){
        var href = this.getAttribute('fv-href');
        self.sethash(href)
      })
    }
  },
  router    : {
    when     : function(hash, obj){
      console.log(this)
      this.data.link[hash] = obj;
      return this;
    },
    otherwise: function(hash){
      this.data.redirectTo = hash;
    },
    data     : {
      link: {}
    }
  }
}
