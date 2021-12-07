import React, { useState } from "react";
import { useMount } from "utils";

// interface P {
//   name: string;
//   age: number;
// }
//Hock方法
export const useArray = <T,>(initialArray: T[]) => {
  //获取数据模型
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    //添加一个泛型数组支持单个T 添加和多个
    add: (item: T) => setValue([...value, item]),
    //赋值空数组
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      //浅拷贝
      const copy = [...value];
      //切割第一个
      copy.splice(index, 1);
      //赋值
      setValue(copy);
    },
  };
};

export const TsReactTese = () => {
  //const persons:P[]
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    // console.log(value.notExist);
    // add({ name: "david" });
    // removeIndex("123");
  });
  //注意 再.map(()=>{}中括号需要显示指示return语句https://stackoverflow.com/questions/64518433/how-fix-this-warrning-warning-array-prototype-map-expects-a-return-value-from
  // 或者使用隐形指示‘()’来，否则会无法显示出效果)
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => (
        <div style={{ marginBottom: "30px" }} key={index}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
