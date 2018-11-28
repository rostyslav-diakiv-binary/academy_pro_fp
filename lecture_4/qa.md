# Functional Programming in Practice

>*A monad in X is just a monoid in the category of endofunctors of X*

---

# Lecture 4 - QA session

---

Agenda:
1. Recursion
2. Memoization

---

# Memoization

> Memoization is the programmatic practice of making long recursive/iterative functions run much faster.

---

> Memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

---

## Example

    const array = [1, 2, 3, 4];
    const memoMap = memoize(map(x => x * 2));
    const newArray = memoMap(array);
    const anotherArray = memoMap(array); // instantly returns a result

---
## Example

    const reorderMatrix = (columns, rowNumber, columnNumber, item) => {
        const memoizedFlatten = memoize(flatten);
        const currentIndex =
            ceil(memoizedFlatten(columns).length / columns.length) * columnNumber + rowNumber;

        return flow(
            memoizedFlatten,
            reorderArray(item, currentIndex),
            makeChunks(columns.length)
        )(columns);
    };

---

> If you want to store your data - use cache. If you want to store your calculcations - use memoization.
