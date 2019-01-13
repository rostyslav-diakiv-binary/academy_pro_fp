export interface IKeyValue {
  [key: string]: any;
}

export const capitalize = (str?: string) =>
  str && str.charAt(0).toLocaleUpperCase() + str.substr(1);

export const checkIfContainsSpecifiedProps = <T>(props: (keyof T)[]) => (
  dateOrder: any
) => props.every(p => dateOrder[p] !== undefined);

export const arrayDifference = <T>(a1: T[], a2: T[]): T[] => {
  return a1.filter(e => a2.indexOf(e) === -1);
};

export const pickProperties = <T extends IKeyValue>(
  properties: (keyof T)[]
) => {
  return (obj: Partial<T>) => {
    const newObject: Partial<T> = {};
    properties.forEach(p => {
      if (!newObject[p]) {
        Object.defineProperty(newObject, p, {
          writable: true,
          value: obj[p]
        });
      }
    });

    return newObject;
  };
};

export const groupBy = (xs: any[], key: string) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const capitalizeProperty = <T extends IKeyValue>(property: keyof T) => (
  obj: T
) => {
  return Object.assign({}, obj, {
    [property]: capitalize(obj[property])
  }) as T;
};

export const addDollarSignToProperty = <T extends IKeyValue>(
  property: keyof T
) => (obj: T) => {
  return Object.assign({}, obj, {
    [property]: `$${obj[property]}`
  }) as T;
};

export const date_sort = (
  date1: Date | string | undefined,
  date2: Date | string | undefined,
  ascending: boolean = true
) => {
  if (!date1) return -1;
  if (!date2) return 1;

  if (typeof date1 === "string") {
    date1 = new Date(date1);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }

  if (date1 > date2) return ascending ? 1 : -1;
  if (date1 < date2) return ascending ? -1 : 1;
  return 0;
};

export const byDate = <T extends IKeyValue>(property: keyof T) => (
  o1: T,
  o2: T
) => date_sort(o1[property], o2[property]);

export const groupByWithProps = (
  groupByProp: keyof IKeyValue,
  groupItemProps: (keyof IKeyValue)[]
) => (acc: { [key: string]: IKeyValue[] }, i: IKeyValue) => {
  const groupByPropValue: string = i[groupByProp];
  if (!groupByPropValue) {
    return acc;
  }
  const group = acc[groupByPropValue];
  if (!group) {
    Object.defineProperty(acc, groupByPropValue, {
      enumerable: true,
      value: [pickProperties(groupItemProps)(i)]
    });
  } else {
    group.push(pickProperties(groupItemProps)(i));
  }

  return acc;
};

export const groupByWithPropsTyped = <T extends IKeyValue>(
  groupByProp: keyof T,
  groupItemProps: (keyof T)[]
) => (acc: { [key: string]: Partial<T>[] }, i: T) => {
  const groupByPropValue: string = i[groupByProp];
  if (!groupByPropValue) {
    return acc;
  }
  const group = acc[groupByPropValue];
  if (!group) {
    Object.defineProperty(acc, groupByPropValue, {
      enumerable: true,
      value: [pickProperties(groupItemProps)(i)]
    });
  } else {
    group.push(pickProperties(groupItemProps)(i));
  }

  return acc;
}; 

// ================================== unused
// .reduce((acc: { [key: string]: Partial<typeof i>[] }, i: DateOrder) => {
//   if (!i.date) {
//     return acc;
//   }
//   if (!acc[i.date]) {
//     Object.defineProperty(acc, i.date, {
//       enumerable: true,
//       value: [pickProperties(["name", "price"])(i)]
//     });
//   } else {
//     acc[i.date].push(pickProperties<typeof i>(["name", "price"])(i));
//   }

//   return acc;
// }, {});

export const getArrayData = (arr: any[]) => {
  arr.forEach(o => {
    console.log(Object.keys(o));
    console.log(Object.values(o));
    console.log(Object.entries(o));
    console.log(Object.getOwnPropertyNames(o));
    console.log(Object.getOwnPropertyDescriptor(o, ""));
  });
};

(Array.prototype as any).scan = function(callback: any, initialValue: any) {
  const appendAggregate = (acc: any, item: any) => {
    const aggregate = acc.slice(-1)[0]; //get last item
    const newAggregate = callback(aggregate, item);
    return [...acc, newAggregate];
  };

  const accumulator = [initialValue];

  return this.reduce(appendAggregate, accumulator);
};

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}