import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UsersGrid from "../../components/UsersGrid";
import { getSearchUsers } from "../../api";

const SearchUsers = () => {
  const { name } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSearchUsers(name)
      .then((response) => {
        setUsers(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return <UsersGrid name={name} users={users} loading={loading} />;
};

export default SearchUsers;
