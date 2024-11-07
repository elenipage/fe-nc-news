import { useState, useEffect } from "react";
import { fetchTopics } from "../../api";

export function SortFilter(props) {
  const [orderBy, setOrderBy] = useState([]);
  const [sort, setSort] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { sortQuery, setSortQuery, orderQuery, setOrderQuery, setSearchParams } = props;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const params = {};
    if (orderQuery) params.order = orderQuery;
    if (sortQuery) params.sort_by = sortQuery;

    setSearchParams(params);
  }, [orderQuery, sortQuery]);

  return (
    <div>
      <select onChange={(event) => setSortQuery(event.target.value)}>
        <option>sort by...</option>
        <option value="created_at" key={"date"}>date</option>
        <option value="votes" key={"votes"}>votes</option>
        <option value="comment_count" key={"comments"}>comment count</option>
      </select>
      <select onChange={(event) => setOrderQuery(event.target.value)}>
        <option value={""}>order</option>
        <option value={"asc"}>ascending</option>
        <option value={"desc"}>descending</option>
      </select>
    </div>
  );
}
