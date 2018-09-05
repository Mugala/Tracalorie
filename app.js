// Storage Controller




//Item Controller
const ItemCtrl = (function(){
  //Item Constructor
  const Item = function(id,name,calories){
    this.id = id;
    this.name = name;
    this.calories =calories;
  }

  // Data Structure / State
  const data = {
    items: [
      {id:0, name: 'Steak Dinner', calories:1200},
      {id:1, name: 'Cookie', calories: 400},
      {id:2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})();



//IU Controller
const UICtrl = (function(){
  
  //Public methods 
  return{
    
  }

})();



//App Controller
const App = (function(ItemCtrl,UICtrl){

  // Pulic methods
  return{
    init: function(){
      console.log('Initilizing the app...');
      const items = ItemCtrl.getItems();

      console.log(items);
    }
  }
  
})(ItemCtrl,UICtrl);

//Initializing App
App.init();