var five=new five(['five']);
five.config(function($router){
  $router.when('/home',{
    controller:home,
    templateUrl:'home.html'
  }).when('/others',{
    controller:others,
    templateUrl:'others.html'
  }).otherwise('/home')
});

function home(){
  alert('home')
}
function others(){
  alert('others')

}
