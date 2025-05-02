import { useState } from "react";
import Modal from "../../../components/Modal";
import { seePostLikes } from "../../../api/post";
import { useAuth } from "../../../store";
import { followUser } from "../../../api/auth";
import { Link } from "react-router";
import handleError from "../../../utils/handleError";
import { toast } from "sonner";

export default function SeeLikes({ likeCount, post, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [data, setData] = useState([]);
  const { accessToken, setUser } = useAuth();
  // console.log(data);

  const fetchLikes = async () => {
    setLoading(true);
    try {
      const res = await seePostLikes(post?._id, accessToken);
      if (res.status === 200) {
        setData(res.data.users);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFollowUser = async (followerId) => {
    setFollowLoading(true);
    try {
      const res = await followUser(followerId, accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser((prev) => ({
          ...prev,
          ...res.data.user,
        }));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleLikesFn = () => {
    setIsModalOpen(true);
    fetchLikes();
  };

  return (
    <>
      <p
        className="mt-2 font-semibold cursor-pointer hover:text-gray-400 px-4 md:px-0"
        title="See who liked the post"
        onClick={handleLikesFn}
      >
        {likeCount} likes
      </p>
      <Modal
        isOpen={isModalOpen}
        id="likesPost"
        title="Likes"
        classname="w-[90%] h-[400px] mx-auto py-3 px-0"
        onClose={() => setIsModalOpen(false)}
      >
        {post?.likes?.length === 0 && (
          <p className="text-center my-0">
            No likes yet! Be the first one to like. 😂
          </p>
        )}
        {loading ? (
          <div className="flex justify-between items-center min-h-[200px] px-4">
            <span className="loading loading-spinner text-fuchsia-900"></span>
          </div>
        ) : (
          <div>
            {data?.map((item, index) => (
              <div
                className="flex justify-between items-center p-3"
                key={item?._id}
              >
                <Link
                  to={`/profile/${item?.username}`}
                  className="flex items-center gap-3"
                >
                  <div className="avatar avatar-placeholder">
                    <div
                      className={`w-11 rounded-full ${
                        item?.profilePicture ? "" : "border"
                      }`}
                    >
                      {item?.profilePicture ? (
                        <img
                          src={item?.profilePicture}
                          alt={item?.username}
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl">
                          {item?.username?.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="font-semibold">{item?.username}</p>
                    <p className="text-sm">{item?.fullname}</p>
                  </div>
                </Link>
                {user?._id !== item?._id && (
                  <button
                    disabled={user?._id === item?._id}
                    className="btn bg-[#8D0D76] w-[110px] text-white"
                    onClick={() => {
                      toggleFollowUser(item?._id);
                      setActive(index);
                    }}
                  >
                    {active === index && followLoading
                      ? "Updating..."
                      : user?.following?.includes(item?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          type="button"
          onClick={() => setIsModalOpen(false)}
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </Modal>
    </>
  );
}
