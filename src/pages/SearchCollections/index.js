import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSearchCollections } from "../../api";
import CollectionsGrid from "../../components/CollectionsGrid";
import PageTitle from "../../utils/PageTitle";

const SearchCollections = () => {
  const { name } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSearchCollections(name)
      .then((response) => {
        setCollections(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return (
    <PageTitle title={name}>
      <CollectionsGrid
        name={name}
        collections={collections}
        loading={loading}
      />
    </PageTitle>
  );
};

export default SearchCollections;
