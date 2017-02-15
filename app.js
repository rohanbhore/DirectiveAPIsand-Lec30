(function()
{
  'use strict';
angular.module('ShoppingListDirectiveApp',[])
.controller('ShoppingListController',ShoppingListController)
.factory('ShoppingListFactory',ShoppingListFactory)
.directive('shoppingList',ShoppingListDirective);

function ShoppingListDirective()
{
  var ddo=
  {
    templateUrl:'shoppingList.html',
    scope:
    {
      items: '=',
      myTitle:'@title',
      //onRemove:'&',
      badRemove:'='
    },
    controller:ShoppingListDirectiveController,
    controllerAs:'list',
    bindToController: true
  };

  return ddo;
}
function ShoppingListDirectiveController()
{
     var list=this;
  list.cookiesInList=function()
  {
    for(var i=0;i<list.items.length;i++)
    {
      var name=list.items[i].name;
      if(name.toLowerCase().indexOf("cookie") !==-1)
      {
        return true;
      }
    }
    return false;
  };
}
ShoppingListController.$inject=['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory)
{
    var list=this;
    var shoppingList = ShoppingListFactory();

    list.items=shoppingList.getItems();
    var origTitle="Shopping List 1";
    list.title= origTitle + " ("+ list.items.length +" items)";
    list.itemName="";
    list.itemQuantity="";
    list.addItem = function()
    {
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title= origTitle + "("+ list.items.length +" items)";
    }
    list.removeItem = function(itemIndex)
    {
      console.log("'this' is:",this);
      list.lastRemoved="Last Item Removed was "+ this.items[itemIndex].name;//this
      shoppingList.removeItem(itemIndex);
      list.title= origTitle + "("+ list.items.length +" items)";
    };
}

function ShoppingListService(maxItems)
  {
    var service=this;
    //list of shopping items
    var items =[];
    service.addItem = function(itemName,quantity)
    {
      if((maxItems === undefined)||
      (maxItems !==undefined) && (items.length <maxItems))
      {
      var item= {
                  name: itemName,
                  quantity: quantity
                };
               items.push(item);//check
      }
      else
      {
        throw new Error("Max items(" + maxItems + ") reached.");
      }
    };
    service.removeItem=function(itemIndex)
    {
      items.splice(itemIndex,1);
    };
    service.getItems=function()
    {
      return items;//nothing is changed
    };
  }
function ShoppingListFactory()
  {
    var factory=function(maxItems)
    {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
})();
