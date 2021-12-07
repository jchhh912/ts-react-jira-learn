import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URl;

export const ProjectListScreerns = () => {
  //数据状态保存
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  //泛型规范之后与param一致
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  //访问list接口
  //引用npm intall qs包 打包传入值 将整个传入
  //projects?name=${param.name}&presonId=${param.personId}
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
