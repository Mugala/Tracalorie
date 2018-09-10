/*=========================================================================================================================================================
Storage Controller
*/ //=======================================================================================================================================================



/*=========================================================================================================================================================
Item Controller
*/ //=======================================================================================================================================================

const ItemCtrl = (function() {
  //Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      // {id:0, name: 'Steak Dinner', calories:1200},
      // {id:1, name: 'Cookie', calories: 400},
      // {id:2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;

      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create new item
      newItem = new Item(ID, name, calories);

      //Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      //loop through the items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      //Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: function(id){
      //Get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      //Get index
      const index = ids.indexOf(id);

      //Remove item
      data.item.splice(index,1);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      //loop through items then add calories 

      data.items.forEach(function(item) {
        total += item.calories;
      });

      //set total cal in data structure
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }
})();

//=========================================================================================================================================================

/*=========================================================================================================================================================
IU Controller
*/ //======================================================================================================================================================

const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItem: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  //Public methods 
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;

    },
    getItemInput: function() {
      return {

        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      //show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      // Add id
      li.id = `item-${item.id}`;

      //Add html
      li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItem);

      //Turn node list to array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function (id){
      const itemID =`#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }

})();

//=======================================================================================================================================================


/*========================================================================================================================================================
App Controller
*/ //=====================================================================================================================================================

const App = (function(ItemCtrl, UICtrl) {
  //Load event Listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
       ;


    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  }


  //Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    //Check for name and calories input
    if (input.name !== '' && input.calories !== '') {
      // Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total cal to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear fields  
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //item edit click

  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      //Get list item id(item-0)

      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');
      // Get the actual id

      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);


      //set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();

    }

    e.preventDefault();
  }
  //Item update submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update ui
    UICtrl.updateListItem(updatedItem);

    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total cal to the UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  }


  //Delete button event
  const itemDeleteSubmit =function(e){
    //Get current item 
    const currentItem =ItemCtrl.getCurrentItem();

    //Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    //Delete from UI
    UICtrl.deleteListItem(currentItem.id);
    
    e.preventDefault();
  }



  // Pulic methods
  return {
    init: function() {

      //Clear edit state / set initial state
      UICtrl.clearEditState();

      //Fetch items from the data structrure
      const items = ItemCtrl.getItems();

      //check if any items 
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total cal to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Load event listener
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

//Initializing App
App.init();

//========================================================================================================================================================