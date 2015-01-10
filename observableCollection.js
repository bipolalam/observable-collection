/**
 * Created by netanel on 10/01/15.
 */
angular.module('observableCollection', [])
  .factory('ObservableCollection', function() {
  var ObservableCollection = function() {
    this.data = [];
    this.addObservers = [];
    this.updateObservers = [];
    this.removeObservers = [];
  };

  ObservableCollection.prototype.onAdd = function(cb) {
    this.addObservers.push(cb);
  };

  ObservableCollection.prototype.onUpdate = function(cb) {
    this.updateObservers.push(cb);
  };

  ObservableCollection.prototype.onRemove = function(cb) {
    this.removeObservers.push(cb);
  };

  ObservableCollection.prototype.add = function(id, item) {
    var newItem = angular.extend(item, { _id : id });
    var newItemIndex = this.data.length;
    this.data.push(newItem);
    angular.forEach(this.addObservers, function(cb) {
      cb(newItem, newItemIndex);
    });
  };

  ObservableCollection.prototype.update = function(id, item) {
    var updatedItem;
    var updatedItemIndex;
    angular.forEach(this.data, function(item, index) {
      if (item._id === id) {
        updatedItem = item;
        updatedItemIndex = index;
      }
    });
    updatedItem.item = item;
    angular.forEach(this.updateObservers, function(cb) {
      cb(updatedItem, updatedItemIndex);
    });
  };

  ObservableCollection.prototype.remove = function(id) {
    var removedItem;
    var removedItemIndex;
    angular.forEach(this.data, function(item, index) {
      if (item._id === id) {
        removedItem = item;
        removedItemIndex = index;
      }
    });
    this.data.splice(removedItemIndex, 1);
    angular.forEach(this.removeObservers, function(cb) {
      cb(removedItem, removedItemIndex);
    });
  };

  ObservableCollection.prototype.getData = function() {
    return this.data;
  };

  return ObservableCollection;
});
