import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const [error, setError] = useState("");

  const feed = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return;
  }

  if (feed.length === 0) {
    return <div className="flex justify-center my-10">No users found.</div>;
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
