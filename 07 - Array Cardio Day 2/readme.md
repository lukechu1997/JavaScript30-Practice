# Array Cardio Day 2

## some()

```jsx
//複雜
const isAdult = people.some(function (person) {
	const currentYear = (new Date()).getFullYear();
	if (currentYear - person.year >= 19) {
	    return true;
	}
});
//簡化
const is_adult = people.some(persion => {
	const currentYear = (new Date()).getFullYear();
	return currentYear - persion.year >= 19;
});
//極簡   
const is_adult = people.some(persion => (new Date()).getFullYear() - persion.year >= 19);
```

`Array.prototype.some()` 透過給定函式、測試陣列中是否至少有一個元素，通過該函式所實作的測試，這方法回傳的是布林值

## every()

```jsx
const is_adult = people.every(persion => (new Date()).getFullYear() - persion.year >= 19);
```

`Array.prototype.every()`測試陣列中的所有元素是否都通過了由給定之函式所實作的測試，這方法回傳的是布林值

## find()

```jsx
const comment = comments.find(function (comment) {
  if(comment.id === 823423) {
    return true;
  }
});
//極簡
const comment = comments.find(comment => comment.id === 823423);
```

`Array.prototype.find()`回傳第一個滿足所提供之測試函式的元素值

## findIndex()

```jsx
// Find the comment with this ID
// delete the comment with the ID of 823423
const index = comments.findIndex(comment => comment.id === 823423);

comments.splice(index, 1);

//redux
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];
```

`Array.prototype.findIndex()`依據提供的測試函式，尋找陣列中符合的元素，並返回其 index（索引）